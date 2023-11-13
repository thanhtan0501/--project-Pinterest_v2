import * as pinService from "../services/pinService.js";

export const fetchAllPin = async (req, res) => {
    try {
        const pinsData = await pinService.fetchAllPinService();
        return res.status(200).json(pinsData);
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: "Error from server",
        });
    }
};
export const fetchAllPinByUserCreate = async (req, res) => {
    try {
        const pinsData = await pinService.fetchAllPinByUserCreateService(
            req.query.userId
        );
        return res.status(200).json(pinsData);
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: "Error from server",
        });
    }
};
export const fetchAllCommentPin = async (req, res) => {
    try {
        const comments = await pinService.fetchAllCommentPinService(
            req.query.pinId
        );
        return res.status(200).json(comments);
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: "Error from server",
        });
    }
};
export const fetchAllPinByUserSave = async (req, res) => {
    try {
        const pinsData = await pinService.fetchAllPinByUserSaveService(
            req.query.userId
        );
        return res.status(200).json(pinsData);
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: "Error from server",
        });
    }
};
export const fetchPinById = async (req, res) => {
    try {
        const pinsData = await pinService.fetchPinByIdService(req.query.pinId);
        return res.status(200).json(pinsData);
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: "Error from server",
        });
    }
};
export const fetchPinBySearch = async (req, res) => {
    try {
        const { q, tags } = req.query;
        const pinsData = await pinService.fetchPinBySearchService(q, tags);
        return res.status(200).json(pinsData);
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: "Error from server",
        });
    }
};
export const fetchUserBySearch = async (req, res) => {
    try {
        const { q } = req.query;
        const usersData = await pinService.fetchUserBySearchService(q);
        return res.status(200).json(usersData);
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: "Error from server",
        });
    }
};
export const createNewPin = async (req, res) => {
    try {
        const userInfo = req.user;
        const message = await pinService.createNewPinService(
            req.body,
            userInfo
        );
        return res.status(200).json(message);
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: "Error from server",
        });
    }
};
export const updatePin = async (req, res) => {
    try {
        const message = await pinService.updatePinService(req.body);
        return res.status(200).json(message);
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: "Error from server",
        });
    }
};
export const deletePin = async (req, res) => {
    try {
        const message = await pinService.deletePinService(req.body.id);
        return res.status(200).json(message);
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: "Error from server",
        });
    }
};

export const savePin = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(200).json({
                errorCode: 1,
                message: "Unauthenticated",
            });
        }
        const message = await pinService.savePinService(
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
export const commentPin = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(200).json({
                errorCode: 1,
                message: "Unauthenticated",
            });
        }
        const message = await pinService.commentPinService(
            req.params.id,
            req.body.comment,
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
export const likeCommentPin = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(200).json({
                errorCode: 1,
                message: "Unauthenticated",
            });
        }
        const message = await pinService.likeCommentPinService(
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
export const deleteCommentPin = async (req, res) => {
    try {
        const message = await pinService.deleteCommentPinService(
            req.body.commentId
        );
        return res.status(200).json(message);
    } catch (error) {
        return res.status(200).json({
            errorCode: -1,
            message: "Error from server",
        });
    }
};
