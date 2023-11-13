import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { FormattedMessage } from "react-intl";

import "./style.scss";
import config from "../../../config";
import Button from "../../Button/Button";

import * as actions from "../../../store/actions";

const OptionsMoreModal = ({
    closeModal,
    isShow,
    userInfo,
    isLoggedIn,
    data,
    deletePin,
}) => {
    const modalRef = useRef();
    const [menuOptions, setMenuOptions] = useState([]);
    useEffect(() => {
        let menu = [];
        if (
            userInfo &&
            !_.isEmpty(userInfo) &&
            isLoggedIn &&
            data?.userId &&
            userInfo?._id === data?.userId
        ) {
            menu = config.pinModalOption.pinModalOptionsMore_User;
        } else {
            menu = config.pinModalOption.pinModalOptionsMore_Guest;
        }
        setMenuOptions((prev) => [...prev, ...menu]);
    }, [userInfo]);

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

    const handleClickOption = (e, action) => {
        e.stopPropagation();
        if (action.action === "delete") {
            // Delete Pin
            deletePin(data._id);
        }
        closeModal();
    };

    return (
        <>
            <div
                ref={modalRef}
                className={`options-more-wrapper ${isShow && "show"}`}
            >
                <div className="options-more-container">
                    <div className="content-description">
                        <FormattedMessage id={"modal.pin.more.title"} />
                    </div>
                    {menuOptions &&
                        menuOptions.length > 0 &&
                        menuOptions.map((option, index) => {
                            return (
                                <div className="option-wrapper" key={index}>
                                    <Button
                                        href={
                                            option.action === "download" &&
                                            data?.image
                                        }
                                        download={
                                            option.action === "download" &&
                                            data?.title
                                        }
                                        className={`${option.action} content-description option-content`}
                                        onClick={(e) =>
                                            handleClickOption(e, option)
                                        }
                                        leftIcon={option.icon && option.icon}
                                    >
                                        {option.name}
                                    </Button>
                                </div>
                            );
                        })}
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
    return {
        deletePin: (pinId) => dispatch(actions.deletePin(pinId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OptionsMoreModal);
