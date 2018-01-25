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