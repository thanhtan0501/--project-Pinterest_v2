import { useEffect } from "react";
import { connect } from "react-redux";

import * as actions from "../../store/actions";
import Header from "../Components/Header/Header";
import Modal from "../../components/Modal/Modal";
import EditModal from "../../components/Modal/EditModal/EditModal";

const DefaultLayout = ({
    children,
    isOpenEditPin,
    closeModalEditPin,
    pinData,
}) => {
    return (
        <>
            <div>
                <Header />
                <div>{children}</div>
            </div>
            {isOpenEditPin && pinData && (
                <Modal
                    data={pinData}
                    modal={<EditModal />}
                    setIsShowModal={closeModalEditPin}
                    duration={50}
                />
            )}
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        pinData: state.modal.pin,
        isOpenEditPin: state.modal.editPin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        closeModalEditPin: () => dispatch(actions.openModalEditPinFailed()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultLayout);
