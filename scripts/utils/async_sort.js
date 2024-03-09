class SortStrategy {
    COMPARE_CRITERIA = 1;
    async sort(data) {}
}

class MergeSort extends SortStrategy {
    constructor(compareFunction) {
        super();
        this.compareFunction = compareFunction;
    }
    async sort(data) {
        if (data.length == 0 || data.length == 1) {
            return data;
        }

        const border = Math.floor(data.length / 2);
        const leftPart = await this.sort(data.slice(0, border));
        const rightPart = await this.sort(data.slice(border));

        let rightPartPointer = 0;
        let leftPartPointer = 0;
        let arrayPointer = 0;
        const resultArray = new Array(data.length);

        while (rightPartPointer < rightPart.length && leftPartPointer < leftPart.length) {
            const compareResult = this.compareFunction(
                leftPart[leftPartPointer][this.COMPARE_CRITERIA],
                rightPart[rightPartPointer][this.COMPARE_CRITERIA]
            );
            if (compareResult == -1 || compareResult == 0) {
                resultArray[arrayPointer] = leftPart[leftPartPointer];
                leftPartPointer++;
            } else if (compareResult == 1) {
                resultArray[arrayPointer] = rightPart[rightPartPointer];
                rightPartPointer++;
            }
            arrayPointer++;
        }

        while (rightPartPointer < rightPart.length) {
            resultArray[arrayPointer] = rightPart[rightPartPointer];
            rightPartPointer++;
            arrayPointer++;
        }
        while (leftPartPointer < leftPart.length) {
            resultArray[arrayPointer] = leftPart[leftPartPointer];
            leftPartPointer++;
            arrayPointer++;
        }
        return resultArray;
    }
}

class AsyncSort {
    constructor(mapFunction, compareFunction, { interval, timing, strategy } = { interval: null, timing: null, strategy: null }) {
        //compareFunction is optional if strategy is passed
        this.mapFunction = mapFunction;
        this.interval = interval;
        this.sleepTime = timing;
        this.sortingStrategy = strategy ? strategy : new MergeSort(compareFunction);
    }

    async schwartzConversion(data) {
        const conversedData = [];
        for (let i = 0; i < data.length; i++) {
            if (this.interval && !(i % this.interval)) {
                await new Promise(resolve => {
                    setTimeout(resolve, this.timing);
                });
            }
            conversedData.push([data[i], this.mapFunction(data[i])]);
        }
        console.log(conversedData);
        return conversedData;
    }

    reverseConversion(data) {
        return data.map(el => el[0]);
    }

    async sort(data) {
        const conversedData = await this.schwartzConversion(data);
        const sortedData = await this.sortingStrategy.sort(conversedData);
        console.log(sortedData);
        return this.reverseConversion(sortedData);
    }
}
