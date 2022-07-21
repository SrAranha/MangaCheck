const puppeteer = require('puppeteer');
const editJsonFile = require('edit-json-file');
const notifier = require('node-notifier');

(async () => {
    const browser = await puppeteer.launch({headless: false});
    let mangasList = editJsonFile('mangas.json');
    let unreadMangas = [];
    for (var mangaName in mangasList.read()) {
        const page = await browser.newPage();
        const lastSeen = mangasList.get(`${mangaName}.lastSeen`);
        const latestChapter = mangasList.get(`${mangaName}.latestChapter`);
        const mangaLink = mangasList.get(`${mangaName}.link`);
        await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36');
        // await page.setViewport({
        //     width: 1500,
        //     height: 1000,
        //     deviceScaleFactor: 1,
        // });
        await page.goto(mangaLink);
        console.log('\x1b[35m%s\x1b[0m', mangaName);

        const mangas = await page.evaluate(() => {
            // Search latest cap on mangalivre
            const test = document.querySelector('.cap-text');
            const chapter = document.getElementsByClassName('.hidden-xs');
            const chapters = [...chapter];
            const lastChapter = chapters.map(id => id.innerText);
            return { chapter, chapters, lastChapter, test};
        })
        console.log(mangas.test);
        await page.screenshot({ path: `${mangaName}.png` });
        // Last thing to do;
        if (lastSeen < latestChapter) {
            unreadMangas.push(mangaName);
        }
    }
    await browser.close();
    if (unreadMangas.length > 0) {
        notifier.notify({
            title: `${unreadMangas.length} mangas with unread chapters`,
            appID: 'MangaCheck',
            message: `${unreadMangas}`,
            icon: 'mangalivre-icon.png'
        });
    }
    if (unreadMangas.length <= 0) {
        notifier.notify({
            title: 'No manga updated',
            appID: 'MangaCheck',
            message: 'Hope for better next week!',
            icon: 'mangalivre-icon.png'
        });
    }
})();  