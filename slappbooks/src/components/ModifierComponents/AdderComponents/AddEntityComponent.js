import React from "react";
import View from 'react-flexbox';
import transactionService from "../../../services/TransactionService";

/**
 * This represents an add entity component
 * @author Malith Jayaweera
 */
class AddEntityComponent extends React.Component {

    submitEntityForm = (e) => {
        e.preventDefault();
        let entity = e.target.entityName.value;
        let currency = e.target.currency.value;
        let entityType = e.target.entityType.value;
        transactionService.createEntity(entity, currency, entityType);
        this.render();
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
                        <input className="pt-button pt-intent-success" type="submit"/>
                    </View>
                </form>
            </div>
        );
    }
}

export default AddEntityComponent;