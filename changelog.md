# Entire changelog
- [Entire changelog](#entire-changelog)
  - [Version 2.3:](#version-23)
  - [Version 2.2.2:](#version-222)
  - [Version 2.2.1:](#version-221)
  - [Version 2.2:](#version-22)
  - [Version 2.1.4:](#version-214)
  - [Version 2.1.3:](#version-213)
  - [Version 2.1.2:](#version-212)
  - [Version 2.1.1:](#version-211)
  - [Version 2.1:](#version-21)
  - [Version 2.0:](#version-20)
  - [Version 1.0:](#version-10)

## Version 2.3:
- Added `PrismaScans` as a new site this program can search for mangas.
## Version 2.2.2:
- Resolved an unespected error.
  - When adding new manga, it doens't add the status, which is needed to search for new chapters.
  - Now it'll add all the necessary parameters on adding a new manga.
## Version 2.2.1:
- Resolved issue [#16](https://github.com/SrAranha/MangaCheck/issues/16).
  - Bug was asking for the new score twice before updating it.
## Version 2.2:
- Added new feature [#9](https://github.com/SrAranha/MangaCheck/issues/9).
  - Now you can see your entire list within `SHOW` option.
  - Type `LIST` instead of a manga name to see your list.
## Version 2.1.4:
- Resolved issue [#13](https://github.com/SrAranha/MangaCheck/issues/13).
## Version 2.1.3:
- Fixed a bug where on json file select, MangaCheck doesn't ignore the spaces on input.
## Version 2.1.2:
- Fixed a bug on `SCORE` option, where it didn't check if the manga name was right before giving it the score.
## Version 2.1.1:
- Fixed typo after removing mangas from list.
- Resolver an issue where if the application could not find an new chapter, it would replace the latest chapter number with an irrelevant text.
- Removed the question asking to search again.
- Updated the searching process to show the progress *(current manga / total of mangas)*, and the mangas with unread chapters at the end, as well if couldn't find some chapter.
- Fixed the ReadMe contents list.
## Version 2.1:
- Added a new property to mangas list:
  - **Status:** Status has three options `Publishing | Completed | Dropped`.
  - **Publishing:** Current manga is still publishing.
  - **Completed:** This manga has finished.
  - **Dropped:** Being complete, or being published, the user no longer wants to read that manga.
- The next time you run this application, it'll add the status property as `Completed` at first, then you can change it on json file itself, or by the option `UPDATE` in application.
## Version 2.0:
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

## Version 1.0:
- Will individually search each entry (manga) on json file to bypass the cloudflare errors.
- Return latest chapter of each manga if possible.
- Save manga link, last chapter seen and the latest released.
- Will notify the user at the end of searching with the unread chapters.
