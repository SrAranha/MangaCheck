var editJsonFile = require('edit-json-file');
var common = require('./common');
var open = require('open');
var path = require('path');

let currentMangaNumber = 1;

/**
 * Show the desired manga infos, like name, chapters, link, score.
 * @param {string} toShow what is to show (LIST or manga name).
 * @param {boolean} nextOptions if need to show options after showing manga infos.
 * @param {boolean} openManga if want to show the option to open the manga on browser.
*/
exports.Show = function ShowManga(toShow, nextOptions, openManga) {
    const configPath = path.join(__dirname, './config.json');
    let configFile = editJsonFile(configPath);
    const json = configFile.get('ChangeList.value');
    const mangasPath = path.join(__dirname, `../json/${json}`);
    let mangasJson = editJsonFile(mangasPath);
    if (toShow.toLocaleUpperCase() == "LIST") {
        console.log('\n');
        const showAmount = configFile.get('ShowAmount.value');
        if (showAmount == "ALL") {
            for (var manga in mangasJson.read()) {
                let mangaList = common.GetManga(manga);
                ListManga(mangaList);
            }
            console.log('\n');
            common.WhatNow();
        }
        else if (showAmount != "ALL") {
            var mangas = [];
            for (var manga in mangasJson.read()) {
                mangas.push(manga);
            }
            for (let index = 0; index < showAmount; index++) {
                let mangaList = common.GetManga(mangas[index]);
                ListManga(mangaList);
            }
            console.log('\n');
            ListOptions(showAmount, mangas);
        }
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
function ResetCurrentMangaNumber() {
    currentMangaNumber = 1;
}
function ListOptions(showAmount, mangas) {
    common.rl.question(common.colors.green + "PREVIOUS | NEXT | BACK\n", function(option) {
        switch (option.toLocaleUpperCase()) {
            case 'PREVIOUS':
                if (currentMangaNumber <= showAmount + 1) {
                    console.log(common.colors.red, "Already on first page!");
                    ResetCurrentMangaNumber();
                }
                else currentMangaNumber -= showAmount*2;
                ContinueList(showAmount, mangas);
            break;

            case 'NEXT':
                ContinueList(showAmount, mangas);
            break;

            case 'BACK':
                common.WhatNow();
                ResetCurrentMangaNumber();
            break;
        
            default:
                console.log("Not an option.");
            break;
        }
    });
}
function ContinueList(showAmount, mangas) {
    for (let index = 0; index < showAmount; index++) {
        if (index + currentMangaNumber <= mangas.length) {
            let mangaList = common.GetManga(mangas[index + currentMangaNumber]);
            ListManga(mangaList);
        }
        else {
            console.log(common.colors.red, "END OF LIST");
            ResetCurrentMangaNumber();
            break;
        };
    }
    ListOptions(showAmount, mangas);
}
function ListManga(mangaList) {
    console.log(common.colors.magenta, currentMangaNumber + ". " + mangaList.name + " =-=-=");
    console.log(common.colors.cyan, `${mangaList.data.lastSeen} / ${mangaList.data.latestChapter}`);
    console.log(common.colors.magenta, 'Status: ', mangaList.data.status);
    console.log(common.colors.yellow, 'Personal Score: ', mangaList.data.personalScore);
    currentMangaNumber++;
}