/*
 * Copyright (c) 2018 SLAppForge Lanka Private Ltd. (https://www.slappforge.com). All Rights Reserved.
 *
 * SLAppForge PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import axios from "axios";

/**
 * The service is responsible for handling transaction inserts, reads, updates and deletes
 *
 * @author Malith Jayaweera
 */
class TransactionService {

    constructor(){
        this.baseURL = localStorage.getItem('REACT_APP_API') || process.env.REACT_APP_API_HOST;
    }

    setUrl(url) {
        this.baseURL = url;
    }

    getUrl() {
        return this.baseURL;
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

    createTransaction(transactions, handleSuccess, handleError) {
        let transactionsToCommit = [];
        transactions.forEach(transaction => {
            transactionsToCommit.push(transaction.getTransaction());
        });

        let url = this.baseURL + "/addTransaction";
        console.log(url);
        console.log(transactionsToCommit);
        return TransactionService.post(url, transactionsToCommit)
            .then(response => handleSuccess(response))
            .then(data => {
                if(!data.ERROR) {
                    return data;
                } else {
                    return null;
                }
            })
            .catch(error => handleError(error));
    }

    getEntity(handleRetrievedEntities, handleError) {
        let url = this.baseURL + "/getEntityList";
        return this.get(url)
            .then(response => handleRetrievedEntities(response))
            .catch(error => {
                handleError(error);
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

    createEntity(entityName, defaultCurrency, entityType, success, failure) {
        let entityObject = {entity: entityName, currency: defaultCurrency, entityType: entityType};
        let url = this.baseURL + "/createEntity";
        return TransactionService.post(url, entityObject)
            .then(response => success(response))
            .then(data => {
                console.log(data);
                if(!data.ERROR) {
                    return data;
                } else {
                    return null;
                }
            })
            .catch(error => failure(error));
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