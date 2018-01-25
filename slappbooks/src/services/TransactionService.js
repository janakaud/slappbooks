import axios from "axios";

/**
 * The service is responsible for handling transaction inserts, reads, updates and deletes
 *
 * @author Malith Jayaweera
 */
class TransactionService {

    constructor(){
        this.baseURL = process.env.REACT_APP_API_HOST;
    }

    get(url = this.baseURL, params = {}) {
        return axios.get(url, params)
    }

    static post(url, params = {}) {
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
        return TransactionService.post(url, postObject)
            .then(response => response.data)
            .then(data => {
                if(!data.ERROR) {
                    return data;
                } else {
                    return null;
                }
            });
    }

    updateTransaction(transactions) {
        let url = this.baseURL + "/updateTransaction";
        return TransactionService.post(url, transactions)
            .then(response => response.data)
            .then(data => {
                if(!data.ERROR) {
                    return data;
                } else {
                    return null;
                }
            });
    };

    deleteEntity(entityName) {
        let postObject = {entityName: entityName};
        let url = this.baseURL + "/deleteEntity";
        return TransactionService.post(url, postObject)
            .then(response => response.data)
            .then(data => {
                if(!data.ERROR) {
                    return data;
                } else {
                    return null;
                }
            });
    }

    deleteTransaction(setId) {
        let postObject = {setId: setId};
        let url = this.baseURL + "/deleteTransaction";
        return TransactionService.post(url, postObject)
            .then(response => response.data)
            .then(data => {
                if(!data.ERROR) {
                    return data;
                } else {
                    return null;
                }
            });
    }

    createTransaction(transactions) {
        let transactionsToCommit = [];
        transactions.forEach(transaction => {
            transactionsToCommit.push(transaction.getTransaction());
        });

        let url = this.baseURL + "/addTransaction";
        return TransactionService.post(url, transactionsToCommit)
            .then(response => response.data)
            .then(data => {
                if(!data.ERROR) {
                    return data;
                } else {
                    return null;
                }
            });
    }

    getEntity(handleRetrievedEntities) {
        let url = this.baseURL + "/getEntityList";
        return this.get(url)
            .then(response => handleRetrievedEntities(response))
            .catch(response => {
                console.log(response);
            });
    }

    getTransactions(entity, page, pageSize, sorted, filtered, month, year, handleRetrievedTransactions) {
        let url = this.baseURL + "/getMonthlyTransactionList";
       //  let url = this.baseURL + "/getTransactionList";
        let postObject = {
            entity: entity,
            page: page,
            pageSize: pageSize,
            sorted: sorted,
            filtered: filtered,
            month: month,
            year: year
        };

        return TransactionService.post(url, postObject)
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
        let entityObject = {entity: entityName, currency: defaultCurrency, entityType: entityType};
        let url = this.baseURL + "/createEntity";
        return TransactionService.post(url, entityObject)
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

    getTrialBalance(spotRate, handleReportResults) {
        let url = this.baseURL + "/getTrialBalance";
        let postObject = {spotRate: spotRate, defaultCurrency: process.env.REACT_APP_DEFAULT_CURRENCY};
        return TransactionService.post(url, postObject)
            .then(response => handleReportResults(response))
            .catch(response => console.log(response));
    }
}

const transactionService = new TransactionService();
export default transactionService;