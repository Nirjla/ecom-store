const jwt = require("jsonwebtoken");
const { JWT } = require("../constants");

module.exports = async (req, res, next) => {
      try {
            // Extract Authorization header and split into parts
            const authHeader = req.headers['authorization'];

            // Check if Authorization header exists and split into parts
            if (!authHeader || !authHeader.startsWith('Bearer ')) {
                  return res.status(403).json({
                        success: false,
                        message: "Not Authorized"
                  });
            }

            // Extract just the token part after 'Bearer '
            const jwtToken = authHeader.split('Bearer ')[1];
            console.log("Token from request:", jwtToken);

            // Verify token and extract payload
            const payload = jwt.verify(jwtToken, JWT.JWT_SECRET);
            req.user = payload.user; // Attach user information to the request object
            console.log(req.user)

            // Proceed to the next middleware or route handler
            next();
      } catch (err) {
            console.error("JWT verification error:", err.message);
            return res.status(403).json({
                  success: false,
                  message: "Not Authorized"
            });
      }
};
