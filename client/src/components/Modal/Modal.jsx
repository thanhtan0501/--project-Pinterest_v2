import React, { useEffect, useState } from "react";

const Modal = ({
    modal,
    setIsShowModal,
    action,
    duration = null,
    userInfo,
    isLoggedIn,
    data,
}) => {
    const [isShow, setIsShow] = useState(false);

    useEffect(() => {
        setIsShow(true);
    }, []);

    useEffect(() => {
        if (isShow) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isShow]);

    const closeModal = () => {
        setIsShow(false);
        setTimeout(
            () => {
                setIsShowModal((prev) => ({
                    ...prev,
                    [action ? action : prev]: false,
                    // ...isShowModal,
                }));
            },
            duration ? duration : 125
        );
    };

    const props = {
        closeModal: closeModal,
        isShow: isShow,
        userInfo: userInfo,
        isLoggedIn: isLoggedIn,
        data: data ? data : {},
    };

    modal = React.cloneElement(modal, props);
    return <>{modal}</>;
};

export default Modal;
