const login = (req, res) => {
  const { username, password } = req.body;

  console.log("Entered Username:", username);
  console.log("Entered Password:", password);

  console.log("ENV Username:", process.env.ADMIN_USERNAME);
  console.log("ENV Password:", process.env.ADMIN_PASSWORD);

  if (
    username === process.env.ADMIN_USERNAME &&
    password === process.env.ADMIN_PASSWORD
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