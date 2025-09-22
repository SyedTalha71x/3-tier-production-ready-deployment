import {
  generateToken,
  hashpassword,
  verifyPassword,
} from "../Securities/index.js";
import { connectToDB } from "../db/index.js";
import { SuccessResponse, FailureResponse } from "../Utilities/index.js";
import nodemailer from "nodemailer";
import {
  validateEmail,
  validatePassword,
  validateUsername,
} from "../Validitions/index.js";
import {
  LOGIN_FETCH_QUERY,
  SIGNUP_FETCH_QUERY,
  SIGNUP_INSERT_QUERY,
  VERIFY_OTP_USER_EXISTS_QUERY,
  UPDATE_USERS_OTP_AND_OTP_EXPIRATION,
  VERIFY_OTP_OF_USER,
  CHECK_USER_FOR_RESET_PASSWORD,
  UPDATE_USER_PASSWORD
} from "../Models/user-model-db.js";
import otpGenerator from "otp-generator";
import moment from "moment";

const pool = connectToDB();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});
export const Signup = async (req, res) => {
  const { username, email, password } = req.body;

  console.log(username, email, password);

  const authType = "standard";

  if (!validateUsername(username)) {
    return FailureResponse(res, "Username is not valid", 400);
  }
  if (!validateEmail(email)) {
    return FailureResponse(res, "Email is not valid", 400);
  }
  if (!validatePassword(password)) {
    return FailureResponse(res, "Password is not valid", 400);
  }
  try {
    pool.query(SIGNUP_FETCH_QUERY, [username, email], (err, results) => {
      if (err) {
        return FailureResponse(res, "Internal Server Error", err.message, 500);
      }
      if (results.length > 0) {
        return FailureResponse(res, "A record already exists", 400);
      }
      const hashedpassword = hashpassword(password);
      console.log(hashedpassword);
      
      pool.query(
        SIGNUP_INSERT_QUERY,
        [username, email, hashedpassword],
        (err, result) => {
          if (err) {
            return FailureResponse(
              res,
              "Internal Server Error",
              err.message,
              500
            );
          }
          const token = generateToken(result.insertId, email, authType);
          return SuccessResponse(res, { token }, "Signup Successfully", 200);
        }
      );
    });
  } catch (error) {
    console.log(error);
    return FailureResponse(res, "Internal Server Error", error.message, 500);
  }
};
export const Login = async (req, res) => {
  const { email, password } = req.body;
  const authType = "standard";

  if (!validateEmail(email)) {
    return FailureResponse(res, "Email is not valid", "", 400);
  }
  if (!validatePassword(password)) {
    return FailureResponse(res, "Password is not valid", "", 400);
  }

  try {
    pool.query(LOGIN_FETCH_QUERY, [email], (err, result) => {
      if (err) {
        return FailureResponse(res, "Internal Server Error", err.message, 500);
      }

      if (result.length === 0) {
        return FailureResponse(res, "User not found", "", 404);
      }

      const user = result[0];
      if (!verifyPassword(user.password, password)) {
        return FailureResponse(res, "Password is invalid", "", 400);
      } else {
        const token = generateToken(user.id, email, authType);
        return SuccessResponse(res, { token }, "Login Successfull", 200);
      }
    });
  } catch (error) {
    console.error(error);
    return FailureResponse(res, "Internal Server Error", error.message, 500);
  }
};
export const requestForOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return FailureResponse(res, "Please enter email",null, 400);
    }
    pool.query(VERIFY_OTP_USER_EXISTS_QUERY, [email], (err, result) => {
      if (err) {
        console.log('db error check',err);
        
        return FailureResponse(res, "Internal Server Error", err.message, 500);
      }
      if (result.length === 0) {
        return FailureResponse(res, "User doesn't exist", err.message, 500);
      }

      const otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        specialChars: false,
      });
      const otpExpiration = moment()
        .add(10, "minutes")
        .format("YYYY-MM-DD HH:mm:ss");

      pool.query(
        UPDATE_USERS_OTP_AND_OTP_EXPIRATION,
        [otp, otpExpiration, email],
        (err, result) => {
          if (err) {
            console.log('db error check --',err);
            return FailureResponse(
              res,
              "Internal Server Error",
              err.message,
              500
            );
          }
          if (result.length === 0) {
            return FailureResponse(res, "User doesn't exist", err.message, 500);
          }
          const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Password Reset OTP",
            text: `Your OTP for password reset is ${otp}. It will expire in 10 minutes.`,
          };
          transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
              return FailureResponse(
                res,
                "Internal Server Error",
                err.message,
                500
              );
            }
            return SuccessResponse(
              res,
              "OTP Has been send successfully",
              info.messageId,
              200
            );
          });
        }
      );
    });
  } catch (error) {
    console.log(error);
    return FailureResponse(res, "Internal Server Error", error.message, 500);
  }
};
export const verifyOTP = async (req, res) => {
  try {
    const {otp} = req.body;

    if(!otp){
      return FailureResponse(res, 'Please enter OTP!',null, 400)
    }
    pool.query(VERIFY_OTP_OF_USER, [otp], (err, result)=>{
      if (err) {
        console.log('db error check',err);
        return FailureResponse(res, "Internal Server Error", err.message, 500);
      }
      if(result.length === 0){
        return FailureResponse(res, 'Invalid OTP',null, 400)
      }

      const {email, otp_expiration} = result[0];

      const currentDate = moment();
      const expirationDATE = moment(otp_expiration);

      if(currentDate.isAfter(expirationDATE)){
        return FailureResponse(res, 'Sorry OTP is expired',null, 400)
      }
      return SuccessResponse(res, {email},'OTP is valid', 200)
    })
  } catch (error) {
    console.log(error);
    return FailureResponse(res, "Internal Server Error", error.message, 500);
  }
};
export const resetPassword = async (req, res) => {
  try {
    const {email, newPassword, confirmPassword} = req.body;

    if(!email || !newPassword || !confirmPassword){
      return FailureResponse(res, 'Please provide full details',null, 400);
    }
    if(newPassword !== confirmPassword){
      return FailureResponse(res, 'Password is invalid',null, 400);
    }
    pool.query(CHECK_USER_FOR_RESET_PASSWORD, [email], (err, results)=>{
      if (err) {
        console.log('db error check',err);
        return FailureResponse(res, "Internal Server Error", err.message, 500);
      }
      if(results.length === 0){
        return FailureResponse(res, "User not found", err.message, 400);
      }
      const hashedpassword = hashpassword(newPassword)
      pool.query(UPDATE_USER_PASSWORD, [hashedpassword, email], (err, result)=>{
        if (err) {
          console.log('db error check',err);
          return FailureResponse(res, "Internal Server Error", err.message, 500);
        }
        if (result.affectedRows === 0 ) {
          return FailureResponse(res, "Failed to update your password", err.message, 400);
        }
        return SuccessResponse(res, {hashedpassword}, 'your password has been reseted', 200)
      })
    })

  } catch (error) {
    console.log(error);
    return FailureResponse(res, "Internal Server Error", error.message, 500);
  }
};
