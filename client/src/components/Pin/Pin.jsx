import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import _ from "lodash";
import { FormattedMessage } from "react-intl";

import "./style.scss";
import * as actions from "../../store/actions";
import { checkUrl } from "../../utils/constants";
import { MdOutlineFileDownload } from "react-icons/md";
import {
    ArrowRightIcon,
    EditIcon,
    MenuIcon,
    UserIcon,
} from "../../assets/icon";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import Spinner from "../Spinner/Spinner";
import OptionsMoreModal from "../Modal/OptionsMoreModal/OptionsMoreModal";

const Pin = ({
    pin,
    userInfo,
    isLoggedIn,
    isDeletePinLoading,
    isSavePinLoading,
    pinId,
    openModalEditPinSuccess,
    savePin,
}) => {
    const [savesArr, setSavesArr] = useState(pin?.saves);

    const [pinHover, setPinHover] = useState(false);
    const modalRef = useRef();
    const navigate = useNavigate();

    const [isOpenModalOptions, setIsOpenModalOptions] = useState({
        edit: false,
        more: false,
    });

    const hasSavePin = savesArr.find((save) => save === userInfo?._id);

    useEffect(() => {
        let handler = (e) => {
            if (!modalRef?.current?.contains(e.target)) {
                e.stopPropagation();
                e.preventDefault();
                setTimeout(() => {
                    setPinHover(false);
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
            await savePin(pin._id);
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

    const handleClickModal = (e, value) => {
        e.stopPropagation();
        e.preventDefault();
        const copyState = { ...isOpenModalOptions };
        copyState[value] = !copyState[value];
        setIsOpenModalOptions((prev) => ({ ...prev, ...copyState }));
        if (value === "edit") {
            pin.X = e.clientX;
            pin.Y = e.clientY;
            openModalEditPinSuccess(pin);
        }
    };

    return (
        <>
            <div className="pin-wrapper">
                <div className="pin-content-container">
                    <div
                        ref={modalRef}
                        className="pin-content"
                        onMouseEnter={() => setPinHover(true)}
                        onMouseLeave={() => {
                            if (!isOpenModalOptions.more) {
                                setTimeout(() => {
                                    setPinHover(false);
                                }, 125);
                            }
                        }}
                    >
                        <img alt={pin.title} src={pin.image} loading="lazy" />
                        {pinHover && (
                            <div
                                className="pin-backdrop"
                                style={{
                                    height: "100%",
                                    backgroundColor: "rgba(0, 0, 0, 0.3)",
                                }}
                                onClick={() => {
                                    navigate(`/pin/${pin?._id}`);
                                }}
                            >
                                <div className="btn-save">
                                    <div className="wrapper-btn-save">
                                        {isSavePinLoading &&
                                            pinId === pin._id && (
                                                <div
                                                    className="loading-wrapper"
                                                    style={{
                                                        borderRadius: "32px",
                                                        backgroundColor:
                                                            "rgba(255, 255, 255, 0.7)",
                                                    }}
                                                >
                                                    <Spinner />
                                                </div>
                                            )}
                                        <Button
                                            className={`${
                                                hasSavePin ? "saved" : "save"
                                            }`}
                                            onClick={handleSave}
                                        >
                                            {hasSavePin ? (
                                                <FormattedMessage
                                                    id={"page.home.pin.saved"}
                                                />
                                            ) : (
                                                <FormattedMessage
                                                    id={"page.home.pin.save"}
                                                />
                                            )}
                                        </Button>
                                    </div>
                                </div>
                                <div className="options-container">
                                    <div className="destination-link">
                                        {pin?.link && (
                                            <Button
                                                className="link"
                                                href={pin?.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                }}
                                                leftIcon={<ArrowRightIcon />}
                                            >
                                                <div className="link-title">
                                                    {pin.link?.includes(
                                                        "https://"
                                                    )
                                                        ? pin.link?.slice(
                                                              8,
                                                              checkUrl(pin)
                                                          )
                                                        : pin.link?.slice(
                                                              0,
                                                              checkUrl(pin)
                                                          )}
                                                </div>
                                            </Button>
                                        )}
                                    </div>
                                    <div className="options">
                                        {pin?.userId === userInfo?._id ? (
                                            <Button
                                                className="option"
                                                onClick={(e) =>
                                                    handleClickModal(e, "edit")
                                                }
                                            >
                                                <EditIcon />
                                            </Button>
                                        ) : (
                                            <Button
                                                href={pin?.image}
                                                download={pin.title}
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                className="option"
                                            >
                                                <MdOutlineFileDownload
                                                    fontSize={21}
                                                    title="Download"
                                                />
                                            </Button>
                                        )}
                                        <Button
                                            onClick={(e) =>
                                                handleClickModal(e, "more")
                                            }
                                            className="option"
                                        >
                                            <MenuIcon />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {isOpenModalOptions.more && (
                        <Modal
                            data={pin}
                            modal={<OptionsMoreModal />}
                            setIsShowModal={setIsOpenModalOptions}
                            action="more"
                            duration={90}
                            userInfo={userInfo}
                            isLoggedIn={isLoggedIn}
                        />
                    )}

                    {isDeletePinLoading && pinId === pin._id && (
                        <div className="loading-wrapper">
                            <Spinner />
                        </div>
                    )}
                </div>
                {pin.users && (
                    <div className="pin-info-container">
                        <div
                            className="content-title"
                            onClick={() => navigate(`/pin/${pin?._id}`)}
                        >
                            {pin.title}
                        </div>
                        <Button
                            to={`/${pin?.users.userName}`}
                            state={{ userId: pin.users._id }}
                            className="info-user"
                        >
                            {pin.users?.image ? (
                                <img
                                    src={pin.users?.image}
                                    alt={pin.users?.fullName}
                                />
                            ) : (
                                <div className="user-icon-wrapper">
                                    <UserIcon />
                                </div>
                            )}
                            <p>{pin?.users?.fullName}</p>
                        </Button>
                    </div>
                )}
            </div>
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn,
        isDeletePinLoading: state.pin.deletePinLoading,
        isSavePinLoading: state.pin.savePinLoading,
        pinId: state.pin.pinId,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        openModalEditPinSuccess: (pin) =>
            dispatch(actions.openModalEditPinSuccess(pin)),
        savePin: (pinId) => dispatch(actions.savePin(pinId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pin);
