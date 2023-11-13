import { Link, NavLink } from "react-router-dom";

import "./style.scss";

const Button = ({
    to,
    state,
    href,
    download,
    children,
    className,
    leftIcon,
    rightIcon,
    onClick,
    ...passProps
}) => {
    let Comp = "button";
    const props = {
        onClick,
        ...passProps,
    };
    if (to) {
        props.to = to;
        if (state) {
            props.state = state;
            Comp = NavLink;
        } else Comp = Link;
    } else if (href) {
        props.href = href;
        if (download) props.download = download;
        Comp = "a";
    }

    const classes = `${className} wrapper`;
    return (
        <Comp className={classes} {...props}>
            {leftIcon && leftIcon}
            {children}
            {rightIcon && rightIcon}
        </Comp>
    );
};

export default Button;
