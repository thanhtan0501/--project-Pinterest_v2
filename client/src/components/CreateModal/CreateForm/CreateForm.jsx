import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import "./style.scss";
import { UserIcon } from "../../../assets/icon";
import Input from "../../Input/Input";
// import ChipInput from "material-ui-chip-input";

const CreateForm = ({
    dataForm,
    handleChangeInput,
    userInfo,
    isError,
    setIsError,
}) => {
    const intl = useIntl();

    const [isFields, setIsFields] = useState({ title: false, about: false });

    const handleFocusInput = (e, type) => {
        const copyState = { ...isFields };
        const { name } = e.target;
        if (type === "FOCUS") {
            copyState[name] = true;
            if (isError[name]) {
                setIsError({ ...isError, [name]: false });
            }
        } else if (type === "BLUR") {
            copyState[name] = false;
        }
        setIsFields({ ...copyState });
    };

    const handleAdd = (tag) => {
        // setTags([...tags, tag]);
    };
    const handleDelete = (tagToDelete) => {
        // setTags(tags.filter((tag) => tag !== tagToDelete));
    };

    return (
        <>
            <div className="create-form-content">
                <div className="title">
                    <textarea
                        type="text"
                        name="title"
                        onChange={handleChangeInput}
                        placeholder={intl.formatMessage({
                            id: "page.create.placeholder-title",
                        })}
                        className={`${isError.title && "missing-input"}`}
                        onFocus={(e) => handleFocusInput(e, "FOCUS")}
                        onBlur={(e) => handleFocusInput(e, "BLUR")}
                        rows={1}
                        value={dataForm.title}
                    >
                        {dataForm.title}
                    </textarea>
                    <div className="form-create-message-description">
                        {isFields.title && (
                            <p>
                                <FormattedMessage
                                    id={"page.create.description-title"}
                                />
                            </p>
                        )}
                    </div>
                </div>
                <div className="profile">
                    <div className="image">
                        {userInfo?.image ? (
                            <img
                                src={userInfo.image}
                                alt={userInfo?.fullName}
                            />
                        ) : (
                            <UserIcon opacity="0.5" />
                        )}
                    </div>
                    <span>{userInfo?.fullName}</span>
                </div>

                <div className="about">
                    <Input
                        name="about"
                        onChange={handleChangeInput}
                        placeholder={intl.formatMessage({
                            id: "page.create.placeholder-about",
                        })}
                        text={dataForm.about}
                        className={`${isError.about && "missing-input"}`}
                        onFocus={(e) => handleFocusInput(e, "FOCUS")}
                        onBlur={(e) => handleFocusInput(e, "BLUR")}
                        rows={1}
                        value={dataForm.about}
                    />

                    <div className="form-create-message-description">
                        {isFields.about && (
                            <p>
                                <FormattedMessage
                                    id={"page.create.description-about"}
                                />
                            </p>
                        )}
                    </div>
                </div>
                <div className="tags">
                    {/* <ChipInput
                        style={{ margin: "10px 0" }}
                        // value={dataForm?.tags}
                        // onAdd={handleAdd}
                        // onDelete={handleDelete}
                        label="Search Tags"
                        variant="outlined"
                    /> */}
                </div>
            </div>
            <div className="create-form-link focus-form">
                <input
                    type="url"
                    name="link"
                    value={dataForm.link}
                    onChange={handleChangeInput}
                    placeholder={intl.formatMessage({
                        id: "page.create.placeholder-destination",
                    })}
                />
            </div>
        </>
    );
};

export default CreateForm;
