import moment from "moment";
import _ from "lodash";
import { useState } from "react";
import { connect } from "react-redux";

import "./style.scss";
import Button from "../Button/Button";
import * as actions from "../../store/actions";
import { UserIcon } from "../../assets/icon";

import { BiHeart, BiSolidHeart, BiTrash } from "react-icons/bi";

const Comment = ({
    item,
    userInfo,
    isLoggedIn,
    likeComment,
    deleteComment,
}) => {
    const [likeCommentArr, setLikeCommentArr] = useState(item?.likes);

    const hasLikeComment = likeCommentArr?.find(
        (like) => like === userInfo?._id
    );

    const handleLikeComment = async (e, item) => {
        e.stopPropagation();

        if (userInfo && !_.isEmpty(userInfo) && isLoggedIn) {
            // Call api like comment
            await likeComment(item._id);
            // Render
            if (hasLikeComment) {
                setLikeCommentArr(
                    likeCommentArr.filter((like) => like !== userInfo._id)
                );
            } else {
                setLikeCommentArr([...likeCommentArr, userInfo._id]);
            }
        } else {
            // Phân quyền call login modal
            console.log(123);
        }
    };
    const handleDeleteComment = async (e, item) => {
        e.stopPropagation();
        if (userInfo && !_.isEmpty(userInfo) && isLoggedIn) {
            // Call api delete comment
            if (item.user._id === userInfo?._id) {
                await deleteComment(item._id);
            }
        }
    };

    return (
        <div className="comment">
            <Button
                to={`/${item?.user?.userName}`}
                state={{
                    userId: item?.user?._id,
                }}
                className="user-image"
            >
                {item?.user?.image ? (
                    <img
                        className="avatar"
                        src={item.user?.image}
                        alt={item.user?.fullName}
                    />
                ) : (
                    <div className="user-icon-wrapper">
                        <UserIcon />
                    </div>
                )}
            </Button>
            <div className="description">
                <div className="info-user">
                    <Button
                        to={`/${item?.user?.userName}`}
                        state={{
                            userId: item.user?._id,
                        }}
                        className="info-content"
                    >
                        {item.user.fullName}
                    </Button>
                    <span className="comment-content"> {item.comment}</span>
                </div>
                <div className="comment-options">
                    <span>{moment(item.createdAlt).fromNow()}</span>
                    <div className="like_btn">
                        <Button onClick={(e) => handleLikeComment(e, item)}>
                            {hasLikeComment ? (
                                <BiSolidHeart fontSize={16} color="red" />
                            ) : (
                                <BiHeart fontSize={16} />
                            )}
                        </Button>
                        <span>
                            {likeCommentArr.length > 0
                                ? likeCommentArr.length
                                : 0}
                        </span>
                    </div>
                    {item.user._id === userInfo?._id && (
                        <Button onClick={(e) => handleDeleteComment(e, item)}>
                            <BiTrash fontSize={16} />
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        likeComment: (commentId) => dispatch(actions.likeComment(commentId)),
        deleteComment: (commentId) =>
            dispatch(actions.deleteComment(commentId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
