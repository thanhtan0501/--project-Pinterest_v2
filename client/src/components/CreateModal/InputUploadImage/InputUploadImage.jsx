import { FormattedMessage } from "react-intl";
import { UploadIcon, WarningIcon } from "../../../assets/icon";
import "./style.scss";

const InputUploadImage = ({ fields, handleUpLoadImage }) => {
    return (
        <div
            className="input-upload-image-container"
            style={{ borderColor: `${fields ? "rgb(204, 0, 0)" : "#dadada"}` }}
        >
            <label className="input-upload-image-label">
                <div className="label-content">
                    <div className="label-content-up">
                        <div className="label-content-icon">
                            {!fields ? <UploadIcon /> : <WarningIcon />}
                        </div>
                        {!fields ? (
                            <p className="upload-text">
                                <FormattedMessage
                                    id={"page.create.upload-text"}
                                />
                            </p>
                        ) : (
                            <p className="warning-text">
                                <FormattedMessage
                                    id={"page.create.warning-text"}
                                />
                            </p>
                        )}
                    </div>

                    <div
                        className="label-content-down"
                        style={{ color: `${fields ? "#c00" : "#6C6C6C"}` }}
                    >
                        <FormattedMessage id={"page.create.warning-image"} />
                    </div>
                </div>
                <input
                    type="file"
                    name="upload-image"
                    onChange={handleUpLoadImage}
                    hidden
                />
            </label>
        </div>
    );
};

export default InputUploadImage;
