/**
 * This represents an entity of the double entry system
 *
 */
class Entity {
    constructor(entityName, entityType, defaultCurrency) {
        this._entityName = entityName;
        this._entityType = entityType;
        this._defaultCurrency = defaultCurrency;
    }

    getTransaction() {
        return {
            entityName : this._entityName,
            entityType : this._entityType,
            defaultCurrency : this._defaultCurrency
        }
    }


    get entityName() {
        return this._entityName;
    }

    set entityName(value) {
        this._entityName = value;
    }

    get entityType() {
        return this._entityType;
    }

    set entityType(value) {
        this._entityType = value;
    }

    get defaultCurrency() {
        return this._defaultCurrency;
    }

    set defaultCurrency(value) {
        this._defaultCurrency = value;
    }
}

export default Entity;