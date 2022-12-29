var { colors, rl, ChooseOptions } = require('./js/common');
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
    rl.question(`${colors.yellow}Which json file you want?\n` + `${colors.green}${files}\n`, function(whichFile) {
        if (folder.includes(whichFile)) {
            console.log(colors.yellow, `Selecting '${whichFile}'`);
            jsonFile = whichFile;
            StartMangaCheck();
        }
        else {
            console.log(colors.red, `${whichFile} is not on the list!`);
        }
    })
}
if (folder.length <= 0) {
    console.log(colors.yellow, 'There is no json file on json folder.');
    rl.question(`${colors.cyan}Want to create one? yes | no \n`, function(createFile) {
        if (!qYesNo(createFile)) { // negative form
            console.log(colors.magenta, 'Ok');
            rl.close();
        }
        if (qYesNo(createFile)) { // affirmative form
            console.log(colors.magenta, 'Creating an new mangas.json');
            jsonFile = 'mangas.json'
            fs.writeFileSync(`${main.jsonFolder}/${jsonFile}`, '{ }');
            StartMangaCheck();
        }
    })
}
else if (folder.length == 1) {
    jsonFile = folder[0];
    console.log(colors.yellow, `Using '${jsonFile}'`);
    StartMangaCheck();
}


/** Function only to start MangaCheck after selecting json file. */
function StartMangaCheck() {
    exports.jsonManga = `${jsonFile}`; // This works, so i'll leave it here
    rl.question(`${colors.cyan}What you want to do?\n` + `${colors.green}SHOW | UPDATE | ADD | REMOVE | SCORE | SEARCH | EXIT\n`, function(option) {
        ChooseOptions(option);
    });
}

rl.on('close', function() {
    console.log(colors.red, "\nExiting MangaCheck");
    process.exit(0);
});