/**
 * This represents a transaction of the double entry system
 *
 */
class Transaction {
    constructor(date, entityName, checkNo, voucherNo, notes, reconcile="1", amount, isCredit, trId, setId) {
        this.date = date;
        this.entityName = entityName;
        this.checkNo = checkNo;
        this.voucherNo = voucherNo;
        this.notes = notes;
        this.reconcile = reconcile;
        this.amount = amount;
        this.trId = trId;
        this.isCredit = isCredit;
        this.setId = setId;
    }

    getTransaction() {
        return {
            date: this.date,
            checkNo: this.checkNo,
            voucherNo: this.voucherNo,
            notes: this.notes,
            amount: this.amount,
            isCredit: this.isCredit,
            entityName: this.entityName,
            trId: this.trId,
            reconcile: this.reconcile,
            setId: this.setId
        }
    }

    getTransactionDate() {
        return this.date;
    }

    getTransactionCheckNo() {
        return this.checkNo;
    }

    getTransactionVoucherNo() {
        return this.voucherNo;
    }

    getNotes() {
        return this.notes;
    }

    getAmount() {
        return this.amount;
    }
}

export default Transaction;