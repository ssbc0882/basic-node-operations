const fs = require("fs");

function done(output) {
    process.stdout.write(output);
    process.stdout.write('\nprompt > ');
}

function evaluateCmd(userInput) {

    const userInputArray = userInput.split(" ");
    const command = userInputArray[0];

    switch (command) {
        case "echo":
            commandLibarary.echo(userInputArray.slice(1).join(" "));
            break;
        case "cat":
            commandLibarary.cat(userInputArray.slice(1));
            break;
        case "head":
            commandLibarary.head(userInputArray.slice(1));
            break;
        case "tail":
            commandLibarary.tail(userInputArray.slice(1));
            break;
        default:
            commandLibarary.errorHandler(userInputArray.slice(1));
    }
}

const commandLibarary = {
    "echo": function (userInput) {
        done(userInput);
    },
    "cat": function (fullPath) {
        const fileName = fullPath[0];
        fs.readFile(fileName, (error, data) => {
            if (error) throw error;
            done(data);
        });
    },
    "head": function (fullPath) {
        const fileName = fullPath[0];

        fs.readFile(fileName, (error, data) => {

            if (error) throw error;

            var dataArray = data.toString().split('\n');
            var newDataArray = dataArray.slice(0, 10).join('\n');
            done(newDataArray);
        })
    },
    "tail": function (fullPath) {
        const fileName = fullPath[0];

        fs.readFile(fileName, (error, data) => {

            if (error) throw error;

            var dataArray = data.toString().split('\n');
            var newDataArray = dataArray.slice(dataArray.length - 10).join('\n');
            done(newDataArray);
        })
    },
    "errorHandler": function (userInput) {
        if (userInput !== 'echo' | 'cat' | 'head' | ' tail') {
            done("command not found");
        }
    }
};

module.exports.commandLibarary = commandLibarary;
module.exports.evaluateCmd = evaluateCmd;