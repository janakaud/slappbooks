/**
 * This represents a Currency Conversion object
 *
 */
class CurrencyConversion {
    constructor(toCurrency, fromCurrency, conversionRate) {
        this._toCurrency = toCurrency;
        this._fromCurrency = fromCurrency;
        this._conversionRate = conversionRate;
    }


    get toCurrency() {
        return this._toCurrency;
    }

    set toCurrency(value) {
        this._toCurrency = value;
    }

    get fromCurrency() {
        return this._fromCurrency;
    }

    set fromCurrency(value) {
        this._fromCurrency = value;
    }

    get conversionRate() {
        return this._conversionRate;
    }

    set conversionRate(value) {
        this._conversionRate = value;
    }
}

export default CurrencyConversion;