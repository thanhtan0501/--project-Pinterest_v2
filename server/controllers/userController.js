import * as userService from "../services/userService.js";

export const fetchUserById = async (req, res) => {
    try {
        const userData = await userService.fetchUserByIdService(
            req.query.userId
        );
        return res.status(200).json(userData);
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: "Error from server",
        });
    }
};
export const followUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(200).json({
                errorCode: 1,
                message: "Unauthenticated",
            });
        }
        const message = await userService.followUserService(
            req.params.id,
            req.user
        );
        return res.status(200).json(message);
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: "Error from server",
        });
    }
};
