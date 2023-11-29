const { verify } = require("jsonwebtoken");
const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");
  console.log("Access Token is", accessToken);
  if (!accessToken)
    return res.status(403).json({ message: "User not Logged in" });

  try {
    const validToken = verify(accessToken, "KEYKEYKEY");
    if (validToken) {
      req.user = validToken;
      return next();
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { validateToken };
