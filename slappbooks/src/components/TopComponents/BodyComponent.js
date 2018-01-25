import React from 'react';
import {FocusStyleManager} from '@blueprintjs/core';
import Entity from "../../models/Entity";
import EntityTableView from "../EntityView/EntityTableView";
import ModifierView from "../ModifierComponents/ModifierView";
import transactionService from "../../services/TransactionService";

/**
 * This handles the main page of the accounting system
 *
 * @author Malith Jayaweera
 */
class BodyComponent extends React.Component {
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

    handleRefreshCall = () => {
        this.child.refresh();
    };

    render() {
        FocusStyleManager.alwaysShowFocus();
        return (
            <div>
                <ModifierView handleRefreshCallback={this.handleRefreshCall} entityObjects={this.state.entityObjects} entityList={this.state.entityList} newlyCreatedTransactions={this.addTransactionCallBack}/>
                <EntityTableView ref={instance => { this.child = instance; }} transactions={this.state.transactionList} entityList={this.state.entityList}/>
            </div>
        );
    }
}

export default BodyComponent;