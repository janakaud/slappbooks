/*
 * Copyright (c) 2018 Slappforge Lanka Private Ltd. (https://www.slappforge.com). All Rights Reserved.
 *
 * Slappforge PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {FocusStyleManager, Toaster, Position, Intent} from '@blueprintjs/core';
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
        }, (error) => {
            OurToaster.show({message: "Error while loading entity names due to : " + error.message});
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

export const OurToaster = Toaster.create({
    className: "panel align-lower",
    position: Position.TOP_RIGHT,
    intent: Intent.DANGER
});