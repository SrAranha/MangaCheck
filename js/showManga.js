var editJsonFile = require('edit-json-file');
var common = require('./common');
var main = require('../main');
var path = require('path');

exports.Show = function ShowManga(manga) {
    manga.toLocaleUpperCase();
    const jsonPath = path.join(__dirname, `../json/${main.jsonManga}`);
    var jsonFile = editJsonFile(jsonPath);
    let mangaData;
    var mangaName;
    for (const name in jsonFile.read()) {
        if (name.toLocaleUpperCase() == manga) {
            mangaData = jsonFile.get(`${name}`);
            mangaName = name;
        }
    }
    if (!mangaData) {
        console.log(common.colors.red, "Can't find this manga.");
    }
    else {
        console.log('\n');
        console.log(common.colors.magenta, mangaName);
        console.log(common.colors.cyan, `${mangaData.lastSeen} / ${mangaData.latestChapter}`);
        console.log(common.colors.yellow, 'Personal Score: ', mangaData.personalScore);
        console.log(common.colors.green, 'Link=> ', mangaData.link);
        console.log('\n');
    }
    common.WhatNow('show');
}