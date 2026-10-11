// routes/auth.js
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// POST /api/v1/auth/login
router.post('/login', async (req, res) => {
  const { operator_id, password } = req.body;

  if (!operator_id || !password) {
    return res.status(400).json({
      success: false,
      message: 'Please provide both operator_id and password',
    });
  }

  try {
    const user = await User.findOne({ operator_id }).populate('assigned_ward', 'name');

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        success: false,
        message: 'Invalid Operator ID or password',
      });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, assigned_ward: user.assigned_ward },
      process.env.JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        operator_id: user.operator_id,
        role: user.role,
        assigned_ward: user.assigned_ward,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

module.exports = router;