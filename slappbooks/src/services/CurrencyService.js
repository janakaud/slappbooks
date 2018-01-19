import axios from "axios";

class CurrencyService {
    constructor() {
        this.baseURL = "https://free.currencyconverterapi.com/api/v5";
        this.timeout = 1000;
    }

    get(url = this.baseURL, params = {}) {
        return axios.get(url, params)
    }

    post(url, params = {}) {
        return axios.post(url, params)
    }

    getExchangeRate(fromCurrency, toCurrency, handleCurrency) {
        var url = this.baseURL + "/convert?q=" + fromCurrency + "_" + toCurrency + "&compact=y"
        return this.get(url)
            .then(response => handleCurrency(response))
            .catch(response => console.log(response));
    }
}

const currencyService = new CurrencyService()
export default currencyService;