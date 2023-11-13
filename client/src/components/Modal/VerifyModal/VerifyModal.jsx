import { useState } from "react";
import { connect } from "react-redux";

import "./style.scss";
import BackDrop from "../BackDrop";
import Spinner from "../../Spinner/Spinner";
import * as actions from "../../../store/actions";

import Button from "../../Button/Button";

const VerifyModal = ({ setIsShowModal, isShow }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleKeyDown = (e) => {
        if (e?.key === "Enter") {
            handleDeletePin();
        }
    };
    const handleDeletePin = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setIsLoading(true);
    };

    const closeModal = () => {};

    return (
        <>
            <BackDrop isShow={isShow} />
            <div className={`modal-login-container ${isShow && "show"}`}>
                {isLoading && (
                    <div className="loading-wrapper">
                        <Spinner />
                    </div>
                )}
                <div className="title">
                    <h1>Bạn có chắc không?</h1>
                </div>
                <div className="description">
                    <span>Bạn không thể hoàn tác khi đã xóa một Ghim!</span>
                </div>
                <div
                    className="login-form"
                    onKeyDown={handleKeyDown}
                    tabIndex={0}
                >
                    <div className="btn">
                        <Button onClick={closeModal}>Hủy</Button>
                    </div>
                    <div className="btn">
                        <Button onClick={handleDeletePin}>Xóa</Button>
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
export default connect(mapStateToProps, mapDispatchToProps)(VerifyModal);
