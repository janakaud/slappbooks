/*
 * Copyright (c) 2018 SLAppForge Lanka Private Ltd. (https://www.slappforge.com). All Rights Reserved.
 *
 * SLAppForge PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import {Button, Toaster, Position, Intent, Dialog} from '@blueprintjs/core';
import currencyService from '../../../services/CurrencyService';
import transactionService from '../../../services/TransactionService';
import ConversionViewBody from './ConversionViewBody';
import CurrencyConversion from '../../../models/CurrencyConversion';

/**
 *  The class is renders the conversion view. A user will use this view to convert transaction values from one
 *  currency to another currency
 *
 *  @author Malith Jayaweera
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
            toCurrencies: Array(this.props.entityList.length + 2).fill("USD"),
            fromCurrencies: Array(this.props.entityList.length + 2).fill("LKR"),
            amount: this.props.amount,
            updatableTransactions: this.props.updatableTransactions
        };
    }

    handleRefreshCallBack = () => {
        this.props.handleRefreshCallback();
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
            let from = this.state.fromCurrencies[index] !== undefined ? this.state.fromCurrencies[index] : this.state.fromCurrency;
            let to = this.state.toCurrencies[index] !== undefined ? this.state.toCurrencies[index] : this.state.toCurrency;
            currencyService.getExchangeRate(from, to, (response) => {
                let data = response.data;
                let tempConversionRates = this.state.conversionRates.slice();
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
        let conversions = [];
        amounts.forEach((val, index) => {
            amounts[index] = this.props.amount[index] * this.state.conversionRates[index];
            let from = this.state.fromCurrencies[index] !== undefined ? this.state.fromCurrencies[index] : this.state.fromCurrency;
            let to = this.state.toCurrencies[index] !== undefined ? this.state.toCurrencies[index] : this.state.toCurrency;
            let conversion = new CurrencyConversion();
            conversion.fromCurrency = from;
            conversion.toCurrency = to;
            conversion.conversionRate = this.state.conversionRates[index];
            conversions.push(conversion);
        });
        this.setState({
            amount: amounts
        });
        this.handleClose();
        let transactions = this.props.updatableTransactions.slice();
        transactions.forEach((transaction, index) => {
            transaction.amount = amounts[index];
        });

        transactionService.createTransactionWithCurrencyDifference(transactions, conversions, () => {
            OurToaster.show({message: "Transaction Added Successfully!"});
            this.handleRefreshCallBack();
        }, (error) => {
            OurToaster.show({message: "Transaction could not be added due to : " + error.message});
        });
        this.setState({
            entryCount: 0,
            amountValue: ''
        });
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
                                        toCurrencies={this.state.toCurrencies}
                                        fromCurrencies={this.state.fromCurrencies}/>
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