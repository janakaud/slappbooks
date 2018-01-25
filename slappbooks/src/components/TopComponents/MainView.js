import React from 'react'
import { Switch, Route } from 'react-router-dom'
import BodyComponent from "./BodyComponent";
import ReportComponent from "./ReportComponent";

/**
 * This handles the routing within the application
 *
 * @author Malith Jayaweera
 */
const MainView = () => (
    <main>
        <Switch>
            <Route exact path='/' component={BodyComponent}/>
            <Route path='/reports' component={ReportComponent}/>
        </Switch>
    </main>
);

export default MainView;