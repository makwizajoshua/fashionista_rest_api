import bcrypt from "bcrypt";
import User from "../models/user.mjs";

export default class UserController {
    //Important:: User authencaction functions below
    async login(req, res, next) {
        if (req.method != 'POST')
            res.status(409).send({"error" :"Invalid request received!"});
        try {
            const user = await User.findOne({ "email": req.body.email });
            if (!user) {
                res.status(404).send({ "error": "User not found" });
            } else if (await bcrypt.compare(req.body.password, user.password)) {
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
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                const newUser = await User.create({ ...req.body, password: hashedPassword });
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
    async changeUsername(req, res, next) {
        const userId = req.params.id;
        User.findOneAndUpdate({ "_id": userId }, { username: req.body.username }).then(function(updatedUser) {
            if (updatedUser) {
                res.status(200).send(updatedUser);
            } else {
                res.status(404).send({ "error": "User not found. Could not update username." });
            }
        }).catch(next);
    }
    async changeEmail(req, res, next) {
        if (req.method != 'PUT')
            res.status(409).send({"error" :"Invalid request received!"});
        const userId = req.params.id;
        User.findOneAndUpdate({ "_id": userId }, { email: req.body.email }).then(function(updatedUser) {
            if (updatedUser) {
                res.status(200).send(updatedUser);
            } else {
                res.status(404).send({ "error": "User not found. Could not update user email." });
            }
        }).catch(next);
    }
    async changeGender(req, res, next) {
        try {
            await User.findOneAndUpdate({"_id": req.body._id}, {"gender": req.body.gender}).then((data) => {
                if (data) {
                    res.status(200).send(data);
                } else {
                    res.status(404).send({"error": "User not found"});
                }
            }).catch((errData) => {
                next(errData);
            });
        } catch(e) {
            next(e);
        }
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
                if (await bcrypt.compare(req.body.currentPassword, user.password)) {
                    const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
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