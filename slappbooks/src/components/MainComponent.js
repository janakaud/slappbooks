import React from 'react';
import {FocusStyleManager} from '@blueprintjs/core';
import EntityTableView from "./EntityView/EntityTableView";
import ModifierView from "./ModifierComponents/ModifierView";
import Entity from "../models/Entity";
import transactionService from "../services/TransactionService";

/**
 * This handles the main page of the accounting system
 *
 * @author Malith Jayaweera
 */
class MainComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: true,
            entityList: [],
            entityObjects: [],
            transactionList: []
        };
        this.populateEntityList();
    }

    populateEntityList = () => {
        transactionService.getEntity((response) => {
             let entities = response.data;
             let entityNames = [];
             let entityObjects = [];
             entities.forEach(entity => {
                 entityNames.push(entity.entityName);
                 entityObjects.push(new Entity(entity.entityName, entity.entityType, entity.defaultCurrency));
             });
             this.setState({
                 entityList : entityNames,
                 entityObjects : entityObjects
             });
        });
    };

    render() {
        FocusStyleManager.alwaysShowFocus();
        return (
            <div className="panel">
                <ModifierView entityObjects={this.state.entityObjects} entityList={this.state.entityList} newlyCreatedTransactions={this.addTransactionCallBack}/>
                <EntityTableView transactions={this.state.transactionList} entityList={this.state.entityList}/>
            </div>
        );
    }
}

export default MainComponent;