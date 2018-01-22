import axios from "axios";

class TransactionService {

    constructor(){
        this.baseURL = "https://y3atczx175.execute-api.us-east-1.amazonaws.com/Prod";
        this.timeout = 1000;
    }

    get(url = this.baseURL, params = {}) {
        return axios.get(url, params)
    }

    post(url, params = {}) {
        return axios.post(url, params)
    }

    createTransactionWithCurrencyDifference(transactions, conversions) {
        let transactionsToCommit = [];
        transactions.forEach(transaction => {
            transactionsToCommit.push(transaction.getTransaction());
        });

        let postObject = {
            transactions : transactionsToCommit,
            conversionDetails : conversions
        };

        let url = this.baseURL + "/createTransactionWithCurrencyDifference";
        return this.post(url, postObject)
            .then(response => response.data)
            .then(data => {
                if(!data.ERROR) {
                    return data;
                } else {
                    return null;
                }
            })
    }

    updateTransaction(transactions) {
        let url = this.baseURL + "/updateTransaction";
        return this.post(url, transactions)
            .then(response => response.data)
            .then(data => {
                if(!data.ERROR) {
                    return data;
                } else {
                    return null;
                }
            })
    };

    deleteTransaction(setId) {
        let postObject = {setId: setId};
        let url = this.baseURL + "/deleteTransaction";
        return this.post(url, postObject)
            .then(response => response.data)
            .then(data => {
                if(!data.ERROR) {
                    return data;
                } else {
                    return null;
                }
            })
    }

    createTransaction(transactions) {
        let transactionsToCommit = [];
        transactions.forEach(transaction => {
            transactionsToCommit.push(transaction.getTransaction());
        });

        var url = this.baseURL + "/addTransaction";
        return this.post(url, transactionsToCommit)
            .then(response => response.data)
            .then(data => {
                if(!data.ERROR) {
                    return data;
                } else {
                    return null;
                }
            })
    }

    getEntity(handleRetrievedEntities) {
        var url = this.baseURL + "/getEntityList";
        return this.get(url)
            .then(response => handleRetrievedEntities(response))
            .catch(response => {
                console.log(response);
            })
    }

    getTransactions(entity, page, pageSize, sorted, filtered, month, year, handleRetrievedTransactions) {
        let url = this.baseURL + "/getTransactionList";
        let postObject = {
            entity: entity,
            page: page,
            pageSize: pageSize,
            sorted: sorted,
            filtered: filtered,
            month: month,
            year: year
        };

        return this.post(url, postObject)
            .then(response => handleRetrievedTransactions(response))
            .catch(response => console.log(response));
    }

    getTransactionObject(transactionId, handleTransaction) {
        let url = this.baseURL + "/getTransactionById";
        let params = {params: {id: transactionId}};
        return this.get(url, params)
            .then(response => handleTransaction(response))
            .catch(response => console.log(response));
    }

    createEntity(entityName, defaultCurrency, entityType) {
        var entityObject = {entity: entityName, currency: defaultCurrency, entityType: entityType};
        var url = this.baseURL + "/createEntity";
        return this.post(url, entityObject)
            .then(response => response.data)
            .then(data => {
                console.log(data);
                if(!data.ERROR) {
                    return data;
                } else {
                    return null;
                }
            });
    }
}

const transactionService = new TransactionService();
export default transactionService;