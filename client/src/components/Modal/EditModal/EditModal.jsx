import { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { FormattedMessage, useIntl } from "react-intl";

import "./style.scss";
import BackDrop from "../BackDrop";
import Button from "../../Button/Button";
import * as actions from "../../../store/actions";
import Spinner from "../../Spinner/Spinner";

const EditModal = ({
    closeModal,
    isShow,
    data,
    deletePin,
    updatePin,
    isUpdatePinLoading,
}) => {
    const intl = useIntl();

    const editModalRef = useRef();
    const [dataForm, setDataForm] = useState({
        title: "",
        about: "",
        link: "",
    });
    const [clickedPinId, setClickedPinId] = useState(null);
    const [modalTopOffset, setModalTopOffset] = useState(0);
    useEffect(() => {
        setDataForm((prev) => ({
            ...prev,
            title: data.title,
            about: data.about,
            link: data.link,
        }));
    }, [data]);

    useEffect(() => {
        let handler = (e) => {
            if (!editModalRef?.current?.contains(e.target)) {
                e.stopPropagation();
                e.preventDefault();
                closeModal();
            }
        };
        document.addEventListener("click", handler);
        return () => {
            document.removeEventListener("click", handler);
        };
    });

    const handleChangeInput = (e) => {
        const copyState = { ...dataForm };
        copyState[e.target.name] = e.target.value;
        setDataForm({ ...copyState });
    };
    const handleClickButton = async (e) => {
        if (e.target.name === "delete") {
            await deletePin(data._id);
        } else if (e.target.name === "update") {
            await updatePin({ ...dataForm, id: data._id });
        }
        closeModal();
    };

    return (
        <>
            <BackDrop closeModal={closeModal} isShow={isShow} />
            <div
                data-pin-id={data.id}
                ref={editModalRef}
                className={`edit-modal-wrapper ${isShow ? "show" : ""}`}
            >
                {isUpdatePinLoading && (
                    <div className="loading-wrapper">
                        <Spinner />
                    </div>
                )}

                <div className="edit-modal-container">
                    <div className="title-modal">
                        <h1>
                            <FormattedMessage id={"modal.pin.edit.title"} />
                        </h1>
                    </div>
                    <div className="edit-form-modal-wrapper" tabIndex={2}>
                        <div className="edit-form-modal">
                            <div className="edit-form-content">
                                <div className="title">
                                    <label>
                                        <FormattedMessage
                                            id={"modal.pin.edit.pin-title"}
                                        />
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        onChange={handleChangeInput}
                                        placeholder={intl.formatMessage({
                                            id: "modal.pin.edit.placeholder-title",
                                        })}
                                        // className={`${
                                        //     isError.title && "missing-input"
                                        // }`}
                                        // onFocus={(e) => handleFocusInput(e, "FOCUS")}
                                        // onBlur={(e) => handleFocusInput(e, "BLUR")}
                                        value={dataForm.title}
                                    />
                                </div>
                                <div className="title">
                                    <label>
                                        <FormattedMessage
                                            id={"modal.pin.edit.pin-about"}
                                        />
                                    </label>
                                    <textarea
                                        name="about"
                                        onChange={handleChangeInput}
                                        placeholder={intl.formatMessage({
                                            id: "modal.pin.edit.placeholder-about",
                                        })}
                                        // className={`${
                                        //     isError.about && "missing-input"
                                        // }`}
                                        // onFocus={(e) =>
                                        //     handleFocusInput(e, "FOCUS")
                                        // }
                                        // onBlur={(e) => handleFocusInput(e, "BLUR")}
                                        rows={3}
                                        value={dataForm.about}
                                    >
                                        {dataForm.about}
                                    </textarea>
                                </div>
                                <div className="title link">
                                    <label>
                                        <FormattedMessage
                                            id={
                                                "modal.pin.edit.pin-destination"
                                            }
                                        />
                                    </label>
                                    <input
                                        type="url"
                                        name="link"
                                        value={dataForm.link}
                                        onChange={handleChangeInput}
                                        placeholder={intl.formatMessage({
                                            id: "modal.pin.edit.placeholder-destination",
                                        })}
                                    />
                                </div>
                            </div>
                            <div className="edit-modal-image">
                                <img src={data.image} alt="uploaded-img" />
                            </div>
                        </div>
                    </div>
                    <div className="footer-modal">
                        <Button
                            name="delete"
                            className="btn btn-delete"
                            onClick={(e) => handleClickButton(e)}
                        >
                            <FormattedMessage id={"modal.pin.edit.delete"} />
                        </Button>
                        <div className="btn-right">
                            <Button
                                className="btn btn-cancel"
                                onClick={closeModal}
                            >
                                <FormattedMessage
                                    id={"modal.pin.edit.cancel"}
                                />
                            </Button>
                            <Button
                                name="update"
                                className="btn btn-save"
                                onClick={(e) => handleClickButton(e)}
                            >
                                <FormattedMessage id={"modal.pin.edit.save"} />
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        isUpdatePinLoading: state.pin.updatePinLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        deletePin: (pinId) => dispatch(actions.deletePin(pinId)),
        updatePin: (data) => dispatch(actions.updatePin(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditModal);
