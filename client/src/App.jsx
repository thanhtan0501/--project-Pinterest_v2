import { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "./store/actions";

import { privateRoutes, publicRoutes } from "./routes";
import DefaultLayout from "./layouts/DefaultLayout/DefaultLayout";
import _ from "lodash";

function App({ isLoggedIn, userInfo }) {
    const [routers, setRouters] = useState([]);

    useEffect(() => {
        let menuApp = [];
        if (userInfo && !_.isEmpty(userInfo) && isLoggedIn) {
            menuApp = privateRoutes;
        } else {
            menuApp = publicRoutes;
        }
        setRouters(menuApp);
    }, [userInfo]);

    return (
        <Router>
            <div className="App">
                <Routes>
                    {routers.map((publicRoute, index) => {
                        const Page = publicRoute.component;
                        let Layout = DefaultLayout;

                        if (publicRoute.layout) {
                            Layout = publicRoute.layout;
                        } else if (publicRoute.layout === null) {
                            Layout = Fragment;
                        }

                        return (
                            <Route
                                key={index}
                                path={publicRoute.path}
                                element={
                                    <Layout>
                                        <Page />
                                    </Layout>
                                }
                            ></Route>
                        );
                    })}
                </Routes>
            </div>
        </Router>
    );
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
