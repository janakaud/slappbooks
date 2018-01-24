import React from 'react';
import TransactionBasicRow from '../TransactionRowView/TransactionBasicRow';

/**
 * The class generates a body for the UpdateView component. After data has been retrieved the body will be updated to
 * reflect the data
 *
 * @author Malith Jayaweera
 */
class UpdateViewBody extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            updateTransactions : this.props.updateTransactions,
            entityList: this.props.entityList,
            loaded: this.props.loaded
        }
    }

    handleEntityChange = (entity, index) => {
        this.props.handleEntityChange(entity, index);
    };

    handleAmountChange = (amount, index) => {
        this.props.handleAmountChange(amount, index);
    };

    handleCreditChange = (credit, index) => {
        this.props.handleCreditChange(credit, index);
    };

    render(){
        let content = [];
        this.props.updateTransactions.forEach( (transaction, index) => {
            let isCredit;
            if((transaction.amount).toString().startsWith("(") && transaction.amount.toString().endsWith(")")) transaction.amount = transaction.amount.slice(1, transaction.amount.length-1); isCredit= transaction.isCredit;
            content.push( <TransactionBasicRow  handleEntityChangeCallBack={(event) => this.handleEntityChange(event, index)}
                                                handleAmountChangeCallBack={(event) => this.handleAmountChange(event, index)}
                                                handleCreditChangeCallBack={(event) => this.handleCreditChange(event, index)} key={index} entityList={this.state.entityList} entity={transaction.entityName} amount={transaction.amount} isCredit={isCredit}/>);
        });
        return(
            <div>
                {content}
            </div>
        );

    }

}

export default UpdateViewBody;