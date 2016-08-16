'use strict';

let {normalize} = requireCorrespondingModule(__filename);


// Ticket description:
//
//     We measure something, output is array of arrays of pairs
//     [
//     [[x1,y1], [x2, y2], [x3, y3], ...],
//         [[a1,b1], [a2, b2], [a3, b3], ...]
// ...
// ]
// all values are normal numbers (from set 1,2,3,4,5,6,...)
//
// We know that we lack some of data
//
//     [
//     [[missing], [x2, y2], [x3, y3], ...],
//         [[a1,b1],   [missing], [a3, b3], ...]
// ...
// ]
//
// We want to transform (normalize) these missing data into
//
//     [
//     [[a1,0],  [x2, y2], [x3, y3], ...],
//         [[a1,b1], [x2, b1], [a3, b3], ...]
// ...
// ]
//
// There will be always 2 coordinates (only pairs)
//
// Notes:
//     Investigate attached package. You will know more after reading attached tests (test/services/normalize.spec.js).
//     Your new function should pass attached tests.
//     Read README.md.
//     If you think some test should be added do it :).
// Don't create new codebase, use attached.
//
// Style wishes:
//     If possible should be written in functional manner, the best would be using ramdajs.
//     Code should be clean and understandable as possible.
//     Code should pass attached eslint file.
//
// Technical info:
//      Test framework used: mocha, sinon, chai, sinon-chai
//      Javascript Version: ECMAScript 6


describe('normalize', () => {

    it('there should be always data with 1st coordinate equal 1, if second coordinate missing should be 0', () => {

        let input1 = [
                [[2, 12]]
            ],
            output1 = [
                [[1, 0], [2, 12]]
            ],

            input2 = [
                [[1, 8], [2, 10]],
                [[2, 11]]
            ],
            output2 = [
                [[1, 8], [2, 10]],
                [[1, 0], [2, 11]]
            ];

        expect(normalize(input1)).to.be.deep.equal(output1);
        expect(normalize(input2)).to.be.deep.equal(output2);
    });

    it(`should be able to normalize missing data according to previous data`, () => {

        let input = [
                [[1, 6], [2, 6], [3, 6]],
                [[1, 3], [3, 10]]
            ],
            output = [
                [[1, 6], [2, 6], [3, 6]],
                [[1, 3], [2, 3], [3, 10]]
            ];

        expect(normalize(input)).to.be.deep.equal(output);
    });


    it(`first coordinates should be complement among all rows and not more (not all normal numbers 1,2,3,4,5 ... only subset of it)`, () => {

        let input = [
                [[2, 3], [4, 7], [6, 100]],
                [[1, 1000], [5, 12], [11, 10]]
            ],
            output = [
                [[1, 0], [2, 3], [4, 7], [5, 7], [6, 100], [11, 100]],
                [[1, 1000], [2, 1000], [4, 1000], [5, 12], [6, 12], [11, 10]]
            ];

        expect(normalize(input)).to.be.deep.equal(output);
    });


    it(`should work for any number of rows and columns`, () => {

        let input = [
                [[2, 3], [4, 7], [6, 100]],
                [[1, 1000], [5, 12], [11, 10]],
                [[6, 13]]
            ],
            output = [
                [[1, 0], [2, 3], [4, 7], [5, 7], [6, 100], [11, 100]],
                [[1, 1000], [2, 1000], [4, 1000], [5, 12], [6, 12], [11, 10]],
                [[1, 0], [2, 0], [4, 0], [5, 0], [6, 13], [11, 13]]
            ];

        expect(normalize(input)).to.be.deep.equal(output);
    });


});