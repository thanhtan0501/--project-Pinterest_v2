import { useState } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

import "./style.scss";
import config from "../../config";
import * as actions from "../../store/actions";
import { DeleteIcon, MenuIcon } from "../../assets/icon";

import Spinner from "../Spinner/Spinner";
import getBase64 from "../../hooks/getBase64";
import CreateForm from "./CreateForm/CreateForm";
import InputUploadImage from "./InputUploadImage/InputUploadImage";
import { customStylesSelected, typeImageInput } from "../../utils/constants";
import Button from "../Button/Button";

const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
];
const CreateModal = ({ userInfo, createNewPin, isLoadingCreatePin }) => {
    const navigate = useNavigate();
    const [selected, setSelected] = useState(null);
    const [dataForm, setDataForm] = useState({
        title: "",
        about: "",
        link: "",
        image: "",
        tags: [],
    });
    const [imgPreview, setImgPreview] = useState("");
    const [isError, setIsError] = useState({
        title: false,
        about: false,
        image: false,
    });

    const [isLoading, setIsLoading] = useState(false);

    const checkValidateInput = () => {
        let isValid = true;
        for (let i in dataForm) {
            if (!dataForm[i] && isError.hasOwnProperty(i)) {
                setIsError((prev) => ({ ...prev, [i]: true }));
                isValid = false;
            }
        }
        return isValid;
    };

    const handleChangeSelected = (selectedOption) => {
        setSelected(selectedOption);
    };

    const handleUpLoadImage = async (e) => {
        const file = e.target.files[0];
        const { type } = file;
        const objUrl = URL.createObjectURL(e.target.files[0]);
        if (typeImageInput.some((typeInput) => typeInput.type === type)) {
            if (isError.image) setIsError({ ...isError, image: false });
            setIsLoading(true);
            const data = await getBase64(file);

            setImgPreview(objUrl);
            setDataForm({
                ...dataForm,
                image: data,
            });
            setIsLoading(false);
        } else {
            setIsError({ ...isError, image: true });
        }
    };

    const handleChangeInput = (e) => {
        const copyState = { ...dataForm };
        copyState[e.target.name] = e.target.value;
        setDataForm({ ...copyState });
    };

    const handleSavePin = async () => {
        const check = checkValidateInput();
        if (check) {
            await createNewPin(dataForm);

            navigate(config.routes.home);
        }
    };
    return (
        <>
            <div className="create-modal-container">
                <div className="create-modal-top">
                    <button type="button" className="btn-more">
                        <MenuIcon />
                    </button>
                    <div className="btn-option">
                        <Select
                            styles={customStylesSelected}
                            value={selected}
                            onChange={handleChangeSelected}
                            name="selectGender"
                            placeholder="Select Category"
                            options={options}
                        />
                        <button
                            type="button"
                            className="btn-save"
                            onClick={handleSavePin}
                        >
                            <FormattedMessage id={"page.create.save"} />
                        </button>
                    </div>
                </div>
                <div className="create-modal-bottom">
                    <div
                        className={`create-modal-upload-image ${
                            isError.image ? "fielded" : "fielded-non"
                        } ${dataForm.image && "fielded-image"}`}
                    >
                        <div
                            className={`create-modal-upload-image-content ${
                                isLoading && "loading-h"
                            }`}
                        >
                            {/* {isLoading && !savingPost && <Spinner />} */}
                            {isLoading && <Spinner />}
                            {!dataForm.image ? (
                                !isLoading && (
                                    <InputUploadImage
                                        fields={isError.image}
                                        handleUpLoadImage={handleUpLoadImage}
                                    />
                                )
                            ) : (
                                <div className="relative h-auto">
                                    <img src={imgPreview} alt="uploaded-img" />
                                    <div className="btn-delete-wrapper">
                                        <div className="btn-delete">
                                            <Button
                                                title="Delete Image"
                                                type="button"
                                                onClick={() =>
                                                    setDataForm({
                                                        ...dataForm,
                                                        image: null,
                                                    })
                                                }
                                            >
                                                <DeleteIcon />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="create-modal-form">
                        <CreateForm
                            dataForm={dataForm}
                            isError={isError}
                            setIsError={setIsError}
                            userInfo={userInfo}
                            handleChangeInput={handleChangeInput}
                        />
                    </div>
                </div>
            </div>
            {isLoadingCreatePin && (
                <div className="loading-wrapper">
                    <Spinner />
                </div>
            )}
        </>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        isLoadingCreatePin: state.pin.createPinLoading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createNewPin: (data) => dispatch(actions.createNewPin(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreateModal);
