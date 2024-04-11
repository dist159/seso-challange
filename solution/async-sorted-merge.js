"use strict";

/**
 *
 * By Diego Salazar
 *
 * Following a completely redesigned approach and thinking in different ways of
 * improving time performance I concluded that a parallel execution had to be
 * integrated. With that, I had two alternatives using worker threads of Node.js
 * or the RxJs library that I already had some experience with in the past,
 * especially with streams, with some minor research and going back to the
 * RxJS documentation I found a better way to handle all processes in
 * parallel making the time execution way less than with the Min-Heap.
 * This is possible by the use of observables that allow to handle the
 * data in streams. and then process them simultaneously.
 */

const { Observable, merge } = require("rxjs");
const { concatMap, toArray, map } = require("rxjs/operators");

module.exports = (logSources, printer) => {
  /** This will return an array of observables with all of the logs fetched
   * by each source that were loaded all in parallel  */
  return new Promise((resolve, reject) => {
    const observbles = logSources.map((source) =>
      logSourceToObservable(source)
    );

    /** This will merge all the observables into a single stream, but not in
     * order this is why I need to sort them by date after all of them are
     * fetched. Then it’s necessary to flattening the arrays of logs and to
     * convert it to a single stream, this is done one log at a time  */
    merge(...observbles)
      .pipe(
        toArray(),
        map((logs) => logs.sort((a, b) => a.date - b.date)),
        concatMap((log) => log)
      )
      /** Print one by one until there are no more in the stream */
      .subscribe({
        next: (log) => printer.print(log),
        error: (err) => {
          console.error(`There was an error: ${err}`);
          reject(err);
        },
        complete: () => {
          printer.done();
          resolve();
        },
      });
  });
};

/** This will fetch all the logs from each source until there are no more logs */
function logSourceToObservable(logSource) {
  return new Observable((obs) => {
    const fetchNext = async () => {
      const log = await logSource.popAsync();
      /**  Continue fetching the logs until the logsource has no more logs **/
      if (log) {
        obs.next(log);
        /** This will make sure to not block the main thread by forcing
         *  the process to be an async operation even though the time is
         * set to 0 the event loop will send it to be executed outside of
         * the main thread
         */
        setTimeout(fetchNext, 0);
      } else {
        obs.complete();
      }
    };
    fetchNext();
  });
}
