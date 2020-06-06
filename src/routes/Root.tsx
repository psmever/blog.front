import React from "react";
import { Router, Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import {
    MainPage,
    DefaultPage,
} from "pages";

interface RootProps  {
    Routerhistory: any
};

const Root = ({Routerhistory} : RootProps) => {

    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Router history={ Routerhistory }>
                <Switch>
                    <Route path={process.env.PUBLIC_URL + "/"} exact={ true } component={ DefaultPage } />
                    <Route path={process.env.PUBLIC_URL + "/main"} exact={ true } component={ MainPage } />
                    <Redirect path="*" to={process.env.PUBLIC_URL + "/"} />
                </Switch>
            </Router>
        </BrowserRouter>
    );
}

export default Root;