var mangas = require('./searchMangas');
var score = require('./scoreManga');
var show = require('./showManga');
var update = require('./updateManga');
var common = require('./common');
var main = require('../main');

const questionMangaName = 'Manga Name: ';

exports.ShowManga = function ShowManga() {
    common.rl.question(`${common.colors.cyan}Which manga you want to see?\n` + questionMangaName, function(mangaName) {
        show.Show(mangaName, true);
    });
}

exports.UpdateManga = function UpdateManga() {
    common.rl.question(`${common.colors.cyan}Which manga you want to update?\n` + questionMangaName, function(mangaName) {
        update.Update(mangaName);
    });
}

exports.AddManga = function AddManga() {
    
}

exports.RemoveManga = function RemoveManga() {
    
}

exports.ScoreManga = function ScoreManga() {
    common.rl.question(`${common.colors.cyan}Which manga you want to add/change score?\n` + questionMangaName, function(mangaName) {
        common.rl.question(`${common.colors.cyan}What score you give to ${mangaName}? `, function(newScore) {
            score.Score(mangaName, newScore);
        })
    });
}

exports.SearchManga = function SearchManga() {
    common.rl.question(`${common.colors.cyan}If can't find chapter, search again? Yes | No\n`, function(yesno) {
        if (!common.qYesNo(yesno)) { // negative form
            console.log(common.colors.yellow, "Ok, won't search again.");
            mangas.search(main.jsonManga, false);
        }
        if (common.qYesNo(yesno)) { // affirmative form
            console.log(common.colors.yellow, "Ok, will search again if necessary.");
            mangas.search(main.jsonManga, true);
        }
    });
    //common.WhatNow('search');
}