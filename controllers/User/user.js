/* eslint-disable no-unused-vars */
const { createCustomError, errorRoute } = require('../../errors/custom-error')
const { ObjectId } = require('mongodb')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const mongoose = require('mongoose')
const crypto = require('crypto')
const nodemailer = require('nodemailer');
const dotenv = require('dotenv')
const path = require('path')
dotenv.config()
const { createSuccessMessage } = require('../../success/custom-success')
const fs = require('fs').promises
const xlsx = require('xlsx')
const { sendEmail } = require('../../helpers/mail')
const { updateStock } = require('../../helpers/uptadeStockHelpers')
const { Customer } = require('../../models/customer')
const { authorizedPerson } = require('../../models/customer')
const { Product } = require('../../models/product')
const { Sale } = require('../../models/sale')
const { StockAction } = require('../../models/product')
const { Authority } = require('../../models/user')

const setUser = async (input, res, next) => {
  try {
      
      const existData = await Authority.findOne({ email: input.email });

      if (existData) {
          return next(createCustomError(1100, errorRoute.enum.user, 'Kayıt başarısız olmuştur.'));
      }

      const hash = crypto.createHash('md5').update(input.password).digest('hex');

      let data = {
          name: input.name,
          surname: input.surname,
          email: input.email,
          role: input.role,
          password: hash,        
          createdAt: Date.now(),
          updateAt: Date.now()
      };

      const result = await Authority.create(data);
      if (!result) {
          return next(createCustomError(1100, errorRoute.enum.user, 'Kayıt başarısız olmuştur.'));
      }

      return next(createSuccessMessage(2010))
  } catch (error) {
      console.log(error)
      return next(createCustomError(9000))
  }
};

const Login = async (input, res, next) => {
  try {
      const { email, password } = input;
      const user = await Authority.findOne({ email, isActive: true });
      if (!user) {
          return next(createCustomError(1105, errorRoute.enum.user));
      }
      const hash = crypto.createHash('md5').update(password).digest('hex');
      if (user.password !== hash) {
          return next(createCustomError(1106, errorRoute.enum.user));
      }

      const token = jwt.sign({ userId: user._id, role: user.role, name: user.name, surname: user.surname, email: user.email, }, 'your_jwt_secret', { expiresIn: '1h' });


      return next(createSuccessMessage(2000, token));
  } catch (error) {
      return next(createCustomError(9000));
  }
};

const changePassword = async (input, res, next) => {
    try {
      const { email } = input;

      if (!email) {
        return next(createCustomError(400, errorRoute.enum.user, 'E-posta adresi gereklidir.'));
      }

      const user = await Authority.findOne({ email });
      if (!user) {
        return next(createCustomError(404, errorRoute.enum.user, 'E-posta adresi bulunamadı.'));
      }

      const resetToken = crypto.randomBytes(32).toString('hex');
      const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');

      user.resetPasswordToken = hashedToken;
      user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; 
      await user.save();

      const resetUrl = `http://127.0.0.1:5500/yusuf/front/template/pages/users/clear-password.html?token=${resetToken}&email=${email}`;

      const mailHtml = `
        <p>Merhaba,</p>
        <p>Şifrenizi sıfırlamak için aşağıdaki bağlantıya tıklayın:</p>
        <a href="${resetUrl}" target="_blank">${resetUrl}</a>
        <p>Bu bağlantı 1 saat boyunca geçerlidir.</p>
      `;

      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Şifre Sıfırlama Talebi',
        html: mailHtml,
      };
  
      await transporter.sendMail(mailOptions);

      return next(createSuccessMessage(2004, 'Şifre sıfırlama maili gönderildi.'));
    } catch (error) {
      console.error('Şifre sıfırlama hatası:', error);
      return next(createCustomError(500, errorRoute.enum.server, 'Bir hata oluştu. Lütfen tekrar deneyin.'));
    }
};  
  
const setNewPassword = async (input, res, next) => {
    try {
        const { email, newPassword } = input;

        const user = await Authority.findOne({ email, isActive: true });
        if (!user) {
            return next(createCustomError(1105, errorRoute.enum.user, 'Kullanıcı bulunamadı.'));
        }

        const hash = crypto.createHash('md5').update(newPassword).digest('hex');

        user.password = hash;
        user.updateAt = Date.now();
  
        const result = await user.save();
        if (!result) {
            return next(createCustomError(1100, errorRoute.enum.user, 'Şifre güncellenirken bir hata oluştu.'));
        }
  
        return next(createSuccessMessage(2003));
    } catch (error) {
        console.log(error);
        return next(createCustomError(9000, errorRoute.enum.user, 'Beklenmedik bir hata oluştu.'));
    }
};  

const getUsers = async (input, res, next) => {
  try {
      const { userId } = input;

      const query = userId ? { _id: userId, isActive:true } : {isActive:true};

      const users = await Authority.find(query);

      if (userId && users.length === 0) {
          return next(createCustomError(1105, 'Kullanıcı bulunamadı'));
      }

      return next(createSuccessMessage(2004, users));
  } catch (error) {
      console.log(error);
      return next(createCustomError(9000));
  }
};

const updateUsers = async (input, res, next) => {
  try {
      let { userId, name, surname, email, role } = input;

      const updateData = {
          name,
          surname,
          email,
          role
      };
      const updatedUser = await Authority.findByIdAndUpdate(
          userId,
          { $set: updateData }, 
          { new: true, runValidators: true }
      );
      if (!updatedUser) {
          return next(createCustomError(1105, 'Kullanıcı bulunamadı'));
      }
      return next(createSuccessMessage(2004, updatedUser));
  } catch (error) {
      console.log(error);
      return next(createCustomError(9000, 'Bir hata oluştu'));
  }
}

const deleteUsers = async (input, res, next) => {
  try {
      let { userId} = input
      let objectId = mongoose.Types.ObjectId(userId);
      const user = await Authority.findById(userId);
      if (!user) {
          return next(createCustomError(1105, errorRoute.enum.user));
      }
      user.isActive = false;
      const updatedUser = await user.save();
      return next(createSuccessMessage(2009, updatedUser));

  } catch (error) {
      console.error(error);
      return next(createCustomError(9000));
  }
};


module.exports = {
  deleteUsers,
  changePassword,
  updateUsers,
  getUsers,
  setUser,
  Login,
  setNewPassword
}
