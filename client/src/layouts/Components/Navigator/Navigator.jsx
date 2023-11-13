import { useState } from "react";
import { NavLink } from "react-router-dom";

import "./style.scss";
import Modal from "../../../components/Modal/Modal";
import { useIntl } from "react-intl";

const Navigator = ({ menus }) => {
    const intl = useIntl();

    const [isShowModal, setIsShowModal] = useState({
        login: false,
        register: false,
        notify: false,
        message: false,
    });

    const handleClickAction = (action) => {
        const copyState = { ...isShowModal };
        copyState[action] = !copyState[action];
        setIsShowModal((prev) => ({ ...prev, ...copyState }));
    };

    return (
        <>
            {menus &&
                menus?.length > 0 &&
                menus.map((menu, index) => (
                    <div
                        key={index}
                        className={`${
                            menu.type === "LOGO" && "logo"
                        } header-nav`}
                    >
                        {menu.link ? (
                            <NavLink
                                title={menu.name}
                                to={menu.link}
                                className={({ isActive }) =>
                                    isActive && menu.type !== "LOGO"
                                        ? "nav-link link-active"
                                        : "nav-link link-non-active"
                                }
                            >
                                <div className="nav-link-title">
                                    {menu.name && menu.name}
                                    {menu.icon && menu.icon}
                                </div>
                            </NavLink>
                        ) : (
                            <button
                                className={`nav-link btn btn-non-active ${
                                    isShowModal[menu.action] && "btn-active"
                                }`}
                                title={intl.formatMessage({
                                    id: menu.name,
                                })}
                                onClick={() => handleClickAction(menu.action)}
                            >
                                <span className="nav-link-title">
                                    {menu.icon && menu.name
                                        ? menu.icon
                                        : menu.name}
                                </span>
                            </button>
                        )}
                        {menu.modal && isShowModal[menu.action] && (
                            <Modal
                                action={menu.action}
                                modal={menu.modal}
                                isShowModal={isShowModal}
                                setIsShowModal={setIsShowModal}
                            />
                        )}
                    </div>
                ))}
        </>
    );
};

export default Navigator;
