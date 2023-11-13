import { useEffect, useRef } from "react";
import { connect } from "react-redux";

import "./style.scss";

const NotificationModal = ({ closeModal, isShow, userInfo, isLoggedIn }) => {
    const modalRef = useRef();

    useEffect(() => {
        let handler = (e) => {
            if (!modalRef?.current?.contains(e.target) && isShow) {
                e.stopPropagation();
                e.preventDefault();
                closeModal();
            }
        };
        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    });

    return (
        <>
            <div
                ref={modalRef}
                className={`notification-wrapper ${isShow && "show"}`}
            >
                <div style={{ padding: "12px", textAlign: "center" }}>
                    <h4>Coming soon</h4>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationModal);
