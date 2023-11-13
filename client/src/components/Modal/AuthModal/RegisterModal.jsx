import { useState } from "react";
import { connect } from "react-redux";

import "./style.scss";
import BackDrop from "../BackDrop";
import Spinner from "../../Spinner/Spinner";
import * as actions from "../../../store/actions";
import { handleRegisterService } from "../../../services/authService";
import { CloseIcon, LogoIcon, WarningIcon } from "../../../assets/icon";
import getBase64 from "../../../hooks/getBase64";

const RegisterModal = ({ closeModal, isShow, userLoginSuccess }) => {
    const [dataForm, setDataForm] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [isError, setIsError] = useState({
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        confirmPassword: false,
    });
    const [errorMessage, setErrorMessage] = useState({
        email: "",
        confirmPassword: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const checkValidateInput = () => {
        let isValid = true;
        for (let i in dataForm) {
            if (!dataForm[i] && isError.hasOwnProperty(i)) {
                setIsError((prev) => ({ ...prev, [i]: true }));
                isValid = false;
            }
        }
        return isValid;
    };

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
            if (checkValidateInput()) {
                if (dataForm.password === dataForm.confirmPassword) {
                    const { data } = await handleRegisterService(dataForm);
                    if (data && data.errorCode === 0) {
                        userLoginSuccess(data.user);
                        closeModal();
                    }
                    if (data.errorCode !== 0) {
                        setIsError((prev) => ({
                            ...prev,
                            email: data.message.email ? true : false,
                        }));
                        setErrorMessage((prev) => ({
                            ...prev,
                            ...data.message,
                        }));
                    }
                } else {
                    setIsError((prev) => ({ ...prev, confirmPassword: true }));
                    setErrorMessage((prev) => ({
                        ...prev,
                        confirmPassword: "Nhập lại mật khẩu không chính xác!",
                    }));
                }
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
        if (e.key === "Enter") {
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
                    <h1>Đăng Ký</h1>
                </div>
                <div
                    className="login-form"
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                >
                    <div className="login-form-content">
                        <div className="login-input-name">
                            <div className="login-input">
                                <label id="firstName">First Name</label>
                                <input
                                    type="text"
                                    name="firstName"
                                    className={`${
                                        isError.firstName && "missing-input"
                                    }`}
                                    placeholder="First Name"
                                    autoFocus
                                    value={dataForm.firstName}
                                    onChange={handleOnChangeInput}
                                />

                                {isError.firstName && (
                                    <div className="input-error-message">
                                        <div className="error-icon">
                                            <WarningIcon />
                                        </div>
                                        <div className="error-message">
                                            Bạn đã bỏ lỡ điều gì đó!
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="login-input">
                                <label id="lastName">Last Name</label>
                                <input
                                    type="text"
                                    name="lastName"
                                    className={`${
                                        isError.lastName && "missing-input"
                                    }`}
                                    placeholder="Last Name"
                                    value={dataForm.lastName}
                                    onChange={handleOnChangeInput}
                                />
                                {isError.lastName && (
                                    <div className="input-error-message">
                                        <div className="error-icon">
                                            <WarningIcon />
                                        </div>
                                        <div className="error-message">
                                            Bạn đã bỏ lỡ điều gì đó!
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="login-input">
                            <label id="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                className={`${
                                    isError.email && "missing-input"
                                }`}
                                placeholder="Email"
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
                            <input
                                type="text"
                                name="password"
                                className={`${
                                    isError.password && "missing-input"
                                }`}
                                placeholder="Mật khẩu"
                                value={dataForm.password}
                                onChange={handleOnChangeInput}
                            />
                            {isError.password && (
                                <div className="input-error-message">
                                    <div className="error-icon">
                                        <WarningIcon />
                                    </div>
                                    <div className="error-message">
                                        Bạn đã bỏ lỡ điều gì đó!
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="login-input">
                            <label id="confirmPassword">
                                Nhập lại mật khẩu
                            </label>
                            <input
                                type="text"
                                name="confirmPassword"
                                className={`${
                                    isError.confirmPassword && "missing-input"
                                }`}
                                placeholder="Nhập lại mật khẩu"
                                value={dataForm.confirmPassword}
                                onChange={handleOnChangeInput}
                            />
                            {isError.confirmPassword && (
                                <div className="input-error-message">
                                    <div className="error-icon">
                                        <WarningIcon />
                                    </div>
                                    <div className="error-message">
                                        {errorMessage.confirmPassword ? (
                                            errorMessage.confirmPassword
                                        ) : (
                                            <>Bạn đã bỏ lỡ điều gì đó!</>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="login-btn">
                            <button onClick={handleLogin}>Đăng ký</button>
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
export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal);
