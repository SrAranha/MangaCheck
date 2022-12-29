var editJsonFile = require('edit-json-file');
var notifier = require('node-notifier');
var puppeteer = require('puppeteer');
var common = require('./common');
var path = require('path');

/**
 * Search for new chapters fo the mangas in given json file.
 * @param {string} jsonFile json file with mangas.
 * @param {boolean} moreThanOnce if should search another time when error occours.
 */
exports.search = async function search(jsonFile, moreThanOnce) {
    const json = jsonFile;
    const jsonPath = path.join(__dirname, `../json/${json}`);
    let mangasJson = editJsonFile(jsonPath);
    let unreadMangas = [];
    let mangasList = [];
    for (var mangaName in mangasJson.read()) {
        mangasList.push(mangaName);
    }
    for (let i = 0; i < mangasList.length; i++) {
        const browser = await puppeteer.launch({ headless: true });
        const page = await browser.newPage();
        const mangaLink = mangasJson.get(`${mangasList[i]}.link`);
        console.log(common.colors.magenta, mangasList[i]);
        console.log(mangaLink);
        if (!mangaLink) {
            console.log("Link broken");
            console.log("---------DEBUG---------");
            console.log("see on normal console for full report.");
            console.log(mangasJson);
        }
        await page.goto(mangaLink, { waitUntil: 'load' } );
        const mangas = await page.evaluate(() => {
            // Search latest cap on mangalivre
            const chapter = document.querySelectorAll('.cap-text');
            const chapters = [...chapter];
            const lastChapter = chapters.map(id => id.innerText);
            var chapterNumber;
            if (lastChapter.length <= 0) {
                chapterNumber = "Cannot find the lastest chapter.";
                if (moreThanOnce) {
                    var timesToRun = 1;
                    console.log("Trying again!");
                    for (let i = 0; i < timesToRun; i++) {
                        location.reload(true);
                        const chapter2 = document.querySelectorAll('.cap-text');
                        const chapters2 = [...chapter2];
                        const lastChapter2 = chapters2.map(id => id.innerText);
                        if (lastChapter2.length > 0) {
                            chapterNumber = lastChapter2[0].slice(9);
                        }
                    }
                }
            }
            else { 
                chapterNumber = lastChapter[0].slice(9);
            }
            return { chapterNumber };
        });
        console.log(`${common.colors.cyan}Latest chapter => ${mangas.chapterNumber}`);
        await browser.close();
        // Update json file
        if (!mangasJson.get(`${mangasList[i]}.lastSeen`)) {
            mangasJson.set(`${mangasList[i]}.lastSeen`, 0);
        };
        mangasJson.set(`${mangasList[i]}.latestChapter`, parseInt(mangas.chapterNumber));
        mangasJson.save();
        mangasJson = editJsonFile(jsonPath, {
            autosave: true
        });
        if (!mangasJson.get(`${mangasList[i]}.personalScore`)) {
            mangasJson.set(`${mangasList[i]}.personalScore`, 0);
        }
        // Prepping notification
        const lastSeen = mangasJson.get(`${mangasList[i]}.lastSeen`);
        const latestChapter = mangasJson.get(`${mangasList[i]}.latestChapter`);
        
        if (lastSeen < latestChapter) {
            unreadMangas.push(mangasList[i]);
        };
    }
    var ntfTittle;
    var ntfMessage;
    if (unreadMangas.length > 0) {
        ntfTittle = `${unreadMangas.length} mangas with unread chapters.`;
        ntfMessage = `${unreadMangas}`;
    }
    if (unreadMangas.length <= 0) {
        ntfTittle = 'No manga updated.';
        ntfMessage = 'Hope for better next time!';
    }
    notifier.notify({
        title: `${ntfTittle} \nClick me for more info`,
        appID: 'MangaCheck',
        message: `${ntfMessage}`,
        icon: `${__dirname}../assets/mangalivre-icon.png`,
        wait: true
    });
    console.log(common.colors.yellow, 'Finished updating with new chapters.');
    common.WhatNow('search');
};