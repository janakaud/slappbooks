/*
 * Copyright (c) 2018 SLAppForge Lanka Private Ltd. (https://www.slappforge.com). All Rights Reserved.
 *
 * SLAppForge PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

import axios from "axios";

/**
 * The service is responsible for obtaining updated exchange rates
 *
 * @author Malith Jayaweera
 */
class CurrencyService {
    constructor() {
        this.baseURL = "https://free.currencyconverterapi.com/api/v5";
    }

    get(url = this.baseURL, params = {}) {
        return axios.get(url, params)
    }


    getExchangeRate(fromCurrency, toCurrency, handleCurrency) {
        let url = this.baseURL + "/convert?q=" + fromCurrency + "_" + toCurrency + "&compact=y";
        return this.get(url)
            .then(response => handleCurrency(response))
            .catch(response => console.log(response));
    }
}

const currencyService = new CurrencyService();
export default currencyService;