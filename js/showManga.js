var common = require('./common');
var open = require('open');

/**
 * Show the desired manga infos, like name, chapters, link, score.
 * @param {string} manga name of the manga.
 * @param {boolean} nextOptions if need to show options after showing manga infos.
 * @param {boolean} openManga if want to show the option to open the manga on browser.
 */
exports.Show = function ShowManga(manga, nextOptions, openManga) {
    const mangaData = common.GetManga(manga);

    if (mangaData.isManga) {
        console.log('\n');
        console.log(common.colors.magenta, mangaData.name);
        console.log(common.colors.cyan, `${mangaData.data.lastSeen} / ${mangaData.data.latestChapter}`);
        console.log(common.colors.magenta, 'Status: ', mangaData.data.status);
        console.log(common.colors.yellow, 'Personal Score: ', mangaData.data.personalScore);
        console.log(common.colors.green, 'Link=> ', mangaData.data.link);
        console.log('\n');   
    }
    if (nextOptions) {
        if (openManga) {
            common.rl.question(`${common.colors.cyan}You want to OPEN this manga, or see the other OPTIONS?\n`, function(option) {
                option = option.toLocaleUpperCase();
                if (option == "OPEN") {
                    open(mangaData.data.link);
                    console.log(common.colors.magenta, `Opening ${mangaData.name} on browser.`);
                    common.WhatNow();
                }
                else common.WhatNow();
            });
        }
        else common.WhatNow();
    }
}