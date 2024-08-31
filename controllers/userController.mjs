import crypto from "crypto"; 
import User from "../models/user.mjs";

const salt = "b2d23e7020a730247b953429d8115644";

export default class UserController {
    //Important:: User authencaction functions below
    async login(req, res, next) {
        if (req.method != 'POST')
            res.status(409).send({"error" :"Invalid request received!"});
        try {
            const user = await User.findOne({ "email": req.body.email });
            if (!user) {
                res.status(404).send({ "error": "User not found" });
                const hashedPassword = crypto.pbkdf2Sync(req.body.password, salt, 10240, 64, 'sha512').toString('hex');
            } else if (hashedPassword === req.body.password) {
                res.status(202).send({
                    "_id": user._id,
                    "username": user.username,
                    "email": user.email,
                    "gender": user.gender,
                });
            } else {
                res.status(401).send({ "error": "Invalid password" });
            }
        } catch (error) {
            next(error);
        }
    }
    async loginWithId(req, res, next) {
        if (req.method != 'POST')
            res.status(409).send({"error" :"Invalid request received!"});
        try {
            const user = await User.findOne({ "_id": req.params.id});
            if (!user) {
                res.status(404).send({ "error": "User not found" });
            } else {
                res.status(202).send({
                    "_id": user._id,
                    "username": user.username,
                    "email": user.email,
                    "gender": user.gender,
                });
            }
        } catch (error) {
            next(error);
        }
    }
    async register(req, res, next) {
        if (req.method != 'POST')
            res.status(409).send({"error" :"Invalid request received!"});
        try {
            const existingUser = await User.findOne({ "email": req.body.email });
            if (existingUser) {
                res.status(409).send({ error: "User already exists" });
            } else {
                const salt = crypto.randomBytes(32).toString('hex');
  const hashedPassword = crypto.pbkdf2Sync(req.body.password, salt, 10240, 64, 'sha512').toString('hex');
  const newUser = await User.create({ ...req.body, password: hashedPassword, salt });
                res.status(201).send({
                    "_id": newUser._id,
                    "username": newUser.username,
                    "email": newUser.email,
                    "gender": newUser.gender,
                });
            }
        } catch (error) {
            next(error);
        }
    }

    //Reading methods below
    async getUsers(req, res, next) {
        if (req.method != 'GET')
            res.status(409).send({"error" :"Invalid request received!"});
        User.find().then(function(users) {
            res.status(200).send(users);
        }).catch(next);
    }
    async getUser(req, res, next) {
        if (req.method != 'GET')
            res.status(409).send({"error" :"Invalid request received!"});
        const userId = req.params.id;
        User.findOne({ "_id": userId }).then(function(user) {
            if (user) {
                res.status(200).send(user); // Fix: Send the actual user object
            } else {
                res.status(404).send({ "error": "User not found." });
            }
        }).catch(next);
    }


    //Updating methods below
    async updateUser(req, res, next) {
        const userId = req.params.id;
        const updates = {};
        if (req.body.username) updates.username = req.body.username;
        if (req.body.email) updates.email = req.body.email;
        if (req.body.password) updates.password = await bcrypt.hash(req.body.password, 10);
        // Add more fields as needed
        User.findByIdAndUpdate(userId, updates).then(function(updatedUser) {
            if (updatedUser) {
                res.status(200).send(updatedUser);
            } else {
                res.status(404).send({ "error": "User not found" });
            }
        }).catch(next);
    }
    async changeUserDetails(req, res, next) {
        if (req.method != 'PUT')
            res.status(409).send({"error" :"Invalid request received!"});
        const userId = req.params.id;
        const updates = {};
        if (req.body.username) updates.username = req.body.username;
        if (req.body.email) updates.email = req.body.email;
        if (req.body.gender) updates.gender = req.body.gender;
        User.findOneAndUpdate({ "_id": userId }, updates).then(function(updatedUser) {
            if (updatedUser) {
                res.status(200).send(updatedUser);
            } else {
                res.status(404).send({ "error": "User not found. Could not update user details." });
            }
        }).catch(next);
    }
    async changePassword(req, res, next) {
        if (req.method != 'PUT')
            res.status(409).send({"error" :"Invalid request received!"});
        const userId = req.params.id;
        if (!req.body.currentPassword || !req.body.newPassword) {
            res.status(400).send({ "error": "Current password and new password are required." });
            return;
        }
        User.findOne({ "_id": userId }).then(async function(user) {
            if (user) {
                const oldHashedPassword = crypto.pbkdf2Sync(req.body.currentPassword, salt, 10240, 64, 'sha512').toString('hex');
                if (oldHashedPassword === req.body.password) {
                    const hashedPassword = crypto.pbkdf2Sync(req.body.newPassword, salt, 10240, 64, 'sha512').toString('hex');
                    User.findOneAndUpdate({ "_id": userId }, { password: hashedPassword }).then(function(updatedUser) {
                        if (updatedUser) {
                            res.status(200).send({ "message": "Password changed successfully." });
                        } else {
                            res.status(404).send({ "error": "User not found. Could not update user password." });
                        }
                    }).catch(next);
                } else {
                    res.status(400).send({ "error": "Current password does not match." });
                }
            } else {
                res.status(404).send({ "error": "User not found." });
            }
        }).catch(next);
    }

    //Deleting methods below
    async deleteUser (req, res, next) {
        if (req.method != 'DELETE')
            res.status(409).send({"error" :"Invalid request received!"});
        await User.findOneAndDelete({ "_id": req.params.id }).then(function(result) {
            if (result) {
                res.status(200).send({ "message": "User deleted successfully." });
            } else {
                res.status(404).send({ "error": "User not found." });
            }
        }).catch(next);
    }
}