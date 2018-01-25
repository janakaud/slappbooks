import React from 'react';
import EntityTable from './EntityTable';

/**
 *  This represents the full entity view. The view will be generated using @EntityTable components
 *
 *  @author Malith Jayaweera
 */
class EntityTableView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactionList: this.props.transactions,
            entityList: this.props.entityList,
        };
        this.child = [];
    }

    refresh = () => {
        setTimeout( () => {
            this.child.forEach(child => {
            child.initialize();
            });
        }, 2000);

    };

    render() {
        let tableElements = [];
        for (let i = 0; i < this.props.entityList.length; i++) {
            let insertableTransactions = [];
            let entityName = this.props.entityList[i];
            //eslint-disable-next-line
            insertableTransactions.push(...this.props.transactions.filter(transaction => {
                return (transaction.entityName === entityName)
            }));
            tableElements.push(<EntityTable ref={instance => { this.child.push(instance); }} handleRefreshCallback={this.refresh} transactions={insertableTransactions} entityName={entityName} entityList={this.props.entityList} key={i}/>);
        }
        return(<div>{tableElements}</div>);
    }
}

export default EntityTableView;