import React from "react";
import transactionService from "../../../services/TransactionService";
import {Button, Dialog} from "@blueprintjs/core";
import UpdateViewBody from "./UpdateViewBody"

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
            loaded: false,
        };
    }

    handleClose = () => {
        this.props.handleCloseCallback();
        this.setState({
                updateTransactions : []
            })
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
            transaction.isCredit = transaction.isCredit === "CR";
            transaction.setId = this.props.setId;
        });
        console.log(transactions);
        transactionService.updateTransaction(transactions);
        this.handleClose();
    };

    deleteTransaction = () => {
        transactionService.deleteTransaction(this.props.setId);
        this.handleClose();
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
            <Dialog
                iconName="dollar"
                hasBackdrop={false}
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
                        <Button className={"pt-button pt-intent-danger"} onClick={this.deleteTransaction} text="Delete"/>
                        <Button className={"pt-button pt-intent-danger"} onClick={this.handleClose} text="Close"/>
                    </div>
                </div>
            </Dialog>
        );
    }
}

export default UpdateView;