var editJsonFile = require('edit-json-file');
var common = require('./common');
var main = require('../main');
var path = require('path');

/**
 * Show the desired manga infos, like name, chapters, link, score.
 * @param {string} manga name of the manga.
 */
exports.Show = function ShowManga(manga) {
    const mangaData = common.GetManga(manga);

    console.log('\n');
    console.log(common.colors.magenta, mangaData.name);
    console.log(common.colors.cyan, `${mangaData.data.lastSeen} / ${mangaData.data.latestChapter}`);
    console.log(common.colors.yellow, 'Personal Score: ', mangaData.data.personalScore);
    console.log(common.colors.green, 'Link=> ', mangaData.data.link);
    console.log('\n');

    common.WhatNow('show');
}