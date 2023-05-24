/*
1.) This file to help us to avoide to write try catch block
in every function.
2.) thefunc is callback function.
*/
module.exports = (theFunc) => (req, res, next) => {
  Promise.resolve(theFunc(req, res, next)).catch((err) =>
    res.status(400).send({ msg: "Somthing went wrong", err: err.message })
  );
};
