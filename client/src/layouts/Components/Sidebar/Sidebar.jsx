import { useEffect } from "react";
import { connect } from "react-redux";
import MenuItem from "./Menu/MenuItem";
import config from "../../../config";
import Menu from "./Menu/Menu";

const Sidebar = () => {
    return (
        <div>
            <Menu>
                <MenuItem
                    title="For You"
                    to={config.routes.setting_profile}
                    // icon={<HomeIcon />}
                    // activeIcon={<HomeActiveIcon />}
                />
                <MenuItem
                    title="Following"
                    to={config.routes.setting_account}
                    // icon={<FollowingIcon />}
                    // activeIcon={<FollowingActiveIcon />}
                />
                <MenuItem
                    title="LIVE"
                    to={config.routes.search}
                    // icon={<LiveIcon />}
                    // activeIcon={<LiveActiveIcon />}
                />
            </Menu>
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        pinData: state.modal.pin,
        isOpenEditPin: state.modal.editPin,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
