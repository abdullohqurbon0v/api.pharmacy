const UserDto = require('../dtos/user.dto');
const userModel = require('../models/user');
const mailService = require('../service/mail.service');
const tokenService = require('../service/token.service');
const codeModel = require('../models/code')
const bcrypt = require('bcrypt')

class AuthController {
     async checkEmail(req, res) {
          try {
               const { email } = req.body;
               const existingEmail = await userModel.findOne({ email });
               if (existingEmail) {
                    return res.status(400).json({ message: "User with this phone number already exist", type: "error" });
               }
               const randomCode = Math.floor(100000 + Math.random() * 900000);
               const mail = mailService.sendCode(email, "Your verifivation OTP code", randomCode)
               return res.status(200).json({ message: "Success. OTP sent.", type: "success" });
          } catch (error) {
               console.error(error);
               return res.status(500).json({ message: "Server error", type: "error" });
          }
     }

     async register(req, res) {
          try {
               console.log(req.body)
               const newUser = await userModel.create(req.body);
               console.log(newUser)
               const user = new UserDto(newUser);
               const token = tokenService.generateToken({ ...user });
               return res.status(200).json({
                    user,
                    token

               });
          } catch (error) {
               console.log(error)
               return res.status(500).json({ message: "Server error", type: "error" });
          }
     }

     async login(req, res) {
          try {

          } catch (error) {
               return res.status(500).json({ message: "Server error", type: "error" })
          }
     }

     async verify(req, res) {
          try {
               const { email, code } = req.body;
               const savedCode = await codeModel.findOne({ email });

               if (!savedCode) {
                    return res.status(400).json({ message: "Invalid email or code", type: "error" });
               }
               const isMatch = await bcrypt.compare(code.toString(), savedCode.code);
               if (!isMatch) {
                    return res.status(400).json({ message: "Invalid code", type: "error" });
               }
               await codeModel.deleteOne({ email });

               return res.status(200).json({ message: "Verification successful", type: "success" });
          } catch (error) {
               console.error("Error in verify:", error);
               return res.status(500).json({ message: "Server error", type: "error" });
          }
     }

}

module.exports = new AuthController();
