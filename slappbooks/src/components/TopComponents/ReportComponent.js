/*
 * Copyright (c) 2018 SLAppForge Lanka Private Ltd. (https://www.slappforge.com). All Rights Reserved.
 *
 * SLAppForge PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import TrialBalance from '../ReportView/TrialBalance'

/**
 *  The component acts as a controller rendering project views
 *
 *  @author Malith Jayaweera
 */
class ReportComponent extends React.Component {

    render() {
        return(
            <div>
                <TrialBalance />
            </div>);
    }
}

export default ReportComponent;