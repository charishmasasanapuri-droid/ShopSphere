import jwt from "jsonwebtoken";

const protect = (req, res, next) => {
  let token;

  // Check if token exists in Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];

    try {
      // Verify JWT token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Store decoded user data in request
      req.user = decoded;

      // Continue to next function
      next();
    } catch (error) {
      return res.status(401).json({
        message: "Invalid Token",
      });
    }
  } else {
    return res.status(401).json({
      message: "No Token, Authorization Denied",
    });
  }
};

export default protect;