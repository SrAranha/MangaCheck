var editJsonFile = require('edit-json-file');
var common = require('./common');
var path = require('path');
var show = require('./showManga');

/**
 * Add or update score from manga.
 * @param {string} mangaName name of the manga.
 * @param {int} newScore new score to add.
 */
exports.Score = function ScoreManga(mangaName) {
    mangaName = common.GetManga(mangaName).name;
    const configPath = path.join(__dirname, './config.json');
    let configFile = editJsonFile(configPath);
    if (!mangaName) {
        common.WhatNow();
    }
    else {
        common.rl.question(`${common.colors.cyan}What score you give to ${mangaName}? `, function(newScore) {
            if (newScore > 10) {
                console.log(common.colors.red, 'Maximum score is 10');
                newScore = 10;
            }
            const jsonPath = path.join(__dirname, `../json/${configFile.get('ChangeList.value')}`);
            var jsonFile = editJsonFile(jsonPath);
            
            mangaScore = jsonFile.set(`${mangaName}.personalScore`, parseInt(newScore));
            jsonFile.save();
            var currentScore = jsonFile.get(`${mangaName}.personalScore`);
            
            console.log(common.colors.yellow, `Set ${currentScore} as score for ${mangaName}`);
            show.Show(mangaName, true);
        })
    }
}