<img align="left" width="100px" height="100px" src="/assets/seso-eng-logo.png">

# Seso Engineering | Challenge: Log Sorting

By Diego Salazar

<br>

## Update:

Following a completely redesigned approach and thinking in different ways of
improving time performance I concluded that a parallel execution had to be
integrated. With that, I had two alternatives using worker threads of Node.js
or the RxJs library that I already had some experience with in the past,
especially with streams, with some minor research and going back to the
RxJS documentation I found a better way to handle all processes in
parallel making the time execution way less than with the Min-Heap.
This is possible by the use of observables that allow to handle the
data in streams. and then process them simultaneously.

## Solution proposal

After evaluating multiple possible solutions and taking into account the time and space constraints. The best approach I consider for this would be using a Min-Heap, my main criteria for using this is based on the need for using a data structure that can keep all the values sorted from minimum to greater.

When storing each item in the heap is important to also store the index as we can deduce from what source take the next entry log as they are sorted chronologically

## Time complexity

Keeping in mind that I’m using a Min-Heap and for every push and pop sort operation, the time complexity is O(log(m)) where m would be the number of elements in the heap. Additionally, every log is printed and added once to the Heap which would end with a time complexity of O(n)

If we combine both of them this will give an overall time complexity of O(nlog(m)) where m is the number of log sources and n is the total of log entries.

## Space Complexity

The only element that is taking more space is the heap structure which can require space for each log entry. With this, the space complexity would be O(n) where n is the total amount of log entries

## Instructions

We have a number of [**log sources**](https://github.com/sesolabor/coding-challenge/blob/master/lib/log-source.js). Each log source contains N log entries. Each entry is a javascript object with a timestamp and message. We don't know the number of log entries each source contains - however - we do know that the entries within each source are sorted 🕒 **chronologically** 🕒.

### The Objectives:

1. **_Drain all of the log sources_** for both the synchronous and asynchronous solutions.
   - [Synchronous](https://github.com/sesolabor/coding-challenge/blob/31313e303c53cebb96fa02f3aab473dd011e1d16/lib/log-source.js#L37)
   - [Asynchronous](https://github.com/sesolabor/coding-challenge/blob/31313e303c53cebb96fa02f3aab473dd011e1d16/lib/log-source.js#L45)
1. Print all of the entries, across all of the sources, in chronological order.
   - We don't need to store the log entries, just print them to stdout.
1. Do this _efficiently_. There are time and space complexities afoot!

We expect candidates to spend 1-3 hours on this exercise.

**We want to see you flex your CS muscles!!! Use the appropriate data structures to satisfy the time and space complexities inherent to the problem!!!**

## Pointers & Callouts

- We don't know how many logs each source contains. A source could contain millions of entries and be exabytes in size! In other words, reading the entirety of a log source into memory won't work well.
- Log sources could contain logs from last year, from yesterday, even from 100 years ago. We won't know the timeframe of a log source until we start looking.
- Consider what would happen when asked to merge 1 million log sources. Where might bottlenecks arise?

There are two parts of the challenge which you'll see when diving into things. You can get started by running `npm start`.

## Submitting

Create a GitHub repo and email your point of contact the link.

If - for whatever reason - you cannot create a GitHub repo for this challenge, it is also acceptable to 'zip' the directory and provide your submission as an email attachment.
