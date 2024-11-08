const bcrypt = require('bcryptjs');
const session = require('express-session');
const { check, validationResult } = require('express-validator');
const helmet = require('helmet');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const fs = require('fs');
const https = require('https');
const cors = require('cors');
const express = require('express');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
const PORT = 3000;

const sslOptions = {
  key: fs.readFileSync('keys/privatekey.pem'),
  cert: fs.readFileSync('keys/certificate.pem')
};

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected')).catch(err => console.log(err));

const customerSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  accountNumber: { type: String, required: true}
});

const Customer = mongoose.model('Customer', customerSchema);

const paymentSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  province: { type: String, required: true },
  zipCode: { type: String, required: true },
  cardName: { type: String, required: true },
  expiryMonth: { type: String, required: true },
  expiryYear: { type: String, required: true },
  transactionId: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'ZAR' },
  paymentStatus: { type: String, default: 'Success' },
  createdAt: { type: Date, default: Date.now },
  _id: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Customer'}
});

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

const Payment = mongoose.model('Payment', paymentSchema);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());
app.use(session({
  secret: process.env.SESSION_SECRET || 'sessionsecret',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: true,
    sameSite: 'strict'
  }
}));
app.use(helmet());
app.use(csrf({ cookie: true }));

app.use((req, res, next) => {
  if (req.protocol === 'http') {
    return res.redirect(`https://${req.headers.host}${req.url}`);
  }
  next();
});

app.get('/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() });
});

app.post('/register', [
  check('email').isEmail().withMessage('Invalid email'),
  check('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters long'),
  check('accountNumber').not().isEmpty().withMessage('Account number is required'),
  
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

const passwordRegex = /^(?=.*[a-z&&[^il1o0]])(?=.*[A-Z&&[^IL1O0]])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
const accountNumberRegex = /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})$/;
const amountRegex = /^-?\$?([0-9]{1,3}(?:,?[0-9]{3})*(?:\.[0-9]{2})?|\.[0-9]{2})$/;

const { email, password, accountNumber,amount} = req.body;

  if (!passwordRegex.test(password)) {
    return res.status(400).json({ msg: 'Password must meet complexity requirements' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ msg: 'Email must meet complexity requirements' });
  }

  if (!accountNumberRegex.test(accountNumber)) {
    return res.status(400).json({ msg: 'Account must meet complexity requirements' });
  }

  if (!amountRegex.test(amount)) {
    return res.status(400).json({ msg: 'Amount must only contain numbers' });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newCustomer = new Customer({
      email,
      password: hashedPassword,
      accountNumber
    });

    await newCustomer.save();
    res.json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).send('Server error');
  }
});


app.post('/login', [
  csrf({ cookie: true }),
  check('email').isEmail(),
  check('password').not().isEmpty(),
  check('accountNumber').not().isEmpty(),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password, accountNumber } = req.body;
  const csrfToken = req.headers['csrf-token'];

  try {
    if (!csrfToken) {
      return res.status(403).json({ msg: 'CSRF token missing' });
    }

    const customer = await Customer.findOne({ email, accountNumber });
    if (!customer) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token, message: 'Login successful!' });

  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

app.post('/create-payment', authenticateJWT, [ check('amount').isFloat({ min: 0.01 }),
  check('cardNumber').isCreditCard(),
  check('expiryMonth').isInt({ min: 1, max: 12 }),
  check('expiryYear').isInt({ min: new Date().getFullYear() }),
  check('cvv').isLength({ min: 3, max: 4 }).isNumeric()], async (req, res) => {
  const {
    fullName,
    email,
    address,
    city,
    province,
    zipCode,
    cardName,
    cardNumber,
    expiryMonth,
    expiryYear,
    amount
  } = req.body;

  if (!fullName || !email || !address || !city || !province || !zipCode || !cardName || !cardNumber || !expiryMonth || !expiryYear || !amount) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
  }

  const transactionId = crypto.randomBytes(8).toString('hex').toUpperCase();

  try {
    if (!req.session.userId) {
      return res.status(401).json({ success: false, message: 'Unauthorized: Please log in' });
    }

    const paymentSuccess = Math.random() > 0.2;

    if (paymentSuccess) {
      const paymentSubmission = new Payment({
        userId: req.session.userId,
        fullName,
        email,
        address,
        city,
        province,
        zipCode,
        cardName,
        cardNumber: '**** **** **** ' + cardNumber.slice(-4),
        expiryMonth,
        expiryYear,
        transactionId,
        amount,
        paymentStatus: 'Success'
      });

      await paymentSubmission.save();

      res.status(200).json({
        success: true,
        message: 'Payment processed successfully',
        paymentDetails: {
          transactionId,
          amount,
          currency: 'ZAR',
          cardNumber: '**** **** **** ' + cardNumber.slice(-4),
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment failed due to insufficient funds',
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

https.createServer(sslOptions, app).listen(PORT, () => {
  console.log(`Secure server running on port ${PORT}`);
});