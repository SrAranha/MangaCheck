var editJsonFile = require('edit-json-file');
var common = require('./common');
var main = require('../main');
var path = require('path');

/**
 * Remove one manga from the list.
 * @param {string} mangaName name of the manga to remove.
 */
exports.Remove = function RemoveManga(mangaName) {
    mangaName = common.GetManga(mangaName).name;
    common.rl.question(`${common.colors.red}Are you sure you want to remove '${mangaName}' from list? Yes / No\n`, function(yesno) {
        if (!common.qYesNo(yesno)) { // negative form
            console.log(common.colors.yellow, "Ok, going back.");
            common.WhatNow('remove');
        }
        if (common.qYesNo(yesno)) { // affirmative form
            console.log(common.colors.yellow, `Ok, deleting ${mangaName}`);
            const jsonPath = path.join(__dirname, `../json/${main.jsonManga}`);
            var jsonFile = editJsonFile(jsonPath);
        
            jsonFile.unset(`${mangaName}`);
            jsonFile.save();
        
            console.log(common.colors.red, `${mangaName} has been removed from list.`);
            common.WhatNow();
        }
    });
}