import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import "./style.scss";
import Button from "../Button/Button";
import config from "../../config";
import { BiSearch } from "react-icons/bi";
import { UserIcon } from "../../assets/icon";

const AccountItem = ({ data, handleHideResult, setSearchValue }) => {
    const navigate = useNavigate();

    const handleSearchSubmit = () => {
        handleHideResult();
        navigate(`${config.routes.search}/?q=${data?.text}`, {
            state: { searchTerm: data?.text },
        });
    };

    return (
        <>
            {data?._id && data?.userName ? (
                <Button
                    to={`/${data?.userName}`}
                    state={{
                        userId: data?._id,
                    }}
                    onClick={() => {
                        setSearchValue("");
                        handleHideResult();
                    }}
                    className="account-item-wrapper"
                >
                    {data?.image ? (
                        <img
                            className="avatar"
                            src={data?.image}
                            // src="https://i.pinimg.com/75x75_RS/04/93/8c/04938c0a946a7fbb3d6c99dc1ff5c775.jpg"
                            alt={data?.fullName}
                        />
                    ) : (
                        <div className="user-icon-wrapper">
                            <UserIcon />
                        </div>
                    )}
                    <div className="info">
                        <div className="name">
                            <span>{data.fullName}</span>
                        </div>
                        <span className="username">{data.userName}</span>
                    </div>
                </Button>
            ) : (
                <div
                    className="account-item-wrapper"
                    onClick={handleSearchSubmit}
                >
                    <div className="search-icon">
                        <BiSearch fontSize={16} />
                    </div>
                    <span>{data.text}</span>
                </div>
            )}
        </>
    );
};
const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountItem);
