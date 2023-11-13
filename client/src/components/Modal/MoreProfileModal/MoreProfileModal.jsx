import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { FormattedMessage } from "react-intl";

import "./style.scss";
import config from "../../../config";
import Button from "../../Button/Button";
import { HiCheck } from "react-icons/hi";
import { UserIcon } from "../../../assets/icon";

import * as actions from "../../../store/actions";

const MoreProfileModal = ({
    closeModal,
    isShow,
    userInfo,
    isLoggedIn,
    processLogout,
}) => {
    const modalRef = useRef();

    const [userData, setUserData] = useState(null);
    const [menuModal, setMenuModal] = useState([]);

    useEffect(() => {
        let menu = [];
        if (userInfo && !_.isEmpty(userInfo) && isLoggedIn) {
            setUserData(userInfo);
            menu = config.pinModalOption.profileModal.user;
        } else {
            menu = config.pinModalOption.profileModal.guest;
        }
        setMenuModal(menu);
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

    return (
        <div
            ref={modalRef}
            className={`more-profile-wrapper ${isShow && "show"}`}
        >
            <div className="more-profile-container">
                <div style={{ width: "100%" }}>
                    <div className="description">Your Account</div>
                    <div className="profile-info">
                        <Button
                            to={`/${userInfo?.userName}`}
                            state={{
                                userId: userInfo?._id,
                            }}
                            className="profile-info-link"
                        >
                            <div className="profile-avatar ">
                                {userInfo?.image ? (
                                    <img
                                        src={userInfo?.image}
                                        // src="https://i.pinimg.com/75x75_RS/04/93/8c/04938c0a946a7fbb3d6c99dc1ff5c775.jpg"
                                        alt={userInfo?.fullName}
                                    />
                                ) : (
                                    <div className="user-icon-wrapper">
                                        <UserIcon />
                                    </div>
                                )}
                            </div>
                            <div className="info-description">
                                <div className="user-name">
                                    {userInfo?.fullName}
                                </div>
                                <div className="email text-[#5f5f5f] break-words	text-sm">
                                    {userInfo?.email}
                                </div>
                            </div>
                        </Button>
                        <div className="flex justify-center items-center flex-row">
                            <HiCheck fontSize={25} />
                        </div>
                    </div>
                </div>
                <div style={{ width: "100%", color: "#111" }}>
                    <div className="description">More Options</div>
                    {menuModal.map((option) => (
                        <Button
                            to={option.link}
                            className="option-link p-2 block rounded-[8px] m-0 text-[16px] font-semibold hover:bg-[#e9e9e9] transition-all"
                            onClick={closeModal}
                            key={option.name}
                        >
                            {option.name}
                        </Button>
                    ))}

                    <div
                        className="profile-info"
                        onClick={() => {
                            processLogout();
                            closeModal();
                        }}
                        title="Log out"
                    >
                        <FormattedMessage id={"header.profile.logout"} />
                    </div>
                </div>
            </div>
        </div>
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
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreProfileModal);
