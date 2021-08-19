module.exports = (err, req, res, next) => {
  console.log(err);

  switch (err.message) {
    case 'Incorrect login':
      res.status(400).json({
        message: err.message,
      });
      break;
    case 'Incorrect password':
      res.status(400).json({
        message: err.message,
      });
      break;
    case 'Email is invalid':
      res.status(400).json({
        message: err.message,
      });
      break;
    case 'Email already exists':
      res.status(400).json({
        message: err.message,
      });
      break;
    case 'You are blocked':
      res.status(403).json({
        message: err.message,
      });
      break;
    default:
      res.status(500).json({
        message: 'Iternal server error',
      });
  }
  next();
};
