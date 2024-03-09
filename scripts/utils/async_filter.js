class AsyncFilter {
    constructor(data, predicate) {
        this.data = data;
        this.predicate = predicate;
    }

    async filter(interval, timeToFreezeImMs) {
        const filtered = [];
        const _interval = interval ? interval : 100;
        const _timeToFreeze = timeToFreezeImMs ? timeToFreezeImMs : 100;
        const wait = async _ => {
            return new Promise(resovle => {
                setTimeout(resovle, _timeToFreeze);
            });
        };
        var index = this.data.length;
        while (index--) {
            if (!(index % _interval)) {
                await wait();
            }
            (await this.predicate(this.data[index])) ? filtered.push(this.data[index]) : undefined;
        }
        return filtered.reverse();
    }
}

// (async function test() {
//     const arrayToFilter = Array.from({ length: 10 }, () => {
//         Math.floor(Math.random() * 40);
//     });
//     const filterObject = new AsyncFilter(arrayToFilter, elem => elem < 20);
//     const start = performance.now();
//     const filtered = await filterObject.filter(1000000);
//     const end = performance.now();
//     console.log(`performance time - ${end - start}`);
// })();
