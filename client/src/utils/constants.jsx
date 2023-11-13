export const customStylesSelected = {
    option: (provided, state) => ({
        ...provided,
        // width: 200,
        cursor: "pointer",
    }),
    control: () => ({
        display: "flex",
        width: 200,
        border: "none",
        cursor: "pointer",
        backgroundColor: "#efefef",
        padding: "4px 14px",
        borderTopLeftRadius: "8px",
        borderBottomLeftRadius: "8px",
    }),
    menu: (provided, state) => ({
        ...provided,
        width: 200,
    }),
    singleValue: (provided, state) => ({
        ...provided,
        fontWeight: 600,
    }),
};

export const typeImageInput = [
    { type: "image/png" },
    { type: "image/svg" },
    { type: "image/gif" },
    { type: "image/tiff" },
    { type: "image/jpeg" },
    { type: "image/jpg" },
];
export const breakpointObj = {
    default: 4,
    2000: 5,
    1400: 4,
    1100: 3,
    850: 2,
    550: 1,
};

export const checkUrl = (pin) => {
    let num = 0;
    let lengthDomain = 0;
    const domains = [
        ".de",
        ".com",
        ".net",
        ".uk",
        ".org",
        ".cn",
        ".ga",
        ".tk",
        ".nl",
        ".ru",
    ];
    domains.some((domain) => {
        num = pin?.link.lastIndexOf(domain);
        lengthDomain = domain.length;
        return num !== -1 ? true : false;
    });
    return num > 0 ? num + lengthDomain : pin?.link.length;
};
