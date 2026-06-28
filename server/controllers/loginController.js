const login = (req, res) => {
  const username = req.body.username.trim();
  const password = req.body.password.trim();

  console.log("================================");
  console.log("Entered Username:", `"${username}"`);
  console.log("Entered Password:", `"${password}"`);
  console.log("ENV Username:", `"${process.env.ADMIN_USERNAME}"`);
  console.log("ENV Password:", `"${process.env.ADMIN_PASSWORD}"`);
  console.log("================================");

  if (
    username === process.env.ADMIN_USERNAME.trim() &&
    password === process.env.ADMIN_PASSWORD.trim()
  ) {
    return res.status(200).json({
      success: true,
      message: "Login Successful",
    });
  }

  return res.status(401).json({
    success: false,
    message: "Invalid Username or Password",
  });
};

module.exports = { login };