const chalk = require('chalk');
const app = require(__dirname + "/app.js");
const config = require(__dirname + '')


var server = app.listen(3485, (err) => {
    if (err) {
        console.log(chalk.red("Post is already in use!"));
        return false;
    }
    console.log(chalk.green("Server is listening on port:* 3485"))
    return true;
});