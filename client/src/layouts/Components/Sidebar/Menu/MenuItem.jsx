import { NavLink } from "react-router-dom";

import "./style.scss";

const MenuItem = ({ title, to, icon, activeIcon }) => {
    return (
        <NavLink
            className={({ isActive }) =>
                isActive ? "menu-item active" : "menu-item"
            }
            to={to}
        >
            {({ isActive }) => {
                const iconCurrent = isActive ? activeIcon : icon;
                return (
                    <>
                        {iconCurrent}
                        <span className="title">{title}</span>
                    </>
                );
            }}
        </NavLink>
    );
};

export default MenuItem;
