import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const nonSecurePaths = ["/v1/auth/login"];

export const createJWT = (payload, expiresIn) => {
    let token = null;
    try {
        token = jwt.sign(payload, "tanthanh", { expiresIn: expiresIn });
    } catch (error) {
        console.log(error);
    }
    return token;
};

export const verifyJWT = (token) => {
    let data = null;
    try {
        data = jwt.verify(token, "tanthanh");
    } catch (error) {
        console.log(error);
    }

    return data;
};

export const checkUserJWT = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) {
        return next();
    }
    const cookies = req.cookies;

    if (cookies && cookies.jwt) {
        const decoded = verifyJWT(cookies.jwt);
        if (decoded) {
            req.user = decoded;
            next();
        } else {
            return res.status(401).json({
                errorCode: -1,
                message: "Not authenticated the user",
            });
        }
    } else {
        return res.status(401).json({
            errorCode: -1,
            message: "You're not authenticated",
        });
    }
};
export const checkUserPermission = (req, res, next) => {
    if (nonSecurePaths.includes(req.path)) {
        return next();
    }
    if (req.user) {
        const email = req.user.email;
        const roles = req.user.groupWithRoles?.Roles;
        const currentUrl = req.path;
        if (!roles || roles.length === 0) {
            return res.status(403).json({
                errorCode: -1,
                message: `You don't have permission to access this resource..`,
                data: "",
            });
        }
        const accessible = roles.some((item) => item?.url === currentUrl);
        if (accessible) {
            next();
        } else {
            return res.status(403).json({
                errorCode: -1,
                message: `You don't have permission to access this resource..`,
                data: "",
            });
        }
    } else {
        return res.status(401).json({
            errorCode: -1,
            message: "Not authenticated the user",
            data: "",
        });
    }
};
