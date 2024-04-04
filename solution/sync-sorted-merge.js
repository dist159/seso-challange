"use strict";

// Use a Min-Heap from the heap-js library
module.exports = (logSources, printer, minHeap) => {
  /**
   * After evaluating multiple possible solutions and taking into account
   * the time and space constraints. The best approach I consider for
   * this would be using a Min-Heap, my main criteria for using this
   * is based on the need for using a data structure that can keep all
   * the values sorted from minimum to greater.
   */

  if (!logSources || logSources.length) {
    return "No valid sources";
  }

  /** Firts populate the heap with the firts item of each of the sources */
  for (let index = 0; index < logSources.length; index++) {
    const currentLog = logSources[index].pop();
    if (currentLog) {
      /**
       * The index will store the source for the current log
       * that can be use later to know exaclty from where to obtain the log when
       * adding it to the Heap.
       */
      minHeap.push({ log: currentLog, index });
    }
  }

  /**
   * Go through each one of the logs that each source has,
   * this will print them in order by merging them based on the date
   */
  while (!minHeap.isEmpty()) {
    /** This return the earliest among the initial entries */
    const { log, index } = minHeap.pop();
    printer.print(log);

    /**
     * The next entrie will depend on the index store in the last pop entrie
     * this ensures that the item’s chronology is sorted, as it dictates the correct log to import,
     * otherwise it could print in disorder some of the logs
     */
    const nextLog = logSources[index].pop();
    if (nextLog) {
      /** If the next log date is earlier it will go to the top of the heap **/
      minHeap.push({ log: nextLog, index });
    }
  }

  printer.done();

  return console.log("Sync sort complete.");
};
