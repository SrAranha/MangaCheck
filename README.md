# MangaCheck
### About
This was an way for me to auto search for updated mangas without the need to manually do it.
Using my previous knowledge with Node.js, i've been able to create this project to satisfy my lazyness.
By now it'll only work with Mangalivre.net, on the future it'll be able to search on more websites.
### How it works
**Step 1:** First you'll need to create or edit this exactly json file `mangas.json` and put in it each manga you want with the following pattern:
```
{
    "Manga1_Name": {
        "link": "Manga1_Link"
    },
    "Manga2_Name": {
        "link": "Manga2_Link"
    },
    "Manga3_Name": {
        "link": "Manga3_Link"
    }
}
```
Save it and run the `MangaCheck.bat` file.
With this, an cmd prompt will open qnd you can see in real time which manga it is searching, and if it could return the latest chapter.
After the program finish executing, you'll receive an notification with the mangas and the cmd prompt should close.

**Step 2:** Open again the `mangas.json` file, and it should be like that:
```
{
    "Manga_Name": {
        "link": "Manga_Link",
        "lastSeen": 0,
        "latestChapter" "latestChapter"
    },
    ...
}
```
You can now edit the `lastSeen` to the chapter number you've read last.

**Step 3**: You can now execute again the program and now it'll notify you which manga has unread chapters.

**Infos:** If you want, you can add the `lastSeen` in **Step 1**, and when you execute the program it'll skip the **Step 2**.
### Changelogs:
##### Version 1.0:
- Will individually search each entry (manga) on json file to bypass the cloudflare errors.
- Return latest chapter of each manga if possible.
- Save manga link, last chapter seen and the latest released.
- Will notify the user at the end of searching with the unread chapters.

### Npm dependencies used:
- [puppeteer] - A nice API to run browser.
- [edit-json-file] - Good to edit json files easier.
- [node-notifier] - Cool notification system.

[puppeteer]: <https://www.npmjs.com/package/puppeteer>
[edit-json-file]: <https://www.npmjs.com/package/edit-json-file>
[node-notifier]: <https://www.npmjs.com/package/node-notifier>