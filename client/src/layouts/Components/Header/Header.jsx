import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import _ from "lodash";

import "./style.scss";
import config from "../../../config";
import Search from "../Search/Search";
import Navigator from "../Navigator/Navigator";
import { UserIcon } from "../../../assets/icon";
import Modal from "../../../components/Modal/Modal";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import MoreProfileModal from "../../../components/Modal/MoreProfileModal/MoreProfileModal";

const Header = ({ isLoggedIn, userInfo }) => {
    const [menuNav, setMenuNav] = useState({
        menuLeft: [],
        menuRight: [],
    });
    const [checkUser, setCheckUser] = useState(false);
    const [userData, setUserData] = useState(null);

    const [isShowModal, setIsShowModal] = useState({
        profile: false,
    });

    const handleClickAction = (action) => {
        const copyState = { ...isShowModal };
        copyState[action] = !copyState[action];

        setIsShowModal((prev) => ({ ...prev, ...copyState }));
    };

    useEffect(() => {
        let menuLeft = [];
        let menuRight = [];
        if (userInfo && !_.isEmpty(userInfo) && isLoggedIn) {
            setUserData(userInfo);
            setCheckUser(true);
            menuLeft = config.userMenuNav.menuLeft;
            menuRight = config.userMenuNav.menuRight;
        } else {
            setCheckUser(false);
            menuLeft = config.guestMenuNav.menuLeft;
            menuRight = config.guestMenuNav.menuRight;
        }
        setMenuNav((prev) => ({
            ...prev,
            menuLeft: menuLeft,
            menuRight: menuRight,
        }));
    }, [userInfo]);

    return (
        <>
            <div className="header-wrapper">
                <Navigator menus={menuNav.menuLeft} />
                <Search />
                <Navigator
                    menus={menuNav.menuRight}
                    userInfo={userInfo ? userInfo : null}
                />
                {checkUser && (
                    <>
                        <div className="nav-image-wrapper">
                            <NavLink
                                title={userInfo?.fullName}
                                to={`/${
                                    userInfo?.userName || userData?.userName
                                }`}
                                state={{
                                    userId: userInfo?._id || userData?._id,
                                }}
                                className={({ isActive }) =>
                                    isActive
                                        ? "nav-image image-active"
                                        : "nav-image"
                                }
                            >
                                <div className="avatar-wrapper">
                                    {userInfo?.selectedFile ? (
                                        <img
                                            src={userInfo.selectedFile}
                                            alt={userInfo?.fullName}
                                        />
                                    ) : (
                                        <UserIcon />
                                    )}
                                </div>
                            </NavLink>
                        </div>

                        <div className="nav-more-wrapper">
                            <button
                                className={`nav-link btn btn-non-active ${
                                    isShowModal.profile && "btn-active"
                                }`}
                                onClick={() => handleClickAction("profile")}
                            >
                                <span className="nav-link-title">
                                    <MdOutlineKeyboardArrowDown
                                        fontSize={25}
                                        title={
                                            <FormattedMessage
                                                id={"header.profile.title"}
                                            />
                                        }
                                    />
                                </span>
                            </button>
                            {isShowModal.profile && (
                                <Modal
                                    action="profile"
                                    modal={<MoreProfileModal />}
                                    setIsShowModal={setIsShowModal}
                                />
                            )}
                        </div>
                    </>
                )}
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
