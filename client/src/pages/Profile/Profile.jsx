import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { connect, useDispatch } from "react-redux";
import { FormattedMessage } from "react-intl";

import "./style.scss";
import * as actions from "../../store/actions";
import Button from "../../components/Button/Button";
import Spinner from "../../components/Spinner/Spinner";
import MasonryLayout from "../../components/MasonryLayout/MasonryLayout";
import { MenuIcon, ShareIcon } from "../../assets/icon";
import _ from "lodash";
import config from "../../config";

const Profile = ({
    userInfo,
    isLoggedIn,
    fetchAllPinCreate,
    fetchAllPinSave,
    pinsData,
    userNewData,
    isLoadingPins,
    followUser,
    fetchUserById,
}) => {
    const location = useLocation();

    const [currentId, setCurrentId] = useState(null);
    const [userData, setUserData] = useState(null);
    const [pins, setPins] = useState(null);
    const [followersArr, setFollowersArr] = useState(userData?.follower);
    const [activeBtn, setActiveBtn] = useState(true);

    const hasFollowUser = followersArr?.find(
        (follower) => follower === userInfo?._id
    );

    useEffect(() => {
        setCurrentId(location?.state?.userId);
    }, [location?.state?.userId]);
    useEffect(() => {
        fetchUserById(currentId);
    }, [currentId]);

    useEffect(() => {
        setUserData(userNewData);
        setFollowersArr(userNewData?.follower);
    }, [userNewData, followersArr]);

    useEffect(() => {
        if (activeBtn && userData && !_.isEmpty(userData)) {
            console.log("create", userData?._id);
            fetchAllPinCreate(userData?._id);
            setPins(pinsData);
        } else if (!activeBtn && userData && !_.isEmpty(userData)) {
            console.log("save");
            fetchAllPinSave(userData?._id);
            setPins(pinsData);
        }
    }, [activeBtn, userData]);

    const handleOpenModal = (e, value) => {
        e.stopPropagation();
        e.preventDefault();
        console.log(value);
    };
    const handleFollowUser = async (e) => {
        e.stopPropagation();
        if (userInfo && !_.isEmpty(userInfo) && isLoggedIn) {
            // Call api follow user
            await followUser(userData?._id);
            setUserData((prev) => ({ ...prev, ...userNewData }));
            // Render

            // await fetchUserById(currentId);
            if (hasFollowUser) {
                setFollowersArr(
                    followersArr.filter((id) => id !== userInfo?._id)
                );
            } else {
                setFollowersArr([...followersArr, userInfo?._id]);
            }
        } else {
            // Phân quyền call login modal
            console.log(123);
        }
    };

    console.log(userData);

    return (
        <div className="profile-wrapper">
            {userData && !_.isEmpty(userData) ? (
                <div className="profile-container">
                    <div className="profile-info">
                        <div className="profile-info-image">
                            <div className="user-background">
                                <img
                                    src="https://images.unsplash.com/photo-1504803900752-c2051699d0e8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8bmF0dXJlfHx8fHx8MTY5NzA5ODE0Ng&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600"
                                    alt={`${userData?.userName}-background`}
                                />
                            </div>
                            <div className="user-avatar">
                                <img
                                    // src={user.image}
                                    src="https://images.unsplash.com/photo-1504803900752-c2051699d0e8?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=900&ixid=MnwxfDB8MXxyYW5kb218MHx8bmF0dXJlfHx8fHx8MTY5NzA5ODE0Ng&ixlib=rb-4.0.3&q=80&utm_campaign=api-credit&utm_medium=referral&utm_source=unsplash_source&w=1600"
                                    alt={`${userData?.userName}-avatar`}
                                />
                            </div>
                        </div>
                        <div className="profile-info-name">
                            <h1 className="full-name">
                                {userData?.fullName
                                    ? userData?.fullName
                                    : userData?.userName}
                            </h1>
                            <div className="user-name">
                                @
                                {userData?.userName
                                    ? userData?.userName
                                    : userData?.fullName}
                            </div>
                        </div>
                        <div className="profile-info-follow">
                            <div className="user-follower">
                                <span>
                                    {userData?.follower.length}{" "}
                                    <FormattedMessage
                                        id={"page.profile.followers"}
                                    />
                                </span>
                            </div>
                            <span className="dot">·</span>
                            <div className="user-followed">
                                <span>
                                    {userData?.followed.length}{" "}
                                    <FormattedMessage
                                        id={"page.profile.following"}
                                    />
                                </span>
                            </div>
                        </div>
                        <div className="profile-info-options">
                            <Button
                                onClick={(e) => handleOpenModal(e, "share")}
                            >
                                <ShareIcon />
                            </Button>
                            {userInfo?._id !== userData._id || !userInfo ? (
                                <>
                                    <Button
                                        className={`${
                                            hasFollowUser
                                                ? "followed"
                                                : "follow"
                                        }`}
                                        onClick={handleFollowUser}
                                    >
                                        {hasFollowUser ? (
                                            <FormattedMessage
                                                id={"page.profile.followed"}
                                            />
                                        ) : (
                                            <FormattedMessage
                                                id={"page.profile.follow"}
                                            />
                                        )}
                                    </Button>
                                    <Button
                                        onClick={(e) =>
                                            handleOpenModal(e, "more")
                                        }
                                    >
                                        <MenuIcon />
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    to={`/settings/profile`}
                                    state={{ userInfo: userInfo }}
                                    className="edit-profile"
                                >
                                    <FormattedMessage
                                        id={"page.profile.edit-profile"}
                                    />
                                </Button>
                            )}
                        </div>
                    </div>
                    <div className="profile-options">
                        <div className="profile-options-btn ">
                            <Button
                                onClick={() => {
                                    setActiveBtn(true);
                                }}
                                className={`btn shimmer ${
                                    !activeBtn ? "non-active" : "shimmerActive"
                                }`}
                            >
                                <FormattedMessage id={"page.profile.created"} />
                            </Button>
                        </div>
                        <div className="profile-options-btn">
                            <Button
                                type="button"
                                onClick={() => {
                                    setActiveBtn(false);
                                }}
                                className={`btn shimmer ${
                                    activeBtn ? "non-active" : "shimmerActive"
                                }`}
                            >
                                <FormattedMessage id={"page.profile.saved"} />
                            </Button>
                        </div>
                    </div>
                    <div className="profile-pin">
                        {!isLoadingPins && pins ? (
                            <>
                                {pinsData && pinsData.length > 0 ? (
                                    <div className="profile-pin-container">
                                        <MasonryLayout pins={pinsData} />
                                    </div>
                                ) : (
                                    <>
                                        {activeBtn ? (
                                            <div className="no-pin">
                                                <h2>
                                                    <FormattedMessage
                                                        id={
                                                            "page.profile.no-pin"
                                                        }
                                                    />
                                                </h2>
                                                <div className="pin-button">
                                                    <Button
                                                        to={
                                                            config.routes
                                                                .createPin
                                                        }
                                                        className="pin-btn-content create"
                                                    >
                                                        <FormattedMessage
                                                            id={
                                                                "page.profile.create"
                                                            }
                                                        />
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="no-pin">
                                                <p>
                                                    {userData?._id ===
                                                    userInfo?._id
                                                        ? "You"
                                                        : userData?.fullName}{" "}
                                                    <FormattedMessage
                                                        id={
                                                            "page.profile.no-save"
                                                        }
                                                    />
                                                </p>
                                                {userData?._id ===
                                                    userInfo?._id && (
                                                    <div className="pin-button">
                                                        <Button
                                                            type="button"
                                                            to={
                                                                config.routes
                                                                    .home
                                                            }
                                                            className="pin-btn-content find"
                                                        >
                                                            <FormattedMessage
                                                                id={
                                                                    "page.profile.find-idea"
                                                                }
                                                            />
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                    </>
                                )}
                            </>
                        ) : (
                            <div
                                className="loading-wrapper"
                                style={{ top: "40px" }}
                            >
                                <Spinner />
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="loading-wrapper" style={{ top: "40px" }}>
                    <Spinner />
                </div>
            )}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn,
        pinsData: state.pin.pinsData,
        userNewData: state.pin.userData,
        isLoadingPins: state.pin.fetchPinLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchAllPinCreate: (userId) =>
            dispatch(actions.fetchAllPinByUserCreate(userId)),
        fetchAllPinSave: (userId) =>
            dispatch(actions.fetchAllPinBySaveCreate(userId)),
        fetchUserById: (userId) => dispatch(actions.fetchUserById(userId)),
        followUser: (userId) => dispatch(actions.followUser(userId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
