import jwt from "jsonwebtoken";

export function generateToken(user) {
  const payload = {
    _id: user._id,
    email: user.email,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "24hr" });
}

export function authorizeUser(req) {
  const token = req.headers.authorization || req.headers["x-access-token"];
  // console.log(token, "from middleware");

  if (!token) return req;
  // throw new Error("No token provided");

  jwt.verify(token, "secret key", (err, decoded) => {
    if (err) {
      throw new Error(err);
    } else {
      req.user = decoded;
      // console.log(req.user);
      return req;
    }
  });
}
