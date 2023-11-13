import { FormattedMessage } from "react-intl";
import "./style.scss";

const Available = () => {
    return (
        <h2 className="available-message">
            <FormattedMessage id={"message.available"} />
        </h2>
    );
};

export default Available;
