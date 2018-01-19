import React from "react";
import currencyService from "../../../services/CurrencyService";
import transactionService from "../../../services/TransactionService";
import ConversionViewBody from "./ConversionViewBody";
import {Button, Toaster, Position, Intent, Dialog} from "@blueprintjs/core";

/**
 * The class is renders the conversion view. A user will use this view to convert transaction values from one
 * currency to another currency
 *
 * @author Malith Jayaweera
 */
class ConversionView  extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isCurrencyDifferent: this.props.isCurrencyDifferent,
            conversionRates: [],
            entityList: this.props.entityList,
            toCurrency: "USD",
            fromCurrency: "LKR",
            toCurrencies: [],
            fromCurrencies: [],
            amount: this.props.amount,
            updatableTransactions: this.props.updatableTransactions
        };
       /* this.addDefaultCurrencyList();
        this.convert();*/
    }

    addDefaultCurrencyList = () => {
        let currencies = [];
        currencies.length = this.props.entityList.length + 1;
        currencies.fill(this.state.fromCurrency);
        this.setState({
            fromCurrencies: currencies
        });
        let newCurrencies = [];
        newCurrencies.length = this.props.entityList.length + 1;
        newCurrencies.fill(this.state.toCurrency);
        this.setState({
            toCurrencies: newCurrencies
        });
    };


    handleClose = () => {
        this.props.handleCloseCallBack();
    };

    handleFromCurrencies = (fromCurrencies) => {
        this.setState({
            fromCurrencies: fromCurrencies
        });
    };

    handleToCurrencies = (toCurrencies) => {
        this.setState({
            toCurrencies: toCurrencies
        });
    };

    convert = () => {
        this.props.entityList.forEach((entity, index) => {
            var from = this.state.fromCurrencies[index] !== undefined ? this.state.fromCurrencies[index] : this.state.fromCurrency;
            var to = this.state.toCurrencies[index] !== undefined ? this.state.toCurrencies[index] : this.state.toCurrency;
            currencyService.getExchangeRate(from, to, (response) => {
                var data = response.data;
                var tempConversionRates = this.state.conversionRates.slice();
                let valueObject = data.hasOwnProperty(from + "_" + to) ? data[from + "_" + to] : 0;
                tempConversionRates[index] = valueObject.val;
                this.setState({
                    conversionRates: tempConversionRates
                });
            });
        });
    };

    submitValue = () => {
        let amounts = this.props.amount.slice();
        amounts.forEach((val, index) => {
            amounts[index] = this.props.amount[index] * this.state.conversionRates[index];
        });
        this.setState({
            amount: amounts
        });
        this.handleClose();
        let transactions = this.props.updatableTransactions.slice();
        transactions.forEach((transaction, index) => {
            transaction.amount = amounts[index];
        });
        transactionService.createTransaction(transactions);
        OurToaster.show({message: "Transaction Added Successfully!"});
        this.setState({
            entryCount: 0,
            amountValue: ''
        })
    };

    render() {
        return (
            <Dialog
                iconName="dollar"
                hasBackdrop={false}
                className={"pt-popover-content-sizing"}
                isOpen={this.props.isCurrencyDifferent}
                onClose={this.handleClose}
                title="Transaction Snapshot"
            >
                <div className="pt-dialog-body">
                    <ConversionViewBody entities={this.props.entityList}
                                        handleFromCurrencies={this.handleFromCurrencies}
                                        handleToCurrencies={this.handleToCurrencies}
                                        amount={this.props.amount}
                                        conversionRates={this.state.conversionRates}
                                        toCurrencies={this.props.toCurrencies}
                                        fromCurrencies={this.props.fromCurrencies}/>
                </div>
                <div className="pt-dialog-footer">
                    <div className="pt-dialog-footer-actions">
                        <Button
                            className={"pt-intent-success"}
                            onClick={this.convert}
                            text="Update"/>
                        <Button
                            className={"pt-intent-success"}
                            onClick={this.submitValue}
                            text="Submit"/>
                        <Button
                            className={"pt-button pt-intent-danger"}
                            onClick={this.handleClose}
                            text="Close"
                        />
                    </div>
                </div>
            </Dialog>
        );
    }
}

export default ConversionView;

export const OurToaster = Toaster.create({
    className: "panel align-lower",
    position: Position.TOP_RIGHT,
    intent: Intent.PRIMARY
});