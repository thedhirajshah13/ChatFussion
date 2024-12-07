const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModels");

const protectRoute = async (req, res, next) => {
  try {
    // gettting token from cookies
    // console.log(req);
    const token = req.cookies.jwt;
    // console.log(token);
    if (!token) {
      return res.status(401).json({ msg: "unAuthorised-> No token Present" });
    }
    // verifying token with the help of jwt
    const decode = await jwt.verify(token, process.env.JWT_SECRET);

    if (!decode) {
      return res.status(401).json({ msg: "unAuthoried-> invalid access" });
    }

    //finding user from user model
    const user = await userModel.findById(decode.userId).select("-password");
    if (!user) {
      return res.status(309).json({ msg: "User Not found" });
    }
    //setting req.user to user
    req.user = user;
    // console.log(user);
    next();
  } catch (error) {
    res.status(501).json({ msg: `protectError-> ${error}` });
  }
};

module.exports = protectRoute;
