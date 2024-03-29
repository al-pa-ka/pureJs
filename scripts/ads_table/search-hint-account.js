class SearchHintAccount extends SearchHint {
    matchData() {
        const value = this.inputToAutoFill.value;
        if (/[А-яA-z]+\d{0,100}/g.test(value)) {
            return Array.from(
                new Set(
                    this.dataToSearch.filter(account => {
                        return String(account).toLowerCase().startsWith(String(value).toLowerCase());
                    })
                )
            ).slice(0, 13);
        } else {
            return Array.from(
                new Set(
                    this.dataToSearch.filter(account => {
                        return account.match(/\d+/g)[0].startsWith(value);
                    })
                )
            ).slice(0, 13);
        }
    }

    divideOnParts(row, value) {
        value = value.toLowerCase();
        const lowerCasedRow = row.toLowerCase();
        let matchPart = "";
        if (/[А-яA-z]+\d{0,100}/g.test(value)) {
            matchPart = lowerCasedRow.match(new RegExp(value, "g"))[0];
        } else {
            matchPart = lowerCasedRow.match(new RegExp("[А-яA-z]+" + value, "g"))[0];
        }

        return [row.slice(0, matchPart.length), row.slice(matchPart.length)];
    }
}

customElements.define("search-hint-account", SearchHintAccount);
