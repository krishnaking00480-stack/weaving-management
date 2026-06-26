const login = (req, res) => {

    const { username, password } = req.body;



    if (
        username === process.env.ADMIN_USERNAME &&
        password === process.env.ADMIN_PASSWORD
    ) {
        return res.status(200).json({
            success: true,
            message: "Login Successful"
        });
    }

    return res.status(401).json({
        success: false,
        message: "Invalid Username or Password"
    });
};

module.exports = { login };