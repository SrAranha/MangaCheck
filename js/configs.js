var editJsonFile = require('edit-json-file');
var changeList = require('./chooseJsonFile');
var common = require('./common');
var path = require('path');

const jsonPath = path.join(__dirname, './config.json');
let configFile = editJsonFile(jsonPath);
let configs = [];
let currentOptionIndex;
// TODO: FINISH THIS
exports.Configurate = function Configurate() {
    ShowConfigs();
}

function ShowConfigs() {
    console.log("────────────────────");
    configs = [];
    for (var config in configFile.read()) {
        configs.push(config);
        console.log("-----" + config.toString() + "-----");
        console.log(common.colors.cyan, "Description: " + configFile.get(`${config}.description`));
        console.log(common.colors.green, "Value: " + configFile.get(`${config}.value`));
        console.log(common.colors.yellow, "Options: " + configFile.get(`${config}.options`));
        console.log(common.colors.magenta, "Default: " + configFile.get(`${config}.default`));
    }
    console.log("────────────────────");
    ShowOptions();
}
function ShowOptions() {
    console.log(common.colors.cyan, "Which configuration you want to change?");
    var configList = '';
    for (let i = 0; i < configs.length; i++) {
        if (i == configs.length-1) {
            configList += configs[i];
        }
        else { configList += configs[i] + ' | '; }
    }
    configList += ' | EXIT'
    common.rl.question(`${common.colors.green + configList}\n`, function(option) {
        switch (option.toLocaleUpperCase()) {
            case 'SEARCHAGAIN':
                currentOptionIndex = 0;
                SearchAgain();
            break;

            case 'SHOWAMOUNT':
                currentOptionIndex = 1;
                ShowAmount();
            break;

            case 'CHANGELIST':
                currentOptionIndex = 2;
                ChangeList();
            break;

            case 'RESTORETODEFAULT':
                currentOptionIndex = 3;
                SetDefaultValues();
            break;

            case 'EXIT':
                common.WhatNow();
            break;

            default:
                console.log(option + " isn't an option.");
                break;
            }
        });
    }
function CurrentOption() {
    var currentOption = configs[currentOptionIndex];
    return { currentOption };
}
function SaveJson() {
    configFile.save();
    configFile = editJsonFile(jsonPath, {
        autosave: true
    }); 
}
function FinishOption() {
    console.log(`\nOption: ${CurrentOption().currentOption} is set to ${configFile.get(`${CurrentOption().currentOption}.value`)}`);
    SaveJson();
    ShowOptions();
}
function SearchAgain() {
    var currentOption = CurrentOption().currentOption;
    console.log("Changing => " + currentOption);
    console.log(common.colors.cyan, "Description: " + configFile.get(`${currentOption}.description`));
    common.rl.question(`${common.colors.green + configFile.get(`${currentOption}.options`)}\n`, function(option) {
        if (option == 'true') {
            configFile.set(`${currentOption}.value`, true);
        }
        else if (option == 'false') {
            configFile.set(`${currentOption}.value`, false);
        }
        else {
            console.log("Not an valid option.");
            ShowOptions();
        }
        FinishOption();
    });
}
function ShowAmount() {
    var currentOption = CurrentOption().currentOption;
    console.log("Changing => " + currentOption);
    console.log(common.colors.cyan, "Description: " + configFile.get(`${currentOption}.description`));
    common.rl.question(`${common.colors.green + configFile.get(`${currentOption}.options`)}\n`, function(option) {
        if (option.toLocaleUpperCase() == 'ALL') {
            configFile.set(`${currentOption}.value`, 'ALL');
        }
        else if (!isNaN(parseInt(option)) && isFinite(parseInt(option))) {
            configFile.set(`${currentOption}.value`, parseInt(option));
        }
        FinishOption();
    });
}

function ChangeList() {
    console.log(common.colors.red, "NOT IMPLEMENTED YET!");
    FinishOption();
}

function SetDefaultValues() {
    var currentOption = CurrentOption().currentOption;
    console.log("Changing => " + currentOption);
    console.log(common.colors.cyan, "Description: " + configFile.get(`${currentOption}.description`));
    common.rl.question(`${common.colors.green}Sure you want to restore configs to default? YES | NO \n`, function(option) {
        if (common.qYesNo(option)) {
            console.log(common.colors.yellow, "Restoring configs to default.");
            for (var config in configFile.read()) {
                configFile.set(`${config}.value`, configFile.get(`${config}.default`));
            }
        }
        else if (!common.qYesNo(option)) {
            return;
        }
        FinishOption();
    });

}