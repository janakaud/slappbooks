import React from 'react';
import View from 'react-flexbox';
import {Intent, Position, Toaster} from '@blueprintjs/core';
import transactionService from '../../../services/TransactionService';

/**
 *  This represents the add entity component. The component can be used for adding entities to the system
 *
 *  @author Malith Jayaweera
 */
class AddEntityComponent extends React.Component {

    submitEntityForm = (e) => {
        e.preventDefault();
        let entity = e.target.entityName.value;
        let currency = e.target.currency.value;
        let entityType = e.target.entityType.value;

        if(entity === '') {
            OurToaster.show({message: "Entity Name Cannot be Empty!"});
        } else {
            transactionService.createEntity(entity, currency, entityType);
            OurToaster.show({message: "Entity Added Successfully!"});
            this.render();
        }
    };

    render() {
        return(
            <div>
                <form onSubmit={this.submitEntityForm}>
                    <View column>
                        <View row height="">
                        </View>
                        <View auto style={{
                            flexDirection: 'row',
                            padding: 0.2,
                            alignItems: 'stretch',
                            justifyContent: 'left'
                        }}>
                            <View column width="300px">
                                <div className={"pt-inline"}>
                                    <label className="pt-label pt-inline" htmlFor="entityName">
                                        <View column width="250px">
                                            <input className={"pt-input pt-round pt-fill"} type="text" placeholder="Entity Name" name="entityName" />
                                        </View>
                                        <View column width="50px">
                                        </View>
                                    </label>
                                </div>
                            </View>
                            <View column width="200px">
                                <div className={"pt-inline"}>
                                    <label className="pt-label pt-inline" htmlFor="entityType">
                                        Entity Type
                                        <div className="pt-select pt-inline">
                                            <select ref="entityType" defaultValue={"ASSETS"} name="entityType" onChange={this.handleCreditChange}>
                                                <option value="ASSETS">ASSETS</option>
                                                <option value="EQUITY">EQUITY</option>
                                                <option value="LIABILITY">LIABILITY</option>
                                                <option value="EXPENSE">EXPENSE</option>
                                                <option value="INCOME">INCOME</option>
                                            </select>
                                        </div>
                                    </label>
                                </div>
                            </View>
                            <View column width="200px">
                                <label className="pt-label pt-inline" htmlFor="currency">
                                    Default Currency
                                    <div className="pt-select pt-inline">
                                        <select ref="currency" defaultValue={"USD"} name="currency" onChange={this.handleCreditChange}>
                                            <option value="USD">USD</option>
                                            <option value="LKR">LKR</option>
                                        </select>
                                    </div>
                                </label>
                            </View>
                        </View>
                    </View>
                    <View>
                        <button className="pt-button pt-icon-tick-circle pt-intent-success" type="submit">Submit</button>
                    </View>
                </form>
            </div>
        );
    }
}

export default AddEntityComponent;

export const OurToaster = Toaster.create({
    className: "panel align-lower",
    position: Position.TOP_RIGHT,
    intent: Intent.PRIMARY
});