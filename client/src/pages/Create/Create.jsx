import { connect } from "react-redux";

import "./style.scss";
import CreateModal from "../../components/CreateModal/CreateModal";
import { useEffect } from "react";

const Create = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    });
    return (
        <div className="create-wrapper">
            <div className="create-container">
                <CreateModal />
            </div>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Create);
