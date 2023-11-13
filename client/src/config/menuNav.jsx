import { IoMdAdd } from "react-icons/io";
import { IoNotifications } from "react-icons/io5";
import { AiFillMessage } from "react-icons/ai";

import { LogoIcon } from "../assets/icon";
import LoginModal from "../components/Modal/AuthModal/LoginModal";
import RegisterModal from "../components/Modal/AuthModal/RegisterModal";
import NotificationModal from "../components/Modal/NotificationModal/NotificationModal";

import { FormattedMessage } from "react-intl";

export const userMenuNav = {
    menuLeft: [
        {
            name: null,
            icon: <LogoIcon />,
            link: "/",
            type: "LOGO",
        },
        {
            name: <FormattedMessage id={"header.home"} />,
            icon: null,
            link: "/",
        },
        {
            name: <FormattedMessage id={"header.create"} />,
            icon: <IoMdAdd />,
            link: "/create-pin",
        },
    ],
    menuRight: [
        {
            name: "header.notification",
            icon: <IoNotifications fontSize={24} />,
            link: null,
            action: "notify",
            modal: <NotificationModal />,
        },
        {
            name: "header.message",
            icon: <AiFillMessage fontSize={24} />,
            link: null,
            action: "message",
            modal: <NotificationModal />,
        },
    ],
};

export const guestMenuNav = {
    menuLeft: [
        {
            name: null,
            icon: <LogoIcon />,
            link: "/",
            type: "LOGO",
        },
        { name: <FormattedMessage id={"header.home"} />, link: "/" },
    ],

    menuRight: [
        {
            name: <FormattedMessage id={"header.login"} />,
            modal: <LoginModal />,
            action: "login",
        },
        {
            name: <FormattedMessage id={"header.register"} />,
            modal: <RegisterModal />,
            action: "register",
        },
    ],
};
