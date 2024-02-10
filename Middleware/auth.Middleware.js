const jwt = require("jsonwebtoken");
require("dotenv").config();

// This function checks for authentication tokens in the request cookies
async function authMiddleware(req, res, next) {
  try {
    const { authToken, refreshToken } = req.cookies;
    console.log(authToken, refreshToken);
    // Check if both tokens are missing
    if (!authToken && !refreshToken) {
      return res.status(403).json({
        message:
          "Unauthorized: No authentication token provided. Please log in.",
      });
    } else {
      jwt.verify(authToken, "secretkey", (err, data) => {
        if (data) {
          // If authToken is not valid, check refreshToken
          req.body.userId = data.userId;
          next();
        } else {
          jwt.verify(refreshToken, "secretkey", (err, data) => {
            if (data) {
                req.body.userId = data.userId;
              next();
            } else {
              res.status(403).send("Not authorized. Please login again.");
            }
          });
        }
      });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = authMiddleware;
