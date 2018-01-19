import React from "react";
import View from 'react-flexbox';
import {EditableText} from "@blueprintjs/core";


/**
 * The class is renders the conversion view body. A user will use this view to convert transaction values from one
 * currency to another currency
 *
 * @author Malith Jayaweera
 */
class ConversionViewBody  extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            entities: this.props.entities,
            toCurrencies: this.props.toCurrencies,
            fromCurrencies: this.props.fromCurrencies,
            conversionRates: this.props.conversionRates,
            amount: this.props.amount,
            updatableTransactions: this.props.updatableTransactions
        }
    }

    handleToCurrency = (index, e) => {
        let toCurrencies = this.state.toCurrencies.slice();
        toCurrencies[index] = e.target.value;
        this.props.handleToCurrencies(toCurrencies);
    };

    handleFromCurrency = (index, e) => {
        let fromCurrencies = this.state.fromCurrencies.slice();
        fromCurrencies[index] = e.target.value;
        this.props.handleFromCurrencies(fromCurrencies);
    };


    render(){
        let content = [];
        this.props.entities.forEach((entity, index) => {
            content.push(
                <div key={index}>
                    <form>
                        <View column>
                            <View style={{
                                flexDirection: 'row-inverse',
                                padding: 0.2,
                                alignItems: 'stretch',
                                justifyContent: 'left'
                            }}>
                                <View column width="120px">
                                    <label className="pt-label pt-inline" htmlFor="entityValue">
                                        Entity
                                        <div className="pt-input pt-inline">
                                            <EditableText disabled={true} value={entity}/>
                                        </div>
                                    </label>
                                </View>
                                <View column width="120px">
                                    <label className="pt-label pt-inline" htmlFor="fromCurrency">
                                        From Currency
                                        <div className="pt-select pt-inline">
                                            <select ref="fromCurrency" defaultValue="LKR" name="fromCurrency"
                                                    onChange={event => this.handleFromCurrency(index, event)}>
                                                <option value="LKR">LKR</option>
                                                <option value="USD">USD</option>
                                            </select>
                                        </div>
                                    </label>
                                </View>
                                <View column width="120px">
                                    <label className="pt-label pt-inline" htmlFor="toCurrency">
                                        To Currency
                                        <div className="pt-select pt-inline">
                                            <select ref="toCurrency" defaultValue="USD" name="toCurrency"
                                                    onChange={event => this.handleToCurrency(index, event)}>
                                                <option value="LKR">LKR</option>
                                                <option value="USD">USD</option>
                                            </select>
                                        </div>
                                    </label>
                                </View>
                                <View column width="120px">
                                    <label className="pt-label pt-inline" htmlFor="spotRate">
                                        Conversion Rate
                                        <div className="pt-input pt-inline">
                                            <EditableText value={this.props.conversionRates[index]}/>
                                        </div>
                                    </label>
                                </View>
                                <View column width="120px">
                                    <label className="pt-label pt-inline" htmlFor="value">
                                        Value
                                        <div className="pt-input pt-inline">
                                            <EditableText disabled={true}
                                                          value={this.props.amount[index] * this.props.conversionRates[index]}/>
                                        </div>
                                    </label>
                                </View>
                            </View>
                        </View>
                    </form>
                </div>);
        });

        return(
            <div>
                {content}
            </div>
        );
    }
}

export default ConversionViewBody;