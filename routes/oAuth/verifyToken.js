import jwt from "jsonwebtoken";

export default function auth(req, res, next) {
  const bearerToken = req.header("Authorization");
  if (!bearerToken) return res.status(401).send("Access Denied");

  const token = bearerToken.split(" ")[1];
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res.status(401).send({
      errorCode: 401,
      message: "UnAuthorized",
      description: "Please reverify the token",
    });
  }
}
