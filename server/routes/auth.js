import express from "express";

import * as auth from "../controllers/authController.js";

const router = express.Router();

const authRoutes = (app) => {
    // router.all("*", checkAuthJWT);

    // router.post("/auth/google", signInWithGoogle);
    router.post("/login", auth.handleLogin);
    router.post("/register", auth.handleRegister);

    return app.use("/v1/auth", router);
};
export default authRoutes;
// module.exports = authRoutes;
