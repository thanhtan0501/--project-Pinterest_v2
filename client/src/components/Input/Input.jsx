import { useEffect, useRef } from "react";
import "./style.scss";

const Input = ({
    text,
    placeholder,
    className,
    onClick,
    onChange,
    ...passProps
}) => {
    const textRef = useRef();
    const props = {
        onClick,
        onChange,
        ...passProps,
    };

    useEffect(() => {
        textRef.current.style.height = "inherit";
        const scrollHeight = textRef.current.scrollHeight;
        textRef.current.style.height = scrollHeight + "px";
    }, [text]);

    const classes = `${className} textarea-container`;
    return (
        <textarea
            ref={textRef}
            className={classes}
            {...props}
            placeholder={placeholder}
            rows={1}
            value={text}
        >
            {text}
        </textarea>
    );
};

export default Input;
