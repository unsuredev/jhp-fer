import jwt = require("jsonwebtoken");
import { Response, Next, Request } from "restify";
import _ = require("lodash");
import { logger } from "./init_app";

export function IsUserAuthenticated(req: Request, res: Response, next: Next): any {
  const token = req.headers["at"] || req.params.at;
  try {
    // decode token
    if (!_.isNil(token)) {
      // verifies secret and checks exp
      jwt.verify(token, process.env.USER_SECRET, function (err, decoded) {
        if (err) {
          if (err.message && err.message === "jwt expired") {
            return res.json({ success: false, message: "Token expired." });
          }

          return res.json({ success: false, message: "Failed to authenticate token." });
        } else {
          // if everything is good, save to request for use in other routes
          req.username = decoded.fullName;
          next();
        }
      });
    } else {
      // if there is no token
      // return an error
      return res.send(403, {
        success: false,
        message: "No token provided.",
      });
    }
  } catch (error) {
    logger.error("IsAuthenticate", error, token);
    return res.send(403, {
      success: false,
      message: "No token provided.",
    });
  }
}

export function IsSystemUserAuthenticated(req: Request, res: Response, next: Next): any {
  const token = req.headers["at"] || req.params.at;
  try {
    // decode token
    if (!_.isNil(token)) {
      // verifies secret and checks exp
      jwt.verify(token, process.env.SYSTEM_USER_SECRET, function (err, decoded) {
        if (err) {
          if (err.message && err.message === "jwt expired") {
            return res.json({ success: false, message: "Token expired." });
          }

          return res.json({ success: false, message: "Failed to authenticate token." });
        } else {
          // console.log("decoded", decoded);
          // if everything is good, save to request for use in other routes
          req.username = decoded.fullName;
          next();
        }
      });
    } else {
      // if there is no token
      // return an error
      return res.send(403, {
        success: false,
        message: "No token provided.",
      });
    }
  } catch (error) {
    logger.error("IsAuthenticate", error, token);
    return res.send(403, {
      success: false,
      message: "No token provided.",
    });
  }
}

export function IsAuthenticated(req: Request, res: Response, next: Next): any {
  const token = req.headers["at"] || req.params.at;
  try {
    // decode token
    if (!_.isNil(token)) {
      // verifies secret and checks exp
      jwt.verify(token, process.env.USER_SECRET, function (err, decoded) {
        if (err) {
          if (err.message && err.message === "jwt expired") {
            return res.json({ success: false, message: "Token expired." });
          }
          // when any error, try to verify if system user
          jwt.verify(token, process.env.SYSTEM_USER_SECRET, function (err, decoded) {
            if (err) {
              return res.json({ success: false, message: "Failed to authenticate token." });
            } else {
              // console.log("decoded", decoded);
              // if everything is good, save to request for use in other routes
              req.username = decoded.fullName;
              next();
            }
          });
        } else {
          // console.log("decoded", decoded);
          // if everything is good, save to request for use in other routes
          req.username = decoded.fullName;
          next();
        }
      });
    } else {
      // if there is no token
      // return an error
      return res.send(403, {
        success: false,
        message: "No token provided.",
      });
    }
  } catch (error) {
    logger.error("IsAuthenticate", error, token);
    return res.send(403, {
      success: false,
      message: "No token provided.",
    });
  }
}
