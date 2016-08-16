'use strict';

let path = require('path');

global.requireCorrespondingModule = (testFilename) => {

    let modulePath = testFilename.replace('.spec', '');
    modulePath = modulePath
        .replace('test/', '')
        .replace('.js', '');

    return require(path.resolve(modulePath));
};

global.correspondingModuleDirPath = (testFileDir) => {

    let moduleDirPath = testFileDir.replace('test/', '');

    return moduleDirPath;
};