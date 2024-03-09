class SortInstance {
    constructor(name, sortObject, reversed) {
        this.name = name;
        this.sortObject = sortObject;
        this.reversed = reversed;
    }

    async sort(data) {
        const sorted = await this.sortObject.sort(data);
        console.log(`reversed - ${this.reversed}`);
        return this.reversed ? sorted.reverse() : sorted;
    }
}

class SortingQuery {
    constructor() {
        this.sortingInstances = [];
    }

    getSortInstance(name) {
        return this.sortingInstances.find(el => el.name == name);
    }

    updateQuery(newSortingInstance) {
        const lastSortStrategyIndex = this.sortingInstances.findIndex(sortingInstance => {
            return sortingInstance.name == newSortingInstance.name;
        });
        if (lastSortStrategyIndex) {
            this.sortingInstances.splice(lastSortStrategyIndex, 1);
        }
        this.sortingInstances.push(newSortingInstance);
    }

    async sort(data) {
        return new CancellablePromise(async (resolve, _) => {
            let sortedData = data;
            for (let i = 0; i < this.sortingInstances.length; i++) {
                sortedData = await this.sortingInstances[i].sort(sortedData);
            }
            resolve(sortedData);
        });
    }
}
