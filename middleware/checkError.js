module.exports = (err, req, res, next) => {
  console.log(err);
  switch(err.message) {
    case "Incorrect password":
      res.status(400).json({
        message: err.message
      });
      break;
    default:
      res.status(500).json({
        message: "Iternal server error"
      });
  }
};