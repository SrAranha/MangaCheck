var editJsonFile = require('edit-json-file');
var score = require('./scoreManga');
var show = require('./showManga');
var common = require('./common');
var main = require('../main');
var path = require('path');

/**
 * Update data from desired manga.
 * @param {string} mangaToUpdate manga to update.
 */
exports.Update = function UpdateManga(mangaToUpdate) {
    var mangaName = common.GetManga(mangaToUpdate).name;
    const jsonPath = path.join(__dirname, `../json/${main.jsonManga}`);
    var jsonFile = editJsonFile(jsonPath);

    show.Show(mangaName, false);

    common.rl.question(`${common.colors.cyan}What you want to update?\n` + `${common.colors.green}Chapters | Score | Link \n`, function(whatUpdate) {
        whatUpdate = whatUpdate.toLocaleUpperCase();
        switch (whatUpdate) {
        
            case 'CHAPTERS':
                    common.rl.question(`${common.colors.cyan}What is the latest chapter you've read?\n('Latest' to set the latest chapter released)\n`, function(chapters_Read) {
                        if (chapters_Read.toLocaleUpperCase() == "LATEST") {
                            jsonFile.set(`${mangaName}.lastSeen`, parseInt(`${jsonFile.get(`${mangaName}.latestChapter`)}`));
                        }
                        else {
                            jsonFile.set(`${mangaName}.lastSeen`, parseInt(chapters_Read));
                        }
                        SaveShow(mangaName);
                    });
            break;
        
            case 'SCORE':
                    common.rl.question(`${common.colors.cyan}What is the new Score?\n`, function(new_Score) {
                        score.Score(mangaName, new_Score);
                    });
            break;
        
            case 'LINK':
                    common.rl.question(`${common.colors.cyan}What is the new Link?\n`, function(new_Link) {
                        console.log('newLink=>', new_Link);
                        jsonFile.set(`${mangaName}.link`, new_Link);
                        SaveShow(mangaName);
                    });
            break;
                
            default:
                console.log(common.colors.red, 'Not an option, going back');
                common.WhatNow();
            break;
        }
    });

    function SaveShow(mangaName) {
        jsonFile.save();
        show.Show(mangaName, true);
    }
}
