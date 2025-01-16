const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/User");

const isAuthenticated = async (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized.' });  // Send proper 401 response if no token
  }

  try {
    // Verify the token and decode it
    const decoded = jwt.verify(token, "key");
    const user = await UserModel.findById(decoded._id);
    
    if (!user) {
      return res.status(401).json({ message: 'Unauthorized.' });  // Return 401 if no user is found
    }
    
    req.user = user; // Attach user to the request object for subsequent middlewares/routes
    next(); // Proceed to next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: "Not Authorized" });  // Handle errors if JWT verification fails
  }
};

const checkRole = (role) => {
  return (req, res, next) => {
    // Check if the user role matches the required role
    if (req.user.role !== role) {
      return res.status(403).json({ message: "Insufficient role" });  // Return 403 for insufficient permissions
    }
    next(); // Proceed to next middleware or route handler if the role matches
  };
};

module.exports = { isAuthenticated, checkRole };
