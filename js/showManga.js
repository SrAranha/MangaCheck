var editJsonFile = require('edit-json-file');
var common = require('./common');
var main = require('../main');
var open = require('open');
var path = require('path');

/**
 * Show the desired manga infos, like name, chapters, link, score.
 * @param {string} toShow what is to show (LIST or manga name).
 * @param {boolean} nextOptions if need to show options after showing manga infos.
 * @param {boolean} openManga if want to show the option to open the manga on browser.
 */
exports.Show = function ShowManga(toShow, nextOptions, openManga) {
    if (toShow.toLocaleUpperCase() == "LIST") {
        const json = main.jsonManga;
        const jsonPath = path.join(__dirname, `../json/${json}`);
        let mangasJson = editJsonFile(jsonPath);
        let currentMangaNumber = 1;

        console.log('\n');
        // TODO: Apply ShowAmount to this option.
        for (var manga in mangasJson.read()) {
            let mangaList = common.GetManga(manga);
            console.log(common.colors.magenta, currentMangaNumber + ". " + mangaList.name + " =-=-=");
            console.log(common.colors.cyan, `${mangaList.data.lastSeen} / ${mangaList.data.latestChapter}`);
            console.log(common.colors.magenta, 'Status: ', mangaList.data.status);
            console.log(common.colors.yellow, 'Personal Score: ', mangaList.data.personalScore);
            currentMangaNumber++;
        }
        console.log('\n');
        common.WhatNow();
    }
    else if (toShow.toLocaleUpperCase() != "LIST") {
        const mangaData = common.GetManga(toShow);
        
        if (mangaData.isManga) {
            console.log('\n');
            console.log(common.colors.magenta, mangaData.name);
            console.log(common.colors.cyan, `${mangaData.data.lastSeen} / ${mangaData.data.latestChapter}`);
            console.log(common.colors.magenta, 'Status: ', mangaData.data.status);
            console.log(common.colors.yellow, 'Personal Score: ', mangaData.data.personalScore);
            console.log(common.colors.green, 'Link=> ', mangaData.data.link);
            console.log('\n');   
        }
        if (nextOptions && mangaData.isManga) {
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
    else if (nextOptions)
    {
        common.WhatNow();
    }
}