/*
 * Copyright (c) 2018 SLAppForge Lanka Private Ltd. (https://www.slappforge.com). All Rights Reserved.
 *
 * SLAppForge PROPRIETARY/CONFIDENTIAL. Use is subject to license terms.
 */

/**
 * This represents a Currency Conversion object
 *
 * @author Malith Jayaweera
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