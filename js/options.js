var mangas = require('./searchMangas');
var common = require('./common');
var main = require('../main');

exports.ShowManga = function ShowManga() {
    common.rl.question(`${common.colors.cyan}Which manga you want to see?\n` + `${common.colors.cyan}Manga name: `, function(mangaName) {
        mangaName = mangaName.toLocaleUpperCase();
        console.log(common.colors.magenta, mangaName);
    });
}

exports.UpdateManga = function UpdateManga() {
    
}

exports.AddManga = function AddManga() {
    
}

exports.RemoveManga = function RemoveManga() {
    
}

exports.ScoreManga = function ScoreManga() {
    
}

exports.SearchManga = function SearchManga() {
    common.rl.question(`${common.colors.cyan}If can't find chapter, search again? Yes | No\n`, function(yesno) {
        if (!common.qYesNo(yesno)) { // negative form
            console.log(common.colors.yellow, "Ok, won't searching again.");
            mangas.search(main.jsonManga, false);
        }
        if (common.qYesNo(yesno)) { // affirmative form
            console.log(common.colors.yellow, "Ok, searching again if necessary.");
            mangas.search(main.jsonManga, true);
        }
    });
    //common.WhatNow('search');
}