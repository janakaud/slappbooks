import React from 'react';
import {Button, Position, Tooltip} from '@blueprintjs/core';
import View from 'react-flexbox'
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

/**
 * This represents a full row of the transaction adder element
 *
 * @author Malith Jayaweera
 *
 */
import TransactionBasicRow from "./TransactionBasicRow";

class TransactionFullRow extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            entityList: this.props.entityList,
            startDate: moment(),
            amount: this.props.amount
        }
    }

    handleChange = (date) => {
        this.setState({
            startDate: date
        });
    };

    addFormSpace = () => {
        this.props.callbackIncrementor(1);
    };

    removeFormSpace = () => {
        this.props.callbackIncrementor(-1);
    };

    render() {
        return (<div>
            <View auto style={{
                flexDirection: 'row-inverse',
                padding: 0.2,
                alignItems: 'stretch',
                justifyContent: 'left'
            }}>
                <TransactionBasicRow handleEntityChangeCallBack={this.props.handleEntityChangeCallBack}
                                   handleAmountChangeCallBack={this.props.handleAmountChangeCallBack}
                                   handleCreditChangeCallBack={this.props.handleCreditChangeCallBack} amount={this.props.amount} key={0} entityList={this.props.entityList}/>
                <View column width="210px">
                    <DatePicker name={"date"} dateFormat="YYYY-MM-DD" placeholderText={"MM-DD-YYYY"} selected={this.state.startDate} className={"pt-input on-top pt-round pt-datepicker-footer"}
                                onChange={this.handleChange}
                    />;
                </View>
                <View column width="120px">
                    <View column width="110px">
                        <input className={"pt-input pt-round pt-fill"} type="text" placeholder="Notes" name="notes" />
                    </View>
                    <View column width="10px">
                    </View>
                </View>
                <View column width="120px">
                    <View column width="110px">
                        <input className={"pt-input pt-round pt-fill"} type="text" placeholder="Cheque No" name="cheque" />
                    </View>
                    <View column width="10px">
                    </View>
                </View>
                <View column width="40px">
                    <Tooltip content="Split transaction between multiple entities"
                             position={Position.RIGHT}>
                        <Button iconName="pt-icon-add" className="pt-intent-primary"
                                onClick={this.addFormSpace.bind(this)}/>
                    </Tooltip>
                </View>
                <View column width="40px">
                    <Tooltip content="Delete transaction entity"
                             position={Position.RIGHT}>
                        <Button iconName="pt-icon-delete" className="pt-intent-danger"
                                onClick={this.removeFormSpace.bind(this)}/>
                    </Tooltip>
                </View>
            </View>
        </div>)
    }
}

export default TransactionFullRow;