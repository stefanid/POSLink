const chalk = require('chalk');
const app = require(__dirname + "/app.js");

var server = app.listen(7895, (err) => {
    if (err) {
        console.log(chalk.red("Post is already in use!"));
        return false;
    }

    console.log(chalk.green("Server is listening on port:* 7895"))
    return true;
});