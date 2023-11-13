import { useState } from "react";
import { connect } from "react-redux";

import "./style.scss";
import BackDrop from "../BackDrop";
import Spinner from "../../Spinner/Spinner";
import * as actions from "../../../store/actions";
import { CloseIcon, LogoIcon, WarningIcon } from "../../../assets/icon";
import { handleLoginService } from "../../../services/authService";

const LoginModal = ({ closeModal, isShow, userLoginSuccess }) => {
    const [dataForm, setDataForm] = useState({
        email: "",
        password: "",
    });
    const [isError, setIsError] = useState({
        email: false,
        password: false,
    });
    const [errorMessage, setErrorMessage] = useState({
        email: "",
        password: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleOnChangeInput = (e) => {
        if (isError[e.target.name]) {
            setIsError((prev) => ({ ...prev, [e.target.name]: false }));
            setErrorMessage((prev) => ({ ...prev, [e.target.name]: "" }));
        }
        const copyState = { ...dataForm };
        copyState[e.target.name] = e.target.value;
        setDataForm((prev) => ({ ...prev, ...copyState }));
    };

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            if (dataForm.email) {
                setErrorMessage({ email: "", password: "" });
                const { data } = await handleLoginService(dataForm);
                if (data && data.errorCode === 0) {
                    userLoginSuccess(data.user);
                    closeModal();
                }
                if (data.errorCode !== 0) {
                    setIsError((prev) => ({
                        ...prev,
                        password: data.message.password ? true : false,
                        email: data.message.email ? true : false,
                    }));
                    setErrorMessage((prev) => ({ ...prev, ...data.message }));
                }
            } else {
                setIsError((prev) => ({ ...prev, email: true }));
            }
            setIsLoading(false);
        } catch (e) {
            if (e?.response?.data) {
                const error = e.response.data.message;
                setIsError((prev) => ({
                    ...prev,
                    password: error.password ? true : false,
                    email: error.email ? true : false,
                }));
                setErrorMessage((prev) => ({
                    ...prev,
                    ...error,
                }));
                setIsLoading(false);
            }
        }
    };

    const handleKeyDown = (e) => {
        if (e?.key === "Enter") {
            handleLogin();
        }
    };

    return (
        <>
            <BackDrop closeModal={closeModal} isShow={isShow} />
            <div className={`modal-login-container ${isShow && "show"}`}>
                {isLoading && (
                    <div
                        className="loading-wrapper"
                        style={{ borderRadius: "32px" }}
                    >
                        <Spinner />
                    </div>
                )}
                <div className="close-btn" onClick={closeModal}>
                    <CloseIcon />
                </div>
                <div className="logo">
                    <LogoIcon />
                </div>
                <div className="title">
                    <h1>Chào mừng bạn đến với Pinterest</h1>
                </div>
                <div
                    className="login-form"
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                >
                    <div className="login-form-content">
                        <div className="login-input">
                            <label id="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                className={`${
                                    isError.email && "missing-input"
                                }`}
                                placeholder="Email"
                                autoFocus
                                value={dataForm.email}
                                onChange={handleOnChangeInput}
                            />
                            {isError.email && (
                                <div className="input-error-message">
                                    <div className="error-icon">
                                        <WarningIcon />
                                    </div>
                                    <div className="error-message">
                                        {errorMessage.email ? (
                                            errorMessage.email
                                        ) : (
                                            <>
                                                Bạn đã bỏ lỡ điều gì đó! Đừng
                                                quên thêm địa chỉ email của bạn.
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="login-input">
                            <label id="password">Mật khẩu</label>
                            <div className="custom-input-password">
                                <input
                                    type="text"
                                    name="password"
                                    // type={
                                    //     this.state.isShowPassword
                                    //         ? "text"
                                    //         : "password"
                                    // }
                                    placeholder="Mật khẩu"
                                    value={dataForm.password}
                                    onChange={handleOnChangeInput}
                                    className={`${
                                        isError.password && "missing-input"
                                    }`}
                                />
                                <span
                                // className=""
                                // onClick={() =>
                                //     this.handleShowHidePassword()
                                // }
                                >
                                    {/* <i
                                            className={
                                                this.state.isShowPassword
                                                    ? "fas fa-eye"
                                                    : "fas fa-eye-slash"
                                            }
                                        ></i> */}
                                </span>
                            </div>
                            {errorMessage.password && (
                                <div className="input-error-message">
                                    <div className="error-icon">
                                        <WarningIcon />
                                    </div>
                                    <div className="error-message">
                                        {errorMessage.password}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="login-btn">
                            <button onClick={handleLogin}>Đăng nhập</button>
                        </div>
                    </div>
                    <p>Hoặc</p>
                    <div className="login-with-social">
                        {/* Google Login */}
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userLoginSuccess: (userInfo) =>
            dispatch(actions.userLoginSuccess(userInfo)),
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);
