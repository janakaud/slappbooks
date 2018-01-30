/*
 * Copyright (c) 2018 Slappforge Lanka Private Ltd. (https://www.slappforge.com). All Rights Reserved.
 *
 * Slappforge PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react'
import { Switch, Route } from 'react-router-dom'
import BodyComponent from "./BodyComponent";
import ReportComponent from "./ReportComponent";
import SettingsComponent from "../SettingsView/SettingsComponent";

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
            <Route path='/settings' component={SettingsComponent} />
        </Switch>
    </main>
);

export default MainView;