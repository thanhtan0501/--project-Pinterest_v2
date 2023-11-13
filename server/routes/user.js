import express from "express";

import * as user from "../controllers/userController.js";
import { checkUserJWT } from "../middleware/jwtAction.js";

const router = express.Router();

const userRoutes = (app) => {
    router.get("/fetch-user-by-id", user.fetchUserById);

    router.put("/:id/follow-user", checkUserJWT, user.followUser);

    return app.use("/v1/user", router);
};
export default userRoutes;
