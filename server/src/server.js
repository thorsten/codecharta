const WebSocket = require('ws');
const { execSync } = require('child_process');

const wss = new WebSocket.Server({port: 8080});

/**
 * socket
 */
var socket = null;

const onSonarFinished = function (error, stdout, stderr) {

    console.log("sonar analysis done");

    if(!error && !stderr) {
        socket.send(JSON.stringify(stdout));
    } else {
        socket.send(JSON.stringify({"stderr":stderr, "error":error}));
    }

};

const onSonarMessage = function(task) {

    //mandatory
    if(task.url && task.projectId) {

        //optional
        var mergeModules = task.mergeModules ? true : false;

        var cmd = "./src/codecharta-analysis/ccsh sonarimport "
            + task.url
            + " "
            + task.projectId;

        if(mergeModules) {
            cmd += " " + "--mergeModules";
        }

        console.log("running cmd: " + cmd);

        var exec = require('child_process').exec, child;
        exec(cmd, onSonarFinished);

    } else {
        socket.send('sonar url and projectId must be defined');
    }

};

/**
 * on message
 * @param message
 */
const onMessage = function (message) {

    console.log('message received');

    try {
        var parsedMessage = JSON.parse(message);
        console.log('message parsed');

        switch (parsedMessage.type) {
            case 'sonar':
                console.log('sonar analysis');
                onSonarMessage(parsedMessage);
                break;
            default:
                socket.send('no type defined or invalid');
        }

    }
    catch (err) {
        socket.send('message could not be parsed: ' + err);
    }

};

/**
 * on connection
 * @param ws
 */
const onConnection = function (ws) {
    socket = ws;
    socket.on('message', onMessage);
    socket.send('connected');
};

/**
 * initial call
 */
wss.on('connection', onConnection);