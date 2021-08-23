const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const tokenService = require('../services/token');
const userService = require('../services/user');

exports.login = async (req, res, next) => {
  try {
    const validation = validationResult(req);

    if (!validation.isEmpty()) {
      throw new Error(validation.errors[0].msg);
    }

    const { login, password, email } = req.body;
    let user = await userService.findUser(email);

    console.log(user.id);

    if (!user) {
      const hashPassword = await bcrypt.hash(password, 10);

      user = await userService.createUser(login, hashPassword, email);
    } else {
      if (user.isBlocked) {
        throw new Error('You are blocked');
      }

      const isPassEqual = await bcrypt.compare(password, user.password);

      if (!isPassEqual) {
        throw new Error('Incorrect password');
      }
    }

    const token = tokenService.generateToken({
      id: user.id,
    });

    return res.status(200).json({
      message: 'Successful login',
      token,
    });
  } catch (err) {
    next(err);
  }
  return null;
};
