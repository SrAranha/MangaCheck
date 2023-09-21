var search = require('./searchMangas');
var update = require('./updateManga');
var remove = require('./removeManga');
var score = require('./scoreManga');
var configs = require('./configs');
var show = require('./showManga');
var common = require('./common');
var add = require('./addManga');
var main = require('../main');

const questionMangaName = 'Manga Name: ';

exports.ShowManga = function ShowManga() {
    common.rl.question(`${common.colors.cyan}Which manga you want to see?\n(Type 'LIST' to see the entire list)\n` + questionMangaName, function(mangaName) {
        show.Show(mangaName, true, true);
    });
}

exports.UpdateManga = function UpdateManga() {
    common.rl.question(`${common.colors.cyan}Which manga you want to update?\n` + questionMangaName, function(mangaName) {
        update.Update(mangaName);
    });
}

exports.AddManga = function AddManga() {
    common.rl.question(`${common.colors.cyan}What is the name of the new manga?\n` + questionMangaName, function(mangaName) {
        common.rl.question(`${common.colors.cyan}And the link to it?\n`, function(mangaLink) {
            add.Add(mangaName, mangaLink);
        });
    });
}

exports.RemoveManga = function RemoveManga() {
    common.rl.question(`${common.colors.cyan}Which manga you want to remove?\n` + questionMangaName, function(mangaName) {
        remove.Remove(mangaName);
    });
}

exports.ScoreManga = function ScoreManga() {
    common.rl.question(`${common.colors.cyan}Which manga you want to add/change score?\n` + questionMangaName, function(mangaName) {
        score.Score(mangaName);
    });
}

exports.SearchManga = function SearchManga() {
    search.Search(main.jsonManga, false)
}

exports.Configurate = function Configurate() {
    configs.Configurate();
}