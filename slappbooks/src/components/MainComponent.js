/*
 * Copyright (c) 2018 SLAppForge Lanka Private Ltd. (https://www.slappforge.com). All Rights Reserved.
 *
 * SLAppForge PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {FocusStyleManager} from '@blueprintjs/core';
import Header from './TopComponents/HeaderComponent';
import MainView from './TopComponents/MainView'

/**
 * This handles the main page of the accounting system
 *
 * @author Malith Jayaweera
 */
class MainComponent extends React.Component {

    render() {
        FocusStyleManager.alwaysShowFocus();
        return (
            <div className="panel">
                <Header />
                <MainView />
            </div>
        );
    }
}

export default MainComponent;