var editJsonFile = require('edit-json-file');
var common = require('./common');
var main = require('../main');
var path = require('path');
var show = require('./showManga');

/**
 * Add or update score from manga.
 * @param {string} mangaName name of the manga.
 * @param {int} newScore new score to add.
 */
exports.Score = function ScoreManga(mangaName, newScore) {
    if (newScore > 10) {
        console.log(common.colors.red, 'Maximum score is 10');
        newScore = 10;
    }
    mangaName = mangaName.toLocaleUpperCase();
    const jsonPath = path.join(__dirname, `../json/${main.jsonManga}`);
    var jsonFile = editJsonFile(jsonPath);

    mangaName = common.GetManga(mangaName).name;
    mangaScore = jsonFile.set(`${mangaName}.personalScore`, parseInt(newScore));
    jsonFile.save();
    var currentScore = jsonFile.get(`${mangaName}.personalScore`);

    console.log(common.colors.yellow, `Set ${currentScore} as score for ${mangaName}`);
    show.Show(mangaName, false);
}