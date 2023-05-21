var editJsonFile = require('edit-json-file');
var readline = require('readline');
var options = require('./options');
var common = require('./common'); // no fway this works kekw
var main = require('../main');
var path = require('path');

/** Colors for easier view on terminal. */
exports.colors = {
    /** color for error/exiting */
    red: '\x1b[31m%s\x1b[0m',
    /** color for options */
    green: '\x1b[32m%s\x1b[0m',
    /** color for warning */
    yellow: '\x1b[33m%s\x1b[0m',
    /** color for others */
    magenta: '\x1b[35m%s\x1b[0m',
    /** color for question/common */
    cyan: '\x1b[36m%s\x1b[0m'
};

/** readline interface */
exports.rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Simple function to yes or no questions.
 * @param {string} yesno Yes or no from question.
 * @returns true if affirmative, false if negative.
 */
exports.qYesNo = function qYesNo(yesno) {
    yesno = yesno.toLocaleUpperCase();
    const affirmative = ['YES', 'Y', 'YEP'];
    const negative = ['NO', 'N', 'NOP'];
    if (affirmative.includes(yesno)) {
        return true;
    }
    if (negative.includes(yesno)) {
        return false;
    }
}

/** 
 * @description Function to provide new options to user.
 * @param {string} previous last option chosed. (optional) */
exports.WhatNow = function WhatNow(previous) {
    const options = ['SHOW', 'UPDATE', 'ADD', 'REMOVE', 'SCORE', 'SEARCH', 'EXIT'];
    var newOptions = options;
    var nextOptions = common.colors.cyan + 'What to do now?\n' + common.colors.green;
    
    if (previous) {
        previous = previous.toLocaleUpperCase();
        var previousIndex = options.indexOf(previous);
        newOptions.splice(previousIndex, 1);
    }

    for (let i = 0; i < newOptions.length; i++) {
        if (i == newOptions.length-1) {
            nextOptions += newOptions[i];
        }
        else { nextOptions += newOptions[i] + ' | '; }
    }

    common.rl.question(`${nextOptions}\n`, function(option) {
        common.ChooseOptions(option);
    });
}
/**
 * @description Remove spaces from string.
 * @param {string} string 
 * @returns noSpaceString
 */
exports.RemoveSpaceFromString = function RemoveSpaceFromString(string) 
{
    noSpaceString = string.split(' ').join('');
    return { noSpaceString };
}

/** 
 * @description Function that leads to `option` given.
 * @param {string} option One of the options between `SHOW | UPDATE | ADD | REMOVE | SCORE | SEARCH | EXIT`.
 */
exports.ChooseOptions = function ChooseOptions(option) {
    option = common.RemoveSpaceFromString(option).noSpaceString;
    switch (option.toLocaleUpperCase()) {
        case 'SHOW':
            console.log(common.colors.yellow, 'Showing Manga');
            options.ShowManga();

        break;
            
        case 'UPDATE':
            console.log(common.colors.yellow, 'Updating Manga');
            options.UpdateManga();
            
        break;
            
        case 'ADD':
            console.log(common.colors.yellow, 'Adding Manga');
            options.AddManga();

        break;
        
        case 'REMOVE':
            console.log(common.colors.yellow, 'Removing Manga');
            options.RemoveManga();
            
        break;
            
        case 'SCORE':
            console.log(common.colors.yellow, 'Scoring Manga');
            options.ScoreManga();
            
        break;
        
        case 'SEARCH':
            console.log(common.colors.yellow, 'Searching new chapters');
            options.SearchManga();

        break;

        case 'EXIT':
            console.log(common.colors.yellow, 'Exiting!');
            common.rl.close();

        break;
        
        default:
            console.log(common.colors.red, 'Not an option.');
            common.rl.question(`${common.colors.cyan}Choose from one of these options:\n` + `${common.colors.green}SHOW | UPDATE | ADD | REMOVE | SCORE | SEARCH | EXIT\n`, function(option) {
                common.ChooseOptions(option);
            })
        break;
    }
}

/**
 * Get manga data.
 * @param {string} manga manga name
 * @returns name (manga name on list)
 * @returns data (more info on manga)
 * @returns isManga (if found the manga)
 */
exports.GetManga = function GetManga(manga) {
    manga = manga.toLocaleUpperCase();
    const jsonPath = path.join(__dirname, `../json/${main.jsonManga}`);
    var jsonFile = editJsonFile(jsonPath);
    let mangaData;
    let mangaName;
    let isManga;
    for (const name in jsonFile.read()) {
        if (name.toLocaleUpperCase() == manga) {
            mangaData = jsonFile.get(`${name}`);
            mangaName = name;
        }
    }
    isManga = true;
    if (!mangaData) {
        isManga = false;
        console.log(common.colors.red, "Can't find this manga.");
    }
    return { name: mangaName, data: mangaData, isManga};
}