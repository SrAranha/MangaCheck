var editJsonFile = require('edit-json-file');
var notifier = require('node-notifier');
var puppeteer = require('puppeteer');
var common = require('./common');
var path = require('path');

/**
 * Search for new chapters fo the mangas in given json file.
 * @param {string} jsonFile json file with mangas.
 * @param {boolean} moreThanOnce if should search once more when error occours.
 */
exports.Search = async function SearchMangas(jsonFile, moreThanOnce) {
    const json = jsonFile;
    const jsonPath = path.join(__dirname, `../json/${json}`);
    let mangasJson = editJsonFile(jsonPath);
    let unreadMangas = [];
    let mangasList = [];
    let mangasNotFound = [];
    for (var manga in mangasJson.read()) {
        if (mangasJson.get(`${manga}.status`) == "Publishing") {
            mangasList.push(manga);
        }
    }
    for (let i = 0; i < mangasList.length; i++) {
        const mangaLink = mangasJson.get(`${mangasList[i]}.link`);
        console.log("Searching... (", i + 1, '/', mangasList.length, ')')
        console.log(common.colors.magenta, mangasList[i]);
        //console.log(mangaLink);
        if (!mangaLink) {
            console.log("Link broken");
            console.log("---------DEBUG---------");
            console.log("see on normal console for full report.");
            console.log(mangasJson);
        }
        const enterSite_latestChapter = (await EnterSite(mangaLink)).latestChapter;
        // Update json file
        if (enterSite_latestChapter != null) {
            mangasJson.set(`${mangasList[i]}.latestChapter`, parseInt(enterSite_latestChapter));
        }
        else {
            mangasNotFound.push(mangasList[i]);
        }
        mangasJson.save();
        mangasJson = editJsonFile(jsonPath, {
            autosave: true
        });
        // Prepping notification
        const lastSeen = mangasJson.get(`${mangasList[i]}.lastSeen`);
        const latestChapter = mangasJson.get(`${mangasList[i]}.latestChapter`);
        
        if (lastSeen < latestChapter) {
            unreadMangas.push(mangasList[i]);
        };
    }
    console.log(common.colors.yellow, 'Finished searching.');
    var ntfTittle;
    var ntfMessage;
    if (unreadMangas.length > 0) {
        // Windows toaster
        ntfTittle = `${unreadMangas.length} mangas with unread chapters.`;
        ntfMessage = `${unreadMangas}`;
        // Notification on console window
        console.log(common.colors.cyan, 'These mangas have unread chapters:');
        console.log(common.colors.magenta, unreadMangas);
    }
    if (unreadMangas.length <= 0) {
        // Windows toaster
        ntfTittle = 'No manga updated.';
        ntfMessage = 'Hope for better next time!';
        // Notification on console window
        console.log(common.colors.cyan, 'No new chapters');
    }
    if (mangasNotFound > 0) {
        // Notification on console window
        console.log(common.colors.cyan, 'Could not find chapters for these:');
        console.log(common.colors.magenta, mangasNotFound);
    }
    notifier.notify({
        title: `${ntfTittle} \nClick me for more info`,
        appID: 'MangaCheck',
        message: `${ntfMessage}`,
        icon: `${__dirname}../assets/mangalivre-icon.png`,
        wait: true
    });
    common.WhatNow('search');
};
async function EnterSite(mangaLink) {
    let latestChapter;
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(mangaLink, { waitUntil: 'load' } );
    const mangas = await page.evaluate(() => {
        // Search latest cap on mangalivre
        const chapter = document.querySelectorAll('.cap-text');
        const chapters = [...chapter];
        const lastChapter = chapters.map(id => id.innerText);
        var chapterNumber;
        if (lastChapter.length <= 0) {
            console.log("Could not find the lastest chapter.");
            // Still not working, i need to find out another way to do it.
            //if (moreThanOnce) {
            //    var timesToRun = 1;
            //    console.log("Trying again!");
            //    for (let i = 0; i < timesToRun; i++) {
            //        location.reload(true);
            //        const chapter2 = document.querySelectorAll('.cap-text');
            //        const chapters2 = [...chapter2];
            //        const lastChapter2 = chapters2.map(id => id.innerText);
            //        if (lastChapter2.length > 0) {
            //            chapterNumber = lastChapter2[0].slice(9);
            //        }
            //    }
            //}
        }
        else { 
            chapterNumber = lastChapter[0].slice(9);
        }
        return { chapterNumber };
    });
    latestChapter = mangas.chapterNumber;
    await browser.close();
    return { latestChapter };
}