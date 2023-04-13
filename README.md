# MangaCheck
### Contents
- [About](#about)
- [How it Works](#how-it-works)
  - [First Run](#first-run) 
  - [Running it](#running-it)
- [Npm Dependencies](#npm-dependencies) 
- [Changelogs](#changelogs) 
  - [Version 2.1.1](#version-2.1.1)
  - [Version 2.1](#version-2.1)
  - [Version 2.0](#version-2.0)
  - [Version 1.0](#version-1.0)
  

### About
This was an way for me to auto search for updated mangas without the need to manually do it.
Using my previous knowledge with Node.js, i've been able to create this project to satisfy my lazyness.
By now it'll only work with Mangalivre.net, on the future it'll be able to search on more websites.
### How it works
##### First Run
I recomend to delete the existing `mangas.json` file, because it is just for develompent, and has some mangas already in.
##### Running it
To use MangaCheck, simply run the `MangaCheck.bat`, and it'll open the terminal for you and choose which .json file to use.

**Selecting .json file:** 
If you don't have an list `a.k.a .json file`, the program will ask if you would like to create one, if so, MangaCheck will create an new `mangas.json` file for you on json folder.
If you have one already, MangaCheck will select it automatically.
But if you have more than one .json file, the program will ask you which it should use that time.

**Options:**
Once you've selected which .json file to work with, MangaCheck will show you some options to choose, being them:
`SHOW | UPDATE | ADD | REMOVE | SCORE | SEARCH | EXIT`.
Self explanatory, but here is what each one does:
  - **Show:** Show information about the manga selected.
  - **Update:** Let you change information like latest chapter read, score and link for manga.
    - *To update the name of manga, you'll need to change it on `.json file` itself.*
  - **Add:** You can add new manga to the list, only need the name and the link to it.
  - **Remove:** Remove the desired manga form the list.
  - **Score:** Add/change your personal score to manga selected.
  - **Search:** Previous functionality from MangaCheck. Search for new chapters of list selected.
  - **Exit:** Close MangaCheck.

**Infos:**
- After each option is done, you'll receive another prompt asking what to do no, with the options once again.

### Npm dependencies:
- [puppeteer] - A nice API to run browser.
- [edit-json-file] - Good to edit json files easier.
- [node-notifier] - Cool notification system.

[puppeteer]: <https://www.npmjs.com/package/puppeteer>
[edit-json-file]: <https://www.npmjs.com/package/edit-json-file>
[node-notifier]: <https://www.npmjs.com/package/node-notifier>

### Changelogs:
##### Version 2.1.1:
- Fixed typo after removing mangas from list.
- Resolver an issue where if the application could not find an new chapter, it would replace the latest chapter number with an irrelevant text.
- Removed the question asking to search again.
- Updated the searching process to show the progress *(current manga / total of mangas)*, and the mangas with unread chapters at the end, as well if couldn't find some chapter.
- Fixed the ReadMe contents list.
##### Version 2.1:
- Added a new property to mangas list:
 - **Status:** Status has three options `Publishing | Completed | Dropped`.
  - **Publishing:** Current manga is still publishing.
  - **Completed:** This manga has finished.
  - **Dropped:** Being complete, or being published, the user no longer wants to read that manga.
- The next time you run this application, it'll add the status property as `Completed` at first, then you can change it on json file itself, or by the option `UPDATE` in application.
##### Version 2.0:
- Now has a nice interface on terminal with options.
- You can have multiple manga lists, just select which you want to see on startup. 
- Options on interface: `SHOW | UPDATE | ADD | REMOVE | SCORE | SEARCH | EXIT`.
  - **Show:** Show information about the manga selected.
  - **Update:** Let you change information like latest chapter read, score and link for manga.
    - *To update the name of manga, you'll need to change it on `.json file` itself.*
  - **Add:** You can add new manga to the list, only need the name and the link to it.
  - **Remove:** Remove the desired manga form the list.
  - **Score:** Add/change your personal score to manga selected.
  - **Search:** Previous functionality from MangaCheck. Search for new chapters of list selected.
  - **Exit:** Close MangaCheck.

##### Version 1.0:
- Will individually search each entry (manga) on json file to bypass the cloudflare errors.
- Return latest chapter of each manga if possible.
- Save manga link, last chapter seen and the latest released.
- Will notify the user at the end of searching with the unread chapters.