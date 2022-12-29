var editJsonFile = require('edit-json-file');
var options = require('./js/options');
var common = require('./js/common');
var main = require('./main');
var path = require('path');
var fs = require('fs');

// Search for json files in json folder
exports.jsonFolder = path.join(__dirname, './json');
var folder = fs.readdirSync(main.jsonFolder);
/** Json file selected. */
var jsonFile;
if (folder.length > 1) {
    files = '';
    for (let i = 0; i < folder.length; i++) {
        if (i == folder.length-1) {
            files += folder[i];
        }
        else {
            files += folder[i] + ' | ';
        }
    }
    common.rl.question(`${common.colors.yellow}Which json file you want?\n` + `${common.colors.green}${files}\n`, function(whichFile) {
        if (folder.includes(whichFile)) {
            console.log(common.colors.yellow, `Selecting '${whichFile}'`);
            jsonFile = whichFile;
            StartMangaCheck();
        }
        else {
            console.log(common.colors.red, `${whichFile} is not on the list!`);
        }
    })
}
if (folder.length <= 0) {
    console.log(common.colors.yellow, 'There is no json file on json folder.');
    common.rl.question(`${common.colors.cyan}Want to create one? yes | no \n`, function(createFile) {
        if (!common.qYesNo(createFile)) { // negative form
            console.log(common.colors.magenta, 'Ok');
            common.rl.close();
        }
        if (common.qYesNo(createFile)) { // affirmative form
            console.log(common.colors.magenta, 'Creating an new mangas.json');
            jsonFile = 'mangas.json'
            fs.writeFileSync(`${main.jsonFolder}/${jsonFile}`, '{ }');
            StartMangaCheck();
        }
    })
}
else if (folder.length == 1) {
    jsonFile = folder[0];
    console.log(common.colors.yellow, `Using '${jsonFile}'`);
    StartMangaCheck();
}


/** Function only to start MangaCheck after selecting json file. */
function StartMangaCheck() {
    exports.jsonManga = `${jsonFile}`; // This works, so i'll leave it here
    common.rl.question(`${common.colors.cyan}What you want to do?\n` + `${common.colors.green}SHOW | UPDATE | ADD | REMOVE | SCORE | SEARCH | EXIT\n`, function(option) {
        common.ChooseOptions(option);
    });
}

common.rl.on('close', function() {
    console.log(common.colors.red, "\nExiting MangaCheck");
    process.exit(0);
});