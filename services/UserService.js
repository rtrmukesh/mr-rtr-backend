const User = require("../db/models/User");
const md5 = require("md5");
const { md5Password } = require("../lib/utils");


class UserService {

    static async login(req, res, next) {
        let data = req.body;

        if (!data?.email) {
            return res.json(400, { message: "Email is required" });
        }

        if (!data?.password) {
            return res.json(400, { message: "Password is required" });
        }

        await User.findOne({ where: { email: data?.email } })
            .then((userResponse) => {
                if (!userResponse) {
                    return res.json(400, { message: "Invalid Username or Password" });
                }

                if (userResponse.password !== md5(data?.password)) {
                    return res.json(400, { message: "Invalid credentials" });
                }

                const session_id = userResponse.session_id || Math.floor(Date.now());

                userResponse
                    .update({
                        session_id: session_id,
                    })
                    .then(() => {
                        res.json({
                            message: "User LoggedIn SuccessFully",
                            user: {
                                token: session_id,
                            },
                        });
                    });
            })
            .catch((err) => {
                console.log(err);
            });
    }


    static async signUp(req, res, next) {
        let data = req.body;
        let isUserExits = await User.findOne({
            where: {
                email: data?.email,
            },
        });

        if (isUserExits) {
            return res.json(400, { message: 'User Already Exits' });
        }

        let createData = {
            name: data?.name,
            email: data?.email,
            password: md5Password(data?.newPassword),
        };

        await User.create(createData)
            .then((response) => {
                res.json(200, { message: "User Created Successfully" });
            })
            .catch((err) => {
                console.log(err);
                res.json(400, { message: `User Creation err-->${err}` });
            });
    }
}
module.exports = UserService;
