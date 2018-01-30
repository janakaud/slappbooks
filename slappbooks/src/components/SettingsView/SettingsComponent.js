/*
 * Copyright (c) 2018 SLAppForge Lanka Private Ltd. (https://www.slappforge.com). All Rights Reserved.
 *
 * SLAppForge PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import View from 'react-flexbox'
import {Intent, Position, Toaster} from '@blueprintjs/core';

/*
 * This handles the Settings within the application
 *
 */
class SettingsComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            apiUrl : localStorage.getItem('REACT_APP_API') || process.env.REACT_APP_API_HOST
        }
    }

    submitSettings = (e) => {
        e.preventDefault();
        let url = e.target.apiUrl.value;
        this.setState({
            apiUrl: url
        });
        localStorage.setItem('REACT_APP_API', url);
        OurToaster.show({message: "Slappbooks application endpoint has been configured"});
    };

    render() {
        return(
            <div className={"pt-card full-height"}>
                <form onSubmit={this.submitSettings}>
                    <View auto style={{
                        flexDirection: 'row-inverse',
                        padding: 0.2,
                        alignItems: 'stretch',
                        justifyContent: 'left'
                    }}>
                        <View row>
                            <View width={"100px"}>
                                <label className="pt-label pt-inline" htmlFor="apiUrl">
                                API URL
                                </label>
                            </View>
                            <View column>
                                <View width={"800px"}>
                                    <input ref="apiUrl" size={"80"} className="pt-input" type="text" name="apiUrl" defaultValue={this.state.apiUrl}></input>
                                </View>
                            </View>
                        </View>
                        <View column width={"300px"}>
                            <button className="pt-button pt-small pt-icon-tick-circle pt-intent-success float-right" type="submit">Submit</button>
                        </View>
                    </View>
                </form>
            </div>);
    }
}

export default SettingsComponent;

export const OurToaster = Toaster.create({
    className: "panel align-lower",
    position: Position.TOP_RIGHT,
    intent: Intent.PRIMARY
});