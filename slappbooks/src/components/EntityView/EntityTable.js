import React from "react";
// Import React Table
import ReactTable from "react-table";
import "react-table/react-table.css";
import styles from "../../main.css"
import transactionService from "../../services/TransactionService";
/*import {Button, Dialog} from "@blueprintjs/core"*/
import TransactionBasicRow from "../TransactionView/TransactionRowView/TransactionBasicRow";
import moment from 'moment';
import UpdateView from '../TransactionView/TransactionUpdateView/UpdateView'

/**
 * This represents a transaction of the double entry system
 * @author Malith Jayaweera
 */
class EntityTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.transactions,
            pages: 0,
            entityName: this.props.entityName,
            entityList: this.props.entityList,
            isOpen: false,
            loading: false,
            setId: '',
            clicked: false,
            updateTransactions: []
        };
    }

    onRowClick = (state, rowInfo, column, instance) => {
        return {
            onClick: e => {
                this.setState({
                    setId: rowInfo.row.setId,
                    clicked: true
                });
                this.toggleDialog();
                /*console.log('A Td Element was clicked!');
                console.log('it produced this event:', e);
                console.log('It was in this column:', column);
                console.log('It was in this row:', rowInfo);
                console.log('It was in this table instance:', instance);
                console.log(rowInfo.row.setId);*/
            }
        }
    };

    toggleDialog = () => this.setState({ isOpen: !this.state.isOpen });

    handleClose = () => {
        this.toggleDialog();
        this.setState({
            clicked: false
        })
    };

    generateDialogView = () => {
        if(this.state.isOpen && this.state.clicked) {
            transactionService.getTransactionObject(this.state.setId, (response) => {
                let transactions = response.data;
                this.setState({
                    updateTransactions: transactions,
                    clicked: false
                });
            });
        }
        return this.getContent();
    };

    handleEntityChange = (entity, index) => {
        console.log(entity);
    };

    handleAmountChange = (amount, index) => {
        console.log(amount);
    };

    handleCreditChange = (credit, index) => {
        console.log(credit);
    };

    getContent = () => {
        let content = [];
        this.state.updateTransactions.forEach( (transaction, index) => {
            let isCredit;
            if((transaction.amount).toString().startsWith("(") && transaction.amount.toString().endsWith(")")) transaction.amount = transaction.amount.slice(1, transaction.amount.length-1); isCredit= transaction.isCredit;
            content.push( <TransactionBasicRow  handleEntityChangeCallBack={this.handleEntityChange}
                                              handleAmountChangeCallBack={this.handleAmountChange}
                                              handleCreditChangeCallBack={this.handleCreditChange} key={index} entityList={this.props.entityList} entity={transaction.entityName} amount={transaction.amount} isCredit={isCredit}/>);
        });
        return content;
    };

    clickCallBack = () => {
        this.setState({
            clicked: false
        })
    };

    render() {
        return (
            <div className={styles.visible}>
                {/*<Dialog
                    iconName="dollar"
                    hasBackdrop={false}
                    className={"pt-popover-content-sizing"}
                    isOpen={this.state.isOpen}
                    onClose={this.toggleDialog}
                    title="Transaction Snapshot"
                >
                    <div className="pt-dialog-body">
                        {this.generateDialogView()}
                    </div>
                    <div className="pt-dialog-footer">
                        <div className="pt-dialog-footer-actions">
                            <Button
                                className={"pt-intent-success"}
                                text="Update" />
                            <Button
                                className={"pt-button pt-intent-danger"}
                                onClick={this.toggleDialog}
                                text="Close"
                            />
                        </div>
                    </div>
                </Dialog>*/}
                <UpdateView handleCloseCallback={this.handleClose} clickCallback={this.clickCallBack} isOpen={this.state.isOpen} setId={this.state.setId} clicked={this.state.clicked} entityList={this.props.entityList}/>
                <div className="pt-card pt-elevation-3">
                    <h6 className="pt-icon">{this.state.entityName}</h6>
                    <ReactTable
                        data={this.state.data}
                        pages={this.state.pages}
                        columns={[
                            {
                                columns: [
                                    {
                                        Header: "Date",
                                        accessor: "date",
                                        maxWidth: 100
                                    },
                                    {
                                        Header: "Check No",
                                        accessor: "checkNo",
                                        maxWidth: 100
                                    },
                                    {
                                        Header: "Voucher No",
                                        accessor: "voucherNo",
                                        maxWidth: 100
                                    },
                                    {
                                        Header: "Notes",
                                        accessor: "notes"
                                    },
                                    {
                                        Header: "R",
                                        accessor: "reconcile",
                                        maxWidth: 40
                                    },
                                    {
                                        Header: 'Amount',
                                        maxWidth: 300,
                                        accessor: "amount"
                                    },
                                    {
                                        Header: "setId",
                                        accessor: "setId",
                                        show: false
                                    }
                                ]
                            }
                        ]}
                        getTrProps={this.onRowClick}
                        defaultPageSize={5}
                        className="-striped -highlight"
                        loading={this.state.loading}
                        showPagination={true}
                        showPaginationTop={false}
                        showPaginationBottom={true}
                        pageSizeOptions={[5, 10, 20, 25, 50, 100]}
                        manual
                        onFetchData={(state, instance) => {
                            this.setState({loading: true});
                            transactionService.getTransactions(this.state.entityName, state.page, state.pageSize, state.sorted, state.filtered, (res) => {
                                let values = res.data.rows;
                                values.forEach(key => {
                                    key.amount = key.isCredit ? "(" + parseFloat(key.amount) + ")" : parseFloat(key.amount);
                                    key.date = moment(key.date).format('YYYY-MM-DD');
                                });
                                this.setState({
                                    data: values,
                                    pages: res.data.pages,
                                    loading: false
                                })
                            });
                        }}
                    />
                </div>
            </div>
        );
    }

}

export default EntityTable;