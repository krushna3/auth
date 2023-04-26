const User = require('../model/userModel');
const bcrypt = require('bcrypt');

// secure password generation
const securePassword = async (password) => {
    try {
        const passwordHash = await bcrypt.hash(password, 10);
        return passwordHash;
    } catch (error) {
        console.log(error.message);
    }
}


exports.registerUser = async (req, res, next) => {
    try {
        // Duplicate mail rejection
        const userEmail = await User.exists({ email: req.body.email });
        // console.log(req.body);
        if (userEmail) {
            res.status(422);
            res.send(`Email already exist, Pleae enter a new email`);
            // console.log(userEmail);
        }
        else {
            // securing password
            const spassword = await securePassword(req.body.password);
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: spassword
            });

            // Saving user details
            await user.save();
            res.status(201);
            res.send(`Registration successful.....`)
        }
    } catch (error) {
        console.log(error.message);
    }
};


exports.loginUser = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const userData = await User.findOne({ email: email });
        console.log(userData);
        if (userData) {
            const passwordMatch = await bcrypt.compare(password, userData.password)
            if (passwordMatch) {
                res.status(201);
                res.send(`User ${userData.name} is Login....`);
            }
            else {
                res.status(420);
                res.send(`Password is incorrect Please reenter the Password.`);
            }
        }
        else {
            res.status(421);
            res.send(`Please Enter a Valid Mail.`);
        }
    } catch (error) {
        console.log(error);
    }
};