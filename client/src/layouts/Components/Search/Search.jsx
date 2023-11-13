import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeadlessTippy from "@tippyjs/react/headless";
import { FormattedMessage, useIntl } from "react-intl";

import { BiSearch } from "react-icons/bi";
import { FaCircleXmark } from "react-icons/fa6";

import "./style.scss";

import config from "../../../config";
import Button from "../../../components/Button/Button";
import useDebounce from "../../../hooks/useDebounce";
import Spinner from "../../../components/Spinner/Spinner";
import { fetchUserBySearchService } from "../../../services";
import AccountItem from "../../../components/AccountItem/AccountItem";

const Search = ({ searchService }) => {
    const navigate = useNavigate();
    const inputRef = useRef();

    const [width, setWidth] = useState(inputRef?.current?.offsetWidth);

    const [searchValue, setSearchValue] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(true);
    const [loading, setLoading] = useState(false);
    const [isFocus, setIsFocus] = useState(false);

    const debouncedValue = useDebounce(searchValue, 500);
    const intl = useIntl();

    useEffect(() => {
        if (showResult) {
            setWidth(inputRef?.current?.offsetWidth);
        }
    }, [showResult, width]);

    useEffect(() => {
        if (!debouncedValue.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchAPI = async () => {
            setLoading(true);

            const { data } = await fetchUserBySearchService(debouncedValue);
            let result = [];
            if (data && data.errorCode === 0) {
                result = [...data.data, { text: searchValue }];
            } else {
                result = [...searchResult, { text: searchValue }];
            }
            setTimeout(() => {
                setSearchResult(result);
                setLoading(false);
            }, 800);
        };
        fetchAPI();
    }, [debouncedValue]);

    const handleClear = () => {
        setSearchValue("");
        setSearchResult([]);
        setShowResult(false);
        navigate(config.routes.home);
    };
    const handleHideResult = () => {
        setShowResult(false);
    };
    const handleChange = (e) => {
        if (e.target.value[0] !== " ") {
            setSearchValue(e.target.value);
        }
    };

    const handleSearchSubmit = async (e) => {
        if (e.key === "Enter") {
            if (!debouncedValue.trim()) {
                setSearchResult([]);
                return;
            }
            navigate(`${config.routes.search}/?q=${debouncedValue}`, {
                state: { searchTerm: debouncedValue },
            });
        }
    };

    return (
        <HeadlessTippy
            appendTo={() => document.body}
            interactive
            visible={showResult && isFocus}
            render={(attrs) => (
                <div
                    className="search-result"
                    style={{ width: `${width}px` }}
                    tabIndex="-1"
                    {...attrs}
                >
                    <div className="wrapper">
                        {/* <h4 className="search-title">Accounts</h4> */}
                        {searchResult.map((result, index) => (
                            <AccountItem
                                key={index}
                                data={result}
                                handleHideResult={handleHideResult}
                                setSearchValue={setSearchValue}
                            />
                        ))}
                    </div>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className="search-wrapper">
                {!isFocus && (
                    <Button className="btn">
                        <BiSearch fontSize={21} className="icon" />
                    </Button>
                )}
                <input
                    ref={inputRef}
                    value={searchValue}
                    type="text"
                    spellCheck={false}
                    onChange={handleChange}
                    onFocus={() => {
                        setShowResult(true);
                        setIsFocus(true);
                    }}
                    placeholder={intl.formatMessage({ id: "header.search" })}
                    // onBlur={() => setIsFocus(false)}
                    onKeyDown={(e) => handleSearchSubmit(e)}
                />
                {loading && (
                    <div style={{ paddingRight: "2px" }}>
                        <Spinner />
                    </div>
                )}

                {!!searchValue && !loading && (
                    <Button className="btn clear-btn" onClick={handleClear}>
                        <FaCircleXmark fontSize={21} className="icon" />
                    </Button>
                )}
            </div>
        </HeadlessTippy>
    );
};

export default Search;
