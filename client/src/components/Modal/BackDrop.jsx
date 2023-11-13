import "./style.scss";

const BackDrop = ({ closeModal, isShow }) => {
    return (
        <div
            onClick={closeModal}
            className={`backdrop ${isShow && "show"}`}
        ></div>
    );
};

export default BackDrop;
