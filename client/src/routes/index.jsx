import config from "../config";

// Auth
import LoginModal from "../components/Modal/AuthModal/LoginModal";
import RegisterModal from "../components/Modal/AuthModal/RegisterModal";

// Page
import Home from "../pages/Home/Home";
import Search from "../pages/Search/Search";
import Create from "../pages/Create/Create";
import Profile from "../pages/Profile/Profile";
import Setting from "../pages/Setting/Setting";
import PinDetail from "../pages/PinDetail/PinDetail";

// Layout
import SettingLayout from "../layouts/SettingLayout/SettingLayout";

// Router không cần đăng nhập vẫn xem được
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.search, component: Search },
    { path: config.routes.profile, component: Profile },
    { path: config.routes.pinDetail, component: PinDetail },
    { path: config.routes.all, component: Home },
];
// Router cần đăng nhập mới xem được
const privateRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.search, component: Search },
    { path: config.routes.createPin, component: Create },
    { path: config.routes.profile, component: Profile },
    {
        path: config.routes.setting_profile,
        component: Setting,
        layout: SettingLayout,
    },
    {
        path: config.routes.setting_account,
        component: Setting,
        layout: SettingLayout,
    },
    { path: config.routes.pinDetail, component: PinDetail },
    { path: config.routes.all, component: Home },
];

export { publicRoutes, privateRoutes };
