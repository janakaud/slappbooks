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