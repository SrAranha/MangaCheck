var editJsonFile = require('edit-json-file');
var common = require('./common');
var main = require('../main');
var path = require('path');

/**
 * Add new manga to the list.
 * @param {string} mangaName Name of the new manga.
 * @param {string} mangaLink Link for the new manga.
 */
exports.Add = function AddManga(mangaName, mangaLink) {
    const jsonPath = path.join(__dirname, `../json/${main.jsonManga}`);
    let jsonFile = editJsonFile(jsonPath);

    jsonFile.append(`${mangaName}.link`, 'LINK_DO_MANGA');
    jsonFile.set(`${mangaName}.link`, `${mangaLink}`);
    jsonFile.save();

    common.WhatNow();
}