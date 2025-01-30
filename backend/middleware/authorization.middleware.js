// module.exports = (requiredRoles) => (req, res, next) => {
//     if (!requiredRoles.includes(req.user.role)) {
//       return res.status(403).json({ error: 'You do not have permission to perform this action.' });
//     }
//     next();
//   };
  

module.exports = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: "Unauthorized. Please log in." });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: "Access Denied. Insufficient permissions." });
    }

    next(); // Proceed to the next middleware
  };
};
