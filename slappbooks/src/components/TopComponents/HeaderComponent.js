/*
 * Copyright (c) 2018 Slappforge Lanka Private Ltd. (https://www.slappforge.com). All Rights Reserved.
 *
 * Slappforge PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import { Icon } from '@blueprintjs/core';

/**
 * This handles the main page of the accounting system
 *
 * @author Malith Jayaweera
 */
class HeaderComponent extends React.Component {
    render() {
        return(
            <div className="topnav">
                <a className="active" href="/">Slappbooks</a>
                <div className={"float-right"}>
                    <a href={"reports"}>Reports</a>
                </div>
                <div className={"float-right"}>
                    <a href={"settings"}><Icon iconName="pt-icon-settings" /></a>
                </div>
            </div>
        );
    }
}

export default HeaderComponent;