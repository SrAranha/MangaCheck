const editJsonFile = require('edit-json-file');
const notifier = require('node-notifier');
const puppeteer = require('puppeteer');

(async () => {
    let mangasJson = editJsonFile('mangas.json');
    let unreadMangas = [];
    let mangasList = [];
    for (var mangaName in mangasJson.read()) {
        mangasList.push(mangaName);
    }
    for (let i = 0; i < mangasList.length; i++) {
        const browser = await puppeteer.launch({ headless: false }); // For some reason, headless:true make the browser disconnect.
        const page = await browser.newPage();
        const mangaLink = mangasJson.get(`${mangasList[i]}.link`);
        await page.goto(mangaLink, { waitUntil: 'load' } );
        console.log('\x1b[35m%s\x1b[0m', mangasList[i]);
        const mangas = await page.evaluate(() => {
            // Search latest cap on mangalivre
            const chapter = document.querySelectorAll('.cap-text');
            const chapters = [...chapter];
            const lastChapter = chapters.map(id => id.innerText);
            var chapterNumber;
            if (lastChapter.length <= 0) {
                chapterNumber = "Cannot find the lastest chapter.";
                //var moreThanOnce = true;
                //var timesToRun = 1;
                //if (moreThanOnce) {
                //    console.log("Trying again!");
                //    for (let i = 0; i < timesToRun; i++) {
                //        //page.reload();
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
        console.log(mangas.chapterNumber);
        await browser.close();
        // Update json file
        if (!mangasJson.get(`${mangasList[i]}.lastSeen`)) {
            mangasJson.set(`${mangasList[i]}.lastSeen`, 0);
        };
        mangasJson.set(`${mangasList[i]}.latestChapter`, mangas.chapterNumber);
        mangasJson.save();
        mangasJson = editJsonFile('mangas.json', {
            autosave: true
        });
        // Prepping notification
        const lastSeen = mangasJson.get(`${mangasList[i]}.lastSeen`);
        const latestChapter = mangasJson.get(`${mangasList[i]}.latestChapter`);
        
        if (lastSeen < latestChapter) {
            unreadMangas.push(mangasList[i]);
        };
    }
    if (unreadMangas.length > 0) {
        notifier.notify({
            title: `${unreadMangas.length} mangas with unread chapters. \nSee json file for more info.`,
            appID: 'MangaCheck',
            message: `${unreadMangas}`,
            icon: 'mangalivre-icon.png'
        });
    }
    if (unreadMangas.length <= 0) {
        notifier.notify({
            title: 'No manga updated. \nSee json file for more info.',
            appID: 'MangaCheck',
            message: 'Hope for better next week!',
            icon: 'mangalivre-icon.png'
        });
    }
})();