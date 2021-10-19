import jwt from "jsonwebtoken";

const isLoggedIn = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token)
    return res.status(401).json({
      error: "No token found, please provide authentication token to continue",
    });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    console.log(verified);
    next();
    // res.status(200).json(verified)
  } catch (err) {
    res.status(400).json({ error: "invalid token", error: err });
    console.log("await");
    console.log(err.message);
  }
};

export default isLoggedIn;
