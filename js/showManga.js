var common = require('./common');

/**
 * Show the desired manga infos, like name, chapters, link, score.
 * @param {string} manga name of the manga.
 * @param {boolean} nextOptions if need to show options after showing manga infos.
 */
exports.Show = function ShowManga(manga, nextOptions) {
    const mangaData = common.GetManga(manga);

    if (mangaData.isManga) {
        console.log('\n');
        console.log(common.colors.magenta, mangaData.name);
        console.log(common.colors.cyan, `${mangaData.data.lastSeen} / ${mangaData.data.latestChapter}`);
        console.log(common.colors.yellow, 'Personal Score: ', mangaData.data.personalScore);
        console.log(common.colors.green, 'Link=> ', mangaData.data.link);
        console.log('\n');   
    }
    if (nextOptions) {
        common.WhatNow();
    }
}