var editJsonFile = require('edit-json-file');
var score = require('./scoreManga');
var show = require('./showManga');
var common = require('./common');
var path = require('path');

/**
 * Update data from desired manga.
 * @param {string} mangaToUpdate manga to update.
 */
exports.Update = function UpdateManga(mangaToUpdate) {
    const configPath = path.join(__dirname, './config.json');
    let configFile = editJsonFile(configPath);
    
    const jsonPath = path.join(__dirname, `../json/${configFile.get('ChangeList.value')}`);
    var jsonFile = editJsonFile(jsonPath);
    
    var mangaName = common.GetManga(mangaToUpdate).name;
    show.Show(mangaName, false);

    common.rl.question(`${common.colors.cyan}What you want to update?\n` + `${common.colors.green}Chapters | Score | Link | Status \n`, function(whatUpdate) {
        whatUpdate = whatUpdate.toLocaleUpperCase();
        switch (whatUpdate) {
        
            case 'CHAPTERS':
                    common.rl.question(`${common.colors.cyan}What is the latest chapter you've read?\n('LATEST' to set the latest chapter released)\n`, function(chapters_Read) {
                        if (chapters_Read.toLocaleUpperCase() == "LATEST") {
                            jsonFile.set(`${mangaName}.lastSeen`, parseInt(`${jsonFile.get(`${mangaName}.latestChapter`)}`));
                        }
                        else if (chapters_Read > parseInt(`${jsonFile.get(`${mangaName}.latestChapter`)}`)) {
                            console.log(common.colors.red, "==WARNING== \nThe read chapters amount was bigger than the amount of released chapters! Setting to the latest chapter.");
                            jsonFile.set(`${mangaName}.lastSeen`, parseInt(`${jsonFile.get(`${mangaName}.latestChapter`)}`));
                        }
                        else {
                            jsonFile.set(`${mangaName}.lastSeen`, parseInt(chapters_Read));
                        }
                        SaveShow(mangaName);
                    });
            break;
        
            case 'SCORE':
                score.Score(mangaName);
            break;
        
            case 'LINK':
                    common.rl.question(`${common.colors.cyan}What is the new Link?\n`, function(new_Link) {
                        jsonFile.set(`${mangaName}.link`, new_Link);
                        SaveShow(mangaName);
                    });
            break;

            case 'STATUS':
                    common.rl.question(`${common.colors.cyan}Which status this manga is in? 1 = Publishing | 2 = Completed | 3 = Dropped \n`, function(status_Number) {
                        let new_Status;
                        switch (+status_Number) {
                            case 1:
                                new_Status = "Publishing";
                            break;
                            case 2:
                                new_Status = "Completed";
                            break;
                            case 3:
                                new_Status = "Dropped";
                            break;
                            default:
                                new_Status = "NaN!";
                                break;
                        }
                        console.log(new_Status);
                        jsonFile.set(`${mangaName}.status`, new_Status);
                        SaveShow(mangaName);
                    })
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
