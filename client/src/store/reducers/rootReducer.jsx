import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import userReducer from "./userReducer";
import appReducer from "./appReducer";
import pinReducer from "./pinReducer";
import modalReducer from "./modalReducer";

import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";

const persistCommonConfig = {
    storage: storage,
};

const userPersistConfig = {
    ...persistCommonConfig,
    key: "user",
    whitelist: ["isLoggedIn", "userInfo"],
};

const appPersistConfig = {
    ...persistCommonConfig,
    key: "app",
    whitelist: ["language"],
};

const rootReducer = (history) =>
    combineReducers({
        router: connectRouter(history),
        user: persistReducer(userPersistConfig, userReducer),
        app: persistReducer(appPersistConfig, appReducer),
        pin: pinReducer,
        modal: modalReducer,
    });

export default rootReducer;
