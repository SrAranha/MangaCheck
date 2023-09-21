# MangaCheck
### Contents
- [MangaCheck](#mangacheck)
    - [Contents](#contents)
    - [About](#about)
    - [How it works](#how-it-works)
  - [First Run](#first-run)
  - [Running it](#running-it)
  - [Npm dependencies:](#npm-dependencies)
  - [Changelogs:](#changelogs)
  - [Version 2.4:](#version-24)
### About
This was an way for me to auto search for updated mangas without the need to manually do it.
Using my previous knowledge with Node.js, i've been able to create this project to satisfy my lazyness.
By now it'll only work with Mangalivre.net, on the future it'll be able to search on more websites.
### How it works
## First Run
I recomend to delete the existing `mangas.json` file, because it is just for develompent, and has some mangas already in.
## Running it
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
- After each option is done, you'll receive another prompt asking what to do now, with the options once again.

## Npm dependencies:
- [edit-json-file] - Good to edit json files easier.
- [node-notifier] - Cool notification system.
- [open] - Lib required to open files from notification.
- [puppeteer] - A nice API to run browser.

[edit-json-file]: <https://www.npmjs.com/package/edit-json-file>
[node-notifier]: <https://www.npmjs.com/package/node-notifier>
[open]: <https://www.npmjs.com/package/open>
[puppeteer]: <https://www.npmjs.com/package/puppeteer>

## Changelogs:
[Click here for full list of changelogs](./changelog.md).
## Version 2.4:
- Added new option `CONFIG`.
  - This option will let you change the configuration of certain options.
  - Such as: `Search Again | Show Amount on List | Change Current List | Restore to Defaults`.
    - **Search Again** *NOT IMPLEMENTED*: If `True` and the program has failed to get the latest chapter of a manga, it'll search again. If `False`, the program will continue with the next manga.
    - **Show Amount on List** *(int | ALL)*: The amount of mangas the program will show on `SHOW => LIST` option. If `ALL` is selected, the program will show the entire list at once.
    - **Change Current List** *NOT IMPLEMENTED*: This option will let you change to another `.json` file a.k.a. manga list.
    - **Restore to Defaults**: This will restore the options above to default values.