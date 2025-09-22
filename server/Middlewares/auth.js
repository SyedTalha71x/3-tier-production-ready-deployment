import jwt from "jsonwebtoken";
import { SuccessResponse, FailureResponse } from "../Utilities/index.js";

 const Auth = (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer")) {
      return FailureResponse(
        res,
        "Token not provided, please check",
        null,
        401
      );
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return FailureResponse(res, "Malformed, please check", null, 401);
    }

    try {
      const decoded = jwt.verify(token, process.env.KEY);
      req.user = decoded;
      next();
    } catch (err) {
      console.log(err);
      switch (err.name) {
        case "JsonWebTokenError":
          return FailureResponse(res, "Invalid Token", null, 401);
        case "TokenExpiredError":
          return FailureResponse(res, "Authentication failed. Please log in again.", null, 401);
        default:
          return FailureResponse(res, "Authentication Failed", null, 400);
      }
    }
  } catch (error) {
    console.log(error);
    return FailureResponse(res, "Internal Server Error", error.message, 500);
  }
};

export default Auth;
