var mangas = require('./searchMangas');
var score = require('./scoreManga');
var show = require('./showManga');
var common = require('./common');
var main = require('../main');

exports.ShowManga = function ShowManga() {
    common.rl.question(`${common.colors.cyan}Which manga you want to see?\n` + `${common.colors.cyan}Manga name: `, function(mangaName) {
        show.Show(mangaName);
    });
}

exports.UpdateManga = function UpdateManga() {
    
}

exports.AddManga = function AddManga() {
    
}

exports.RemoveManga = function RemoveManga() {
    
}

exports.ScoreManga = function ScoreManga() {
    common.rl.question(`${common.colors.cyan}Which manga you want to add/change score?\n` + `${common.colors.cyan}Manga name: `, function(mangaName) {
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