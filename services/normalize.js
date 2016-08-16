'use strict';
var R = require('ramda');

/**
 * Created by Nick Podolsky [nick_podolsky@mail.ru]
 */

// Returns filtered and sorted array of keys used in list
let _getAllowedKeys = R.pipe(
    R.map( R.pipe(R.fromPairs, R.keys), R.__),
    R.append('1'),                                                      // append mandatory start index
    R.flatten,
    R.uniq,
    R.map((key)=>parseInt(key)),                                        // on this stage keys are strings - transform them to int
    R.sort((a,b)=>a-b)
);


// Iterator function - returns a row complemented with missing keys
let _complementRow = (allowedKeys, row) => {

    if(row.length === allowedKeys.length)                               // return unprocessed row if it has not missed parts
        return [allowedKeys, row];

    let dictionary = R.fromPairs(row);                                  // transform to "key: value" object for simple checks
    let itemValue = 0;
    let complementedRow = R.map(
        (key)=>{
            if(!R.isNil(dictionary[key]))                               // if item with such key already exist in original row - use its value
                itemValue = dictionary[key];
            return [key, itemValue];
        },
        allowedKeys);

    return [allowedKeys, complementedRow];
};

// Public method - applies normalisation to list
let normalize = (list) => {
    let allowedKeys = _getAllowedKeys(list);
    return  R.mapAccum(_complementRow, allowedKeys, list)[1];           // return second item, because accumulator goes first
};

module.exports = {
    normalize
};
