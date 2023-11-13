import { RiDeleteBinLine } from "react-icons/ri";
import actionTypes from "../store/actions/actionTypes";
import RegisterModal from "../components/Modal/AuthModal/RegisterModal";
import LoginModal from "../components/Modal/AuthModal/LoginModal";
import { FormattedMessage } from "react-intl";

export const pinModalOptionsMore_User = [
    {
        name: <FormattedMessage id={"modal.pin.more.download-image"} />,
        icon: null,
        link: null,
        action: "download",
    },
    {
        name: <FormattedMessage id={"modal.pin.more.delete-pin"} />,
        icon: <RiDeleteBinLine />,
        link: null,
        action: "delete",
    },
];
export const pinModalOptionsMore_Guest = [
    {
        name: <FormattedMessage id={"modal.pin.more.report-pin"} />,
        icon: null,
        link: null,
        action: "report",
    },
];
export const modalOpen = {
    login: {
        type: actionTypes.OPEN_MODAL_LOGIN_SUCCESS,
        modal: <LoginModal />,
        duration: 90,
    },
    register: {
        type: actionTypes.OPEN_MODAL_REGISTER_SUCCESS,
        modal: <RegisterModal />,
        duration: 90,
    },
};
export const profileModal = {
    user: [
        {
            name: <FormattedMessage id={"header.profile.setting"} />,
            link: "/settings/profile",
        },
        {
            name: <FormattedMessage id={"header.profile.terms-of-service"} />,
            link: "/settings/profile",
        },
        {
            name: <FormattedMessage id={"header.profile.privacy-policy"} />,
            link: "/settings/profile",
        },
    ],
    guest: [
        {
            name: <FormattedMessage id={"header.profile.terms-of-service"} />,
            link: "/settings/profile",
        },
        {
            name: <FormattedMessage id={"header.profile.privacy-policy"} />,
            link: "/settings/profile",
        },
    ],
};
