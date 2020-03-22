import {Route, Switch} from "react-router-dom";
import Lideres from "../../../containers/group-lead/GroupLead";
import ListaGrupos from "../../../containers/group-list/GroupList";
import MyGroup from "../../../containers/my-group/MyGroup";
import Home from "../../../containers/home/Home";
import React from "react";

function SwitchRoute() {
    return (
        <Switch>
            {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Route path="/lideres">
                <Lideres />
            </Route>
            <Route path="/grupos">
                <ListaGrupos />
            </Route>
            <Route path="/meugrupo">
                <MyGroup />
            </Route>
            <Route path="/">
                <Home />
            </Route>
        </Switch>
    )
}

export default SwitchRoute;