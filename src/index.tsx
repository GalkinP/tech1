import React, {useReducer} from "react";
import ReactDOM from "react-dom/client";
import useMockAdapter from "src/api/useMockAdapter";
import "./index.css";
import App from "./App";
import {appContext} from "./context/context";
import {initState, reducer} from "./reducer/reducer";
const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement,
);
const RootApp = () => {
    useMockAdapter();
    const [state, dispatch] = useReducer(reducer, initState);
    return (
        <appContext.Provider value={{state, dispatch}}>
            <App />
        </appContext.Provider>
    );
};

root.render(
    <React.StrictMode>
        <RootApp />
    </React.StrictMode>,
);
