import express from "express";
import * as pin from "../controllers/pinController.js";
import { checkUserJWT } from "../middleware/jwtAction.js";

const router = express.Router();

const pinRoutes = (app) => {
    // comment pin
    router.get("/fetch-all-comment-pin", pin.fetchAllCommentPin);
    router.post("/:id/comment-pin", checkUserJWT, pin.commentPin);
    router.put("/:id/like-comment-pin", checkUserJWT, pin.likeCommentPin);
    router.delete("/delete-comment-pin", checkUserJWT, pin.deleteCommentPin);
    // pin
    router.get("/fetch-all-pin", pin.fetchAllPin);
    router.get("/fetch-pin-by-id", pin.fetchPinById);
    router.get("/fetch-pin-by-search", pin.fetchPinBySearch);
    router.get("/fetch-user-by-search", pin.fetchUserBySearch);
    router.get("/fetch-all-pin-by-user-save", pin.fetchAllPinByUserSave);
    router.get("/fetch-all-pin-by-user-create", pin.fetchAllPinByUserCreate);

    router.post("/create-pin", checkUserJWT, pin.createNewPin);
    router.delete("/delete-pin", checkUserJWT, pin.deletePin);
    router.put("/update-pin", checkUserJWT, pin.updatePin);

    router.put("/:id/save-pin", checkUserJWT, pin.savePin);

    return app.use("/v1/pin", router);
};
export default pinRoutes;
// module.exports = authRoutes;
