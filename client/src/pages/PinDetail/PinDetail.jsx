import { connect } from "react-redux";
import _ from "lodash";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import "./style.scss";
import * as actions from "../../store/actions";
import { checkUrl } from "../../utils/constants";
import Button from "../../components/Button/Button";
import Spinner from "../../components/Spinner/Spinner";
import { MdOutlineFileDownload } from "react-icons/md";
import {
    ArrowLeftIcon,
    ArrowRightIcon,
    MenuIcon,
    SendIcon,
    UserIcon,
} from "../../assets/icon";
import Input from "../../components/Input/Input";
import Comment from "../../components/Comment/Comment";
import { FormattedMessage, useIntl } from "react-intl";

const PinDetail = ({
    pinData,
    pinsData,
    fetchPinById,
    followUser,
    savePin,
    isSavePinLoading,
    isLoadingPin,
    isLoadingPinId,
    userInfo,
    isLoggedIn,
    openModalEditPinSuccess,
    comments,
    commentPin,
    fetchCommentsPin,
    fetchPinBySearch,
}) => {
    const navigate = useNavigate();
    const { id: pinId } = useParams();
    const intl = useIntl();

    const moreModalRef = useRef();
    const pinDetailRef = useRef(null);
    const sendBtnRef = useRef(null);
    const commentRef = useRef();

    const [data, setData] = useState(pinData);
    const [pins, setPins] = useState(pinsData);

    const [height, setHeight] = useState();
    const [width, setWidth] = useState();

    const [pinHover, setPinHover] = useState(false);
    const [comment, setComment] = useState("");
    const [commentsArr, setCommentsArr] = useState([]);

    const [savesArr, setSavesArr] = useState(pinData?.saves);
    const [followersArr, setFollowersArr] = useState(pinData?.users?.follower);

    const [isReadMore, setIsReadMore] = useState(true);

    const [isOpenModal, setIsOpenModal] = useState({
        more: false,
        edit: false,
    });

    const hasSavePin = savesArr?.find((save) => save === userInfo?._id);
    const hasFollowUser = followersArr?.find(
        (follower) => follower === userInfo?._id
    );

    useEffect(() => {
        if (pinDetailRef?.current?.clientHeight) {
            if (sendBtnRef?.current?.clientHeight) {
                setHeight(
                    pinDetailRef.current.clientHeight -
                        sendBtnRef.current.clientHeight
                );
                setWidth(window.innerWidth);
            }
        }
    }, [commentsArr, sendBtnRef?.current?.clientHeight]);

    useEffect(() => {
        fetchPinById(pinId);
        fetchCommentsPin(pinId);
    }, [pinId]);
    useEffect(() => {
        fetchPinBySearch("", "");
        setPins(pinsData);
        console.log(pinData);
    }, []);

    useEffect(() => {
        setCommentsArr(comments);
    }, [comments]);

    useEffect(() => {
        setData((prev) => ({ ...prev, ...pinData }));
        setSavesArr(pinData?.saves);
        setFollowersArr(pinData?.users?.follower);
        setCommentsArr(comments);
    }, [pinData]);

    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }, [isLoadingPinId]);

    useEffect(() => {
        let handler = (e) => {
            if (!moreModalRef?.current?.contains(e.target)) {
                e.stopPropagation();
                e.preventDefault();
                setTimeout(() => {
                    setIsOpenModal((prev) => ({ ...prev, more: false }));
                }, 80);
            }
        };
        document.addEventListener("click", handler);
        return () => {
            document.removeEventListener("click", handler);
        };
    });

    const handleSave = async (e) => {
        e.stopPropagation();
        if (userInfo && !_.isEmpty(userInfo) && isLoggedIn) {
            // Call api save pin
            await savePin(data._id);
            // Render
            if (hasSavePin) {
                setSavesArr(savesArr.filter((save) => save !== userInfo._id));
            } else {
                setSavesArr([...savesArr, userInfo._id]);
            }
        } else {
            // Phân quyền call login modal
            console.log(123);
        }
    };

    const handleFollowUser = async (e) => {
        e.stopPropagation();
        if (userInfo && !_.isEmpty(userInfo) && isLoggedIn) {
            if (userInfo._id !== data?.user?._id) {
                // Call api follow user
                await followUser(data?.users?._id);
                if (hasFollowUser) {
                    setFollowersArr(
                        followersArr.filter((id) => id !== userInfo?._id)
                    );
                } else {
                    setFollowersArr([...followersArr, userInfo?._id]);
                }
            }
        } else {
            // Phân quyền call login modal
            console.log(123);
        }
    };
    const handleSendComment = async (e) => {
        e.stopPropagation();
        if (userInfo && !_.isEmpty(userInfo) && isLoggedIn) {
            if (comment) {
                setComment("");
                await commentPin(data._id, comment);
                commentRef.current.scrollIntoView({ behavior: "smooth" });
            }
        } else {
            // Phân quyền call login modal
            console.log(123);
        }
    };

    // console.log("like comment id: ", commentsArr);

    return (
        <div style={{ position: "relative" }}>
            {data && !_.isEmpty(data) && data._id === pinId ? (
                <div className="pin-detail-wrapper">
                    <div className="back-btn">
                        <Button onClick={() => navigate(-1)}>
                            <ArrowLeftIcon />
                        </Button>
                    </div>
                    <div style={{ position: "relative" }}>
                        <div className="pin-detail-container">
                            <div
                                ref={pinDetailRef}
                                className="pin-detail-image"
                                onMouseEnter={() => setPinHover(true)}
                                onMouseLeave={() => {
                                    setTimeout(() => {
                                        setPinHover(false);
                                    }, 125);
                                }}
                            >
                                <div className="image">
                                    <img src={data?.image} alt={data.title} />
                                </div>
                                {pinHover && (
                                    <div className="backdrop-container">
                                        <div className="destination-link">
                                            {data?.link && (
                                                <Button
                                                    className="link"
                                                    href={data?.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                    leftIcon={
                                                        <ArrowRightIcon />
                                                    }
                                                >
                                                    <div className="link-title">
                                                        {data.link?.includes(
                                                            "https://"
                                                        )
                                                            ? data.link?.slice(
                                                                  8,
                                                                  checkUrl(data)
                                                              )
                                                            : data.link?.slice(
                                                                  0,
                                                                  checkUrl(data)
                                                              )}
                                                    </div>
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div
                                className="pin-detail-info"
                                style={{
                                    height: `${
                                        height > 500 && width > 1024
                                            ? `${height}px`
                                            : "100%"
                                    }`,
                                }}
                            >
                                <div className="pin-detail-content">
                                    <div className="pin-detail-content-top">
                                        <div className="options-container">
                                            <Button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.preventDefault();
                                                    setIsOpenModal((prev) => ({
                                                        ...prev,
                                                        more: !isOpenModal.more,
                                                    }));
                                                }}
                                                className={`option ${
                                                    isOpenModal.more && "active"
                                                }`}
                                            >
                                                <MenuIcon />
                                            </Button>
                                            <Button
                                                href={data?.image}
                                                download={data.title}
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                className="option"
                                            >
                                                <MdOutlineFileDownload
                                                    fontSize={25}
                                                    title="Download"
                                                />
                                            </Button>
                                            {isOpenModal.more && (
                                                <div
                                                    className="more-option-modal"
                                                    ref={moreModalRef}
                                                >
                                                    {userInfo._id ===
                                                        data.userId && (
                                                        <Button
                                                            className="edit-option"
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                e.preventDefault();
                                                                setIsOpenModal(
                                                                    (prev) => ({
                                                                        ...prev,
                                                                        more: false,
                                                                    })
                                                                );
                                                                openModalEditPinSuccess(
                                                                    data
                                                                );
                                                            }}
                                                        >
                                                            <FormattedMessage
                                                                id={
                                                                    "page.pin-detail.menu.edit"
                                                                }
                                                            />
                                                        </Button>
                                                    )}
                                                    <Button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            e.preventDefault();
                                                            setIsOpenModal(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    more: false,
                                                                })
                                                            );
                                                        }}
                                                    >
                                                        <FormattedMessage
                                                            id={
                                                                "page.pin-detail.menu.report"
                                                            }
                                                        />
                                                    </Button>
                                                </div>
                                            )}
                                        </div>
                                        <div className="btn-save">
                                            <div className="wrapper-btn-save">
                                                {isSavePinLoading &&
                                                    pinId === data._id && (
                                                        <div
                                                            className="loading-wrapper"
                                                            style={{
                                                                borderRadius:
                                                                    "32px",
                                                                backgroundColor:
                                                                    "rgba(255, 255, 255, 0.7)",
                                                            }}
                                                        >
                                                            <Spinner />
                                                        </div>
                                                    )}
                                                <Button
                                                    className={`${
                                                        hasSavePin
                                                            ? "saved"
                                                            : "save"
                                                    }`}
                                                    onClick={handleSave}
                                                >
                                                    {hasSavePin ? (
                                                        <FormattedMessage
                                                            id={
                                                                "page.pin-detail.saved"
                                                            }
                                                        />
                                                    ) : (
                                                        <FormattedMessage
                                                            id={
                                                                "page.pin-detail.save"
                                                            }
                                                        />
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                    <div
                                        className="pin-detail-content-main"
                                        style={{
                                            maxHeight: `${
                                                height > 500 && width > 1024
                                                    ? `${height}px`
                                                    : "350px"
                                            }`,
                                        }}
                                    >
                                        <div className="pin-detail-content-main-container">
                                            {data?.link && (
                                                <Button
                                                    href={data.link}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="pin-link"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                    }}
                                                >
                                                    {data?.link?.includes(
                                                        "https://"
                                                    )
                                                        ? data?.link?.slice(
                                                              8,
                                                              checkUrl(data)
                                                          )
                                                        : data?.link?.slice(
                                                              0,
                                                              checkUrl(data)
                                                          )}
                                                </Button>
                                            )}
                                            <div className="pin-description">
                                                <Button
                                                    href={
                                                        data?.link
                                                            ? data?.link
                                                            : data?.image
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="title"
                                                >
                                                    {data?.title}
                                                </Button>
                                                <p className="about">
                                                    {data?.about?.length > 220
                                                        ? isReadMore
                                                            ? data?.about?.slice(
                                                                  0,
                                                                  200
                                                              ) +
                                                              (data?.about
                                                                  ?.length > 220
                                                                  ? "..."
                                                                  : " ")
                                                            : data?.about + " "
                                                        : data?.about}
                                                    {data?.about?.length >
                                                        220 && (
                                                        <span
                                                            onClick={() =>
                                                                setIsReadMore(
                                                                    !isReadMore
                                                                )
                                                            }
                                                            className="more"
                                                        >
                                                            {isReadMore ? (
                                                                <FormattedMessage
                                                                    id={
                                                                        "page.pin-detail.more"
                                                                    }
                                                                />
                                                            ) : (
                                                                <FormattedMessage
                                                                    id={
                                                                        "page.pin-detail.hide"
                                                                    }
                                                                />
                                                            )}
                                                        </span>
                                                    )}
                                                </p>
                                            </div>

                                            <div className="pin-info">
                                                <Button
                                                    to={`/${data?.users?.userName}`}
                                                    state={{
                                                        userId: data?.users
                                                            ?._id,
                                                    }}
                                                    className="user-profile"
                                                >
                                                    {data.users?.image ? (
                                                        <img
                                                            className="avatar"
                                                            src={
                                                                data?.users
                                                                    ?.image
                                                            }
                                                            alt={
                                                                data?.users
                                                                    ?.fullName
                                                            }
                                                        />
                                                    ) : (
                                                        <div className="user-icon-wrapper">
                                                            <UserIcon />
                                                        </div>
                                                    )}

                                                    <p className="user-name">
                                                        {data.users.fullName}
                                                    </p>
                                                </Button>
                                                {data?.users?._id !==
                                                    userInfo?._id && (
                                                    <div className="follow-user-btn">
                                                        <Button
                                                            className={`${
                                                                hasFollowUser
                                                                    ? "followed"
                                                                    : "follow"
                                                            }`}
                                                            onClick={
                                                                handleFollowUser
                                                            }
                                                        >
                                                            {hasFollowUser ? (
                                                                <FormattedMessage
                                                                    id={
                                                                        "page.pin-detail.followed"
                                                                    }
                                                                />
                                                            ) : (
                                                                <FormattedMessage
                                                                    id={
                                                                        "page.pin-detail.follow"
                                                                    }
                                                                />
                                                            )}
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        <div className="pin-detail-content-main-comments">
                                            <h2 className="text-[#111] text-[20px] font-semibold">
                                                <FormattedMessage
                                                    id={
                                                        "page.pin-detail.comment.title"
                                                    }
                                                />
                                            </h2>
                                            <div className="list-comments">
                                                {commentsArr &&
                                                commentsArr?.length > 0 ? (
                                                    commentsArr.map((item) => (
                                                        <Comment
                                                            item={item}
                                                            key={item._id}
                                                        />
                                                    ))
                                                ) : (
                                                    <div
                                                        style={{
                                                            color: "#5f5f5f",
                                                            fontStyle: "italic",
                                                            fontSize: "14px",
                                                        }}
                                                        className="comment"
                                                    >
                                                        <FormattedMessage
                                                            id={
                                                                "page.pin-detail.comment.no-comment"
                                                            }
                                                        />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className="pin-detail-comment"
                                    ref={sendBtnRef}
                                >
                                    <div className="pin-input-comment">
                                        <div className="user-profile">
                                            {data.users?.image ? (
                                                <img
                                                    className="avatar"
                                                    src={data?.users?.image}
                                                    alt={data?.users?.fullName}
                                                />
                                            ) : (
                                                <div className="user-icon-wrapper">
                                                    <UserIcon />
                                                </div>
                                            )}
                                        </div>
                                        <div className="wrapper">
                                            <Input
                                                placeholder={intl.formatMessage(
                                                    {
                                                        id: "page.pin-detail.comment.comment-input-placeholder",
                                                    }
                                                )}
                                                text={comment}
                                                onChange={(e) =>
                                                    setComment(e.target.value)
                                                }
                                            />

                                            <Button
                                                className="send-btn"
                                                onClick={handleSendComment}
                                            >
                                                <SendIcon />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="more-pin">
                        {isLoadingPin && (
                            <div style={{ margin: "5px 0" }}>
                                <Spinner />
                            </div>
                        )}
                        {pins?.length > 0 && (
                            <div style={{ textAlign: "center" }}>
                                <h2 className="text-[#111] font-semibold text-xl text-center py-3 px-6 mb-1 w-full more-pin-title">
                                    <FormattedMessage
                                        id={"page.pin-detail.more-like"}
                                    />
                                </h2>
                                {/* <MasonryLayout pins={pins} /> */}
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
        pinData: state.pin.pinData,
        pinsData: state.pin.pinsData,
        comments: state.pin.comments,
        isLoadingPin: state.pin.fetchPinLoading,
        isLoadingPinId: state.pin.fetchPinIdLoading,
        isSavePinLoading: state.pin.savePinLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchPinById: (userId) => dispatch(actions.fetchPinById(userId)),
        openModalEditPinSuccess: (pin) =>
            dispatch(actions.openModalEditPinSuccess(pin)),
        savePin: (pinId) => dispatch(actions.savePin(pinId)),

        followUser: (userId) => dispatch(actions.followUser(userId)),
        commentPin: (userId, comment) =>
            dispatch(actions.commentPin(userId, comment)),
        fetchCommentsPin: (pinId) =>
            dispatch(actions.fetchAllCommentPin(pinId)),
        fetchPinBySearch: (searchQuery, tags) =>
            dispatch(actions.fetchPinBySearch(searchQuery, tags)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PinDetail);
