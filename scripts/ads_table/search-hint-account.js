class SearchHintAccount extends SearchHint {
    async matchData() {
        const value = this.inputToAutoFill.value;
        if (/[А-яA-z]+\d{0,100}/g.test(value)) {
            const filterObject = new AsyncFilter(this.dataToSearch, account => {
                return String(account).toLowerCase().startsWith(String(value).toLowerCase());
            });
            return await filterObject.filter(100, 10, { maxLength: 13 });
        } else {
            const filterObject = new AsyncFilter(this.dataToSearch, account => {
                return account.match(/\d+/g)[0].startsWith(value);
            });
            return filterObject.filter(100, 10, { maxLength: 13 });
        }
    }

    highlightString(string, value) {
        const regex = new RegExp(`(${value.replace("+", "\\+").replace(/([^+\\])/g, "$1\\s*")})`, "i");
        return string.replace(regex, '<span class="search-hint__match-highlight">$1</span>');
    }
}

customElements.define("search-hint-account", SearchHintAccount);
