module.exports =verifyAdmin =  (req, res, next) => {
    if (!req.user.role) {
      next();
    } else {
      return res.status(403).json({
        status: 403,
        error: 'Only admins can access this',
      });
    }
  };

