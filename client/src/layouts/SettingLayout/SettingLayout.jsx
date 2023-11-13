import { useEffect } from "react";
import { connect } from "react-redux";

import "./style.scss";
import Header from "../Components/Header/Header";
import Sidebar from "../Components/Sidebar/Sidebar";

const SettingLayout = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="container">
                <Sidebar />
                <div className="content">{children}</div>
            </div>
        </div>
    );
};
const mapStateToProps = (state) => {
    return {
        pinData: state.modal.pin,
        isOpenEditPin: state.modal.editPin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SettingLayout);
