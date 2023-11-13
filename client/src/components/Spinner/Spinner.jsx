import "./style.scss";

const Spinner = ({ message }) => {
    return (
        <div className="spinner-wrapper">
            <span id="loader"></span>
            <p className="message ">{message}</p>
        </div>
    );
};

export default Spinner;
