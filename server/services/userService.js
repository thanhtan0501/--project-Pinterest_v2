import mongoose from "mongoose";
import User from "../models/user.js";
import dotenv from "dotenv";

dotenv.config();

// Get user by ID
export const fetchUserByIdService = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userId) {
                resolve({
                    errorCode: -1,
                    message: "Missing parameter...",
                });
            } else {
                if (!mongoose.Types.ObjectId.isValid(userId)) {
                    resolve({
                        errorCode: 2,
                        message: "No user with that id",
                    });
                }
                const userData = await User.findById(
                    { _id: userId },
                    { password: 0, createdAt: 0, updatedAt: 0 }
                ).exec();

                resolve({
                    errorCode: 0,
                    data: userData,
                    message: "Fetch user succeed!",
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};

// Follow
export const followUserService = (id, userInfo) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !userInfo) {
                resolve({
                    errorCode: 1,
                    message: "Missing parameter...",
                });
            } else {
                if (
                    !mongoose.Types.ObjectId.isValid(id) ||
                    !mongoose.Types.ObjectId.isValid(userInfo.id)
                ) {
                    resolve({
                        errorCode: 2,
                        message: "No user with that id",
                    });
                }
                if (id === userInfo.id) {
                    resolve({
                        errorCode: -1,
                        message: "Error from server",
                    });
                }
                const guest = await User.findById(id);
                const user = await User.findById(userInfo.id);

                const index1 = guest.follower.findIndex(
                    (userId) => userId === String(userInfo.id)
                );
                const index2 = user.followed.findIndex(
                    (userId) => userId === String(id)
                );
                if (index1 === -1) {
                    guest.follower.push(userInfo.id);
                } else {
                    guest.follower = guest.follower.filter(
                        (id) => id !== String(userInfo.id)
                    );
                }
                if (index2 === -1) {
                    user.followed.push(id);
                } else {
                    user.followed = user.followed.filter(
                        (id) => id !== String(id)
                    );
                }
                const updateGuest = await User.findByIdAndUpdate(id, guest, {
                    new: true,
                });
                const updateUser = await User.findByIdAndUpdate(
                    userInfo.id,
                    user,
                    {
                        new: true,
                    }
                );
                resolve({
                    errorCode: 0,
                    message: "Pin update successfully!",
                    data: updateGuest,
                });
            }
        } catch (error) {
            reject(error);
        }
    });
};
