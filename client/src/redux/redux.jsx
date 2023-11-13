import thunkMiddleware from "redux-thunk";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import { createStore, applyMiddleware, compose } from "redux";
import { createStateSyncMiddleware } from "redux-state-sync";
import { persistStore } from "redux-persist";

import createRootReducer from "../store/reducers/rootReducer";
import actionTypes from "../store/actions/actionTypes";

export const history = createBrowserHistory();
const reduxStateSyncConfig = {
    whitelist: [actionTypes.APP_START_UP_COMPLETE, actionTypes.CHANGE_LANGUAGE],
};

const middleware = [
    routerMiddleware(history),
    thunkMiddleware,
    createStateSyncMiddleware(reduxStateSyncConfig),
];

const rootReducer = createRootReducer(history);

const reduxStore = createStore(
    rootReducer,
    compose(applyMiddleware(...middleware))
);

export const dispatch = reduxStore.dispatch;

export const persistor = persistStore(reduxStore);

export default reduxStore;
