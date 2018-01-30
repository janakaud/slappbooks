/*
 * Copyright (c) 2018 SLAppForge Lanka Private Ltd. (https://www.slappforge.com). All Rights Reserved.
 *
 * SLAppForge PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {Button, Dialog} from '@blueprintjs/core';
import UpdateViewBody from './UpdateViewBody';
import transactionService from '../../../services/TransactionService';

/**
 * The class generates an update component for a user to update a transaction. A transaction might contain multiple
 * entries. The component is responsible for rendering all entries in an editable mode in a Dialog component.
 *
 * @author Malith Jayaweera
 */
class UpdateView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: this.props.isOpen,
            updateTransactions: [],
            setId: this.props.setId,
            clicked: this.props.clicked,
            entityList: this.props.entityList,
            isConfirmationOpen: false,
            loaded: false,
        };
    }

    handleClose = () => {
        this.props.handleCloseCallback();
        this.setState({
                updateTransactions : []
            })
    };

    handleSuperClose = () => {
        this.closeConfirmation();
    };

    handleRefresh = () => {
        this.props.handleRefreshCallback();
    };

    generateDialogView = () => {
        if(this.props.isOpen  && this.props.clicked) {
            transactionService.getTransactionObject(this.props.setId, (response) => {
                let transactions = response.data;
                this.props.clickCallback();
                this.setState({
                    updateTransactions: transactions,
                    clicked: false,
                    loaded: true
                });
            });
        }
    };

    updateTransaction = () => {
        let transactions = this.state.updateTransactions.slice();
        transactions.forEach(transaction => {
            transaction.setId = this.props.setId;
        });
        transactionService.updateTransaction(transactions);
        this.handleClose();
        this.handleRefresh();
    };

    deleteTransaction = () => {
        transactionService.deleteTransaction(this.props.setId);
        this.closeConfirmation();
        this.handleRefresh();
    };

    openConfirmation = () => {
        this.handleClose();
        this.setState({
            isConfirmationOpen: true
        });
    };

    closeConfirmation = () => {
        this.setState({
            isConfirmationOpen: false
        });
    };

    handleEntityChange = (entity, index) => {
        let transactions = this.state.updateTransactions;
        transactions[index].entityName = entity;
        this.setState({
            updatableTransactions : transactions
        });
    };

    handleAmountChange = (amount, index) => {
        let transactions = this.state.updateTransactions;
        transactions[index].amount = amount;
        this.setState({
            updatableTransactions : transactions
        });
    };

    handleCreditChange = (isCredit, index) => {
        let transactions = this.state.updateTransactions;
        console.log(isCredit);
        transactions[index].isCredit = isCredit;
        this.setState({
            updatableTransactions : transactions
        });
    };

    render() {
        this.generateDialogView();
        return(
            <div>
                <Dialog
                    iconName="dollar"
                    hasBackdrop={true}
                    className={"pt-popover-content-sizing"}
                    isOpen={this.state.isConfirmationOpen}
                    onClose={this.handleClose}
                    title="Confirm Action">
                    <div className="pt-dialog-body">
                        <p>Are you sure you want to delete the transaction?</p>
                    </div>
                    <div className="pt-dialog-footer">
                        <div className="pt-dialog-footer-actions">
                            <Button className={"pt-intent-success"} onClick={this.deleteTransaction} text="Yes" />
                            <Button className={"pt-button pt-intent-danger"} onClick={this.handleSuperClose} text="No"/>
                        </div>
                    </div>
                </Dialog>
                <Dialog
                    iconName="dollar"
                    hasBackdrop={true}
                    className={"pt-popover-content-sizing"}
                    isOpen={this.props.isOpen}
                    onClose={this.handleClose}
                    title="Transaction Snapshot">
                    <div className="pt-dialog-body">
                        <UpdateViewBody handleEntityChange={this.handleEntityChange}
                                        handleAmountChange={this.handleAmountChange}
                                        handleCreditChange={this.handleCreditChange}
                                        updateTransactions={this.state.updateTransactions}
                                        entityList={this.props.entityList}
                                        isOpen={this.state.isOpen}
                                        setId={this.state.setId}
                                        clicked={this.state.clicked}
                                        loaded={this.state.loaded}/>
                    </div>
                    <div className="pt-dialog-footer">
                        <div className="pt-dialog-footer-actions">
                            <Button className={"pt-intent-success"} onClick={this.updateTransaction} text="Update" />
                            <Button className={"pt-button pt-intent-danger"} onClick={this.openConfirmation} text="Delete"/>
                            <Button className={"pt-button pt-intent-danger"} onClick={this.handleClose} text="Close"/>
                        </div>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default UpdateView;