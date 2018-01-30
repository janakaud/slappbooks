/*
 * Copyright (c) 2018 Slappforge Lanka Private Ltd. (https://www.slappforge.com). All Rights Reserved.
 *
 * Slappforge PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import React from 'react';
import View from 'react-flexbox'
import {NumericInput} from '@blueprintjs/core'

/**
 * This represents an add transaction row
 * @author Malith Jayaweera
 */
class TransactionBasicRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: '',
            entityList: this.props.entityList,
            entity: this.props.entity,
            amount: this.props.amount,
            isCredit: this.props.isCredit,
            index: this.props.index,
            showableEntityList: [],
            defaultCurrency: this.props.defaultCurrency
        }
    }

    handleEntityChange = (e) => {
        this.setState({
            entityName: e.target.value
        });
        this.props.handleEntityChangeCallBack(e.target.value, this.state.index);
    };

    handleAmountChange = (e) => {
        this.setState({
            amount: e
        });
        this.props.handleAmountChangeCallBack(e, this.state.index);
    };

    handleCreditChange = (e) => {
        let isCredit;
        isCredit = e.target.value === 'CR';
        this.setState({
            credit: isCredit
        });
        this.props.handleCreditChangeCallBack(e.target.value, this.state.index);
    };

    entityListSelect() {
        let entityList = [];
        var i=0;
        this.props.entityList.forEach(entity => {
            entityList.push(<option value={entity} key={i++}>{entity}</option>)
        });
        return entityList;
    }

    render() {
        return (
            <View auto style={{
                flexDirection: 'row-inverse',
                padding: 0.2,
                alignItems: 'stretch',
                justifyContent: 'left'
            }}>
                <View column width="">
                    <label className="pt-label pt-inline" htmlFor="entity">
                        Entity
                        <div className="pt-select pt-inline">
                            <select ref="entity" defaultValue={this.state.entity} onChange={this.handleEntityChange} name="entity">
                                {this.entityListSelect()}
                            </select>
                        </div>
                    </label>
                </View>
                <View column width="290px">
                    <label className="pt-label pt-inline" htmlFor="amount">
                        Amount
                        <NumericInput ref="amount" className="pt-input" type="text" name="amount" value={this.state.amount} onValueChange={this.handleAmountChange}></NumericInput>
                    </label>
                </View>
                <View column width="80px">
                    <label className="pt-label pt-inline" htmlFor="doubleEntry">

                        <div className="pt-select pt-inline">
                            <select ref="doubleEntry" defaultValue={this.state.isCredit? "CR" : "DR"} name="doubleEntry" onChange={this.handleCreditChange}>
                                <option value="DR">DR</option>
                                <option value="CR">CR</option>
                            </select>
                        </div>
                    </label>
                </View>
            </View>
        );
    }
}

export default TransactionBasicRow;