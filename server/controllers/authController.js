import * as authService from "../services/authService.js";

export const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(500).json({
            errorCode: 1,
            message: {
                email: !email ? "Missing inputs parameter!" : "",
                password: !password ? "Missing inputs parameter!" : "",
            },
        });
    }
    const { access_token, ...data } = await authService.handleUserLogin(
        email,
        password
    );
    console.log(access_token);
    // set cookies
    res.cookie("jwt", access_token, {
        httpOnly: true,
        // maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
        errorCode: data.errorCode,
        message: data.message,
        user: data.user ? data.user : {},
    });
};
export const handleRegister = async (req, res) => {
    const { access_token, ...userData } = await authService.handleUserRegister(
        req.body
    );

    delete userData?.user?.createdAt;
    delete userData?.user?.updatedAt;
    res.cookie("jwt", access_token, {
        httpOnly: true,
        // maxAge: 60 * 60 * 1000,
    });
    return res.status(200).json({
        errorCode: userData.errorCode,
        message: userData.message,
        user: userData.user ? userData.user : {},
    });
};
