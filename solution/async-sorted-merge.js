"use strict";

module.exports = (logSources, printer, minHeap) => {
  return new Promise(async (resolve, reject) => {
    if (!logSources || logSources.length === 0) {
      reject("No valid sources");
      return;
    }

    /**
     * As this is an async operation I will wraped in a try/catch just to make
     * sure that if something fails there a correc way to log or manage the error.
     */
    try {
      /**
       * By using promiseAll, all the operations will be executed concurrently
       * without blocking each other by waiting for each source to be fetch.
       */
      await Promise.all(
        logSources.map(async (source, index) => {
          const currentLog = await source.popAsync();
          if (currentLog) {
            minHeap.push({ log: currentLog, index });
          }
        })
      );

      /**
       * This will be very similar to the logic created in the sync
       * version but for this one we will need to wait for each entrie
       * to be fetch.
       */
      while (!minHeap.isEmpty()) {
        const { log, index } = minHeap.pop();
        printer.print(log);

        const nextLog = await logSources[index].popAsync();
        if (nextLog) {
          minHeap.push({ log: nextLog, index });
        }
      }
    } catch (error) {
      reject(`There was an error: ${JSON.stringify(error)}`);
    }

    printer.done();

    resolve(console.log("Async sort complete."));
  });
};
