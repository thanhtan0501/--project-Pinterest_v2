import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";

import App from "./App.jsx";
import "./styles/styles.scss";
import reduxStore from "./redux/redux.jsx";
import IntlProviderWrapper from "./hoc/IntlProviderWrapper.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={reduxStore}>
        <IntlProviderWrapper>
            <App />
        </IntlProviderWrapper>
    </Provider>
);
