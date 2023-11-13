import User from "../models/user.js";
import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";
import { createJWT } from "../middleware/jwtAction.js";

dotenv.config();

const checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            const existingUser = await User.findOne({
                email: userEmail,
            }).lean();
            if (existingUser) resolve(existingUser);
            else resolve(false);
        } catch (error) {
            reject(error);
        }
    });
};

const salt = bcrypt.genSaltSync(10);
const hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            const hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword);
        } catch (error) {
            reject(error);
        }
    });
};

export const handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {};
            const existingUser = await checkUserEmail(email);
            if (existingUser) {
                const isPasswordCorrect = await bcrypt.compare(
                    password,
                    existingUser.password
                );
                if (isPasswordCorrect) {
                    const payload = {
                        email: existingUser.email,
                        id: existingUser._id,
                    };
                    const access_token = createJWT(payload, "10h");

                    userData.access_token = access_token;
                    userData.errorCode = 0;
                    userData.message = {
                        success: "OK",
                    };
                    const { password, createdAt, updatedAt, ...data } =
                        existingUser;
                    userData.user = data;
                } else {
                    userData.errorCode = 3;
                    userData.message = {
                        password:
                            "The password you entered is incorrect. Please try again",
                    };
                }
            } else {
                userData.errorCode = 2;
                userData.message = {
                    email: "User doesn't exist. Please try other email!!!",
                };
            }
            resolve(userData);
        } catch (error) {
            reject(error);
        }
    });
};
export const handleUserRegister = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (
                !data.email ||
                !data.password ||
                !data.confirmPassword ||
                !data.firstName ||
                !data.lastName
            ) {
                resolve({
                    errorCode: 1,
                    message: { failed: "Missing required parameters!" },
                });
            } else {
                let userData = {};
                const existingUser = await checkUserEmail(data.email);
                if (!existingUser) {
                    if (data.password !== data.confirmPassword) {
                        resolve({
                            errorCode: 1,
                            message: "Password don't match!!!",
                        });
                    } else {
                        const hashedPassword = await hashUserPassword(
                            data.password
                        );

                        const userName = `${data.firstName}${data.lastName}`;

                        const userInfo = await User.create({
                            email: data.email,
                            password: hashedPassword,
                            firstName: data.firstName,
                            lastName: data.lastName,
                            userName: userName.toLowerCase(),
                            fullName: `${data.firstName} ${data.lastName}`,
                            image: "",
                        });
                        if (userInfo) {
                            const payload = {
                                email: userInfo.email,
                                id: userInfo._id,
                            };
                            const token = createJWT(payload, "10h");

                            const access_token = createJWT(payload, "10h");

                            const { password, ...data } = userInfo._doc;
                            userData.access_token = access_token;

                            userData.errorCode = 0;
                            userData.message = {
                                success: "OK",
                            };
                            userData.user = data;
                        } else {
                            userData.errorCode = 3;
                            userData.message = {
                                failed: "Please try again!!!",
                            };
                        }
                    }
                } else {
                    userData.errorCode = 2;
                    userData.message = {
                        email: "User already exists. Please try other email!!!",
                    };
                }
                resolve(userData);
            }
        } catch (error) {
            reject(error);
        }
    });
};
