import React from 'react';
import {Tab2, Tabs2} from '@blueprintjs/core';
import AddEntityComponent from './AdderComponents/AddEntityComponent';
import AddTransactionComponent from './AdderComponents/AddTransactionComponent';
import ConversionView from './ConversionView/ConversionView';
import ViewEntityComponent from './AdderComponents/ViewEntityComponent';

/**
 * The class is responsible for rendering the Modifier view. A user can modifiy a transaction, entity using this view.
 * It encapsulates @AddEntityComponent and  @AddTransactionComponent
 *
 * @author Malith Jayaweera
 */
class ModifierView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            entryCount: 0,
            transactions: [],
            entityList: this.props.entityList,
            amount: [],
            entities: [],
            isCredit: [],
            isCurrencyDifferent: false,
            conversionRate: 0,
            conversionRates: [],
            toCurrency: "USD",
            fromCurrency: "LKR",
            toCurrencies: [],
            fromCurrencies: [],
            amountValue: '',
            updatableTransactions: []
        };
    }

    toggleDialog = () => this.setState({isCurrencyDifferent: !this.state.isCurrencyDifferent});

    handleCurrencyDifference = (isCurrencyDifferent) => {
        this.setState({
            isCurrencyDifferent : isCurrencyDifferent
        })
    };

    handleCloseCallBack = () => {
        this.setState({
            isCurrencyDifferent: false
        })
    };

    handleEntityList = (entities) => {
        this.setState({
            entities: entities
        });
    };

    handleUpdatableTransactions = (transactions) => {
        this.setState({
            updatableTransactions: transactions
        })
    };

    handleAmountCallBack = (amount) => {
        this.setState({
            amount: amount
        })
    };

    render() {
        return (
            <div>
                <div className="topnav">
                    <a className="active" href="#Slappbooks">Slappbooks</a>
                </div>
               <ConversionView handleCloseCallBack={this.handleCloseCallBack}
                               fromCurrencies={this.state.fromCurrencies}
                               toCurrencies={this.state.toCurrencies}
                               updatableTransactions={this.state.updatableTransactions}
                               isCurrencyDifferent={this.state.isCurrencyDifferent}
                               entityList={this.state.entities}
                               amount={this.state.amount}/>
                <div className="pt-card pt-elevation-1 pt-interactive">
                    <div className={"relativePosition"}>
                        <Tabs2 id="Tabs2Example" onChange={this.handleTabChange}>
                            <Tab2 id="addTransaction" title="Add Transaction" panel={
                                <AddTransactionComponent handleCurrencyDifference={this.handleCurrencyDifference}
                                                         handleEntityCallBack={this.handleEntityList}
                                                         handleUpdatableTransactions={this.handleUpdatableTransactions}
                                                         handleAmountCallBack={this.handleAmountCallBack}
                                                         entityList={this.props.entityList}
                                                         entryCount={this.props.entryCount}
                                                         entityObjects={this.props.entityObjects}/>
                            }/>
                            <Tab2 id="addEntity" title="Add Entity" panel={
                                <AddEntityComponent/>
                            }/>
                            <Tab2 id="viewEntity" title="View Entity" panel={
                                <ViewEntityComponent entityObjects={this.props.entityObjects}/>
                            }/>
                        </Tabs2>
                    </div>
                </div>
            </div>
        );
    }
}

export default ModifierView;