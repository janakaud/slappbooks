import React from 'react';

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
            </div>
        );
    }
}

export default HeaderComponent;