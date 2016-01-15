/**
 * Created by sunito on 1/15/16.
 */
var fs = require('fs')
var app = require('express')

function buildMessage(arr){
    var msg = ""
    for (var i = 0; i < arr.length; ++i) {
        msg += arr[i] + "\n"
    }
    return msg
}

function compile (socket, lang, src_code, input, expectedOutput) {
    fs.writeFile('Solution.java', src_code, function(err){
        if (err) {
            console.log("Error saving source code to file!!")
        }
    })
    console.log("service: inside compile() ")

    var errors = new Array()
    var outs = new Array()

    var terminal = require('child_process').spawn('bash')

    terminal.stdout.on('data', function(data){
        console.log('COMPILE - stdout: '+ data);
        outs.push(String(data))
    });

    terminal.stderr.on('data', function(data) {
        console.log('COMPILE - ERROR:', String(data))
        errors.push(String(data))
    });

    terminal.on('exit', function(exitcode)
    {
        console.log('COMPILE - child process exited with code: ' + exitcode)
        console.log('COMPILE Errors size: ' + errors.length)
        if (errors.length == 0) {
            run(socket, lang, input, expectedOutput)
        }
        else {
            msg = buildMessage(errors)
            console.log(msg)
            socket.emit('response', msg)
        }
    });

    setTimeout(function(){
        console.log('compiling Solution.java')
        terminal.stdin.write('javac Solution.java')
        terminal.stdin.end();
    },1000)

}

function run (socket, lang, input, expectedOutput) {
    console.log("service: inside run() ")

    var errors = new Array()
    var outs = new Array()

    var terminal = require('child_process').spawn('bash')

    terminal.stdout.on('data', function(data){
        console.log('RUN - stdout: '+ data);
        outs.push(String(data))
    });

    terminal.stderr.on('data', function(data) {
        console.log('RUN - ERROR:', String(data))
        errors.push(String(data))
    });

    terminal.on('exit', function(exitcode){
        //send output in response
        console.log('RUN - child process exited with code: ' + exitcode)
        console.log('RunTime Errors size: ' + errors.length)
        if (errors.length == 0) {
            var msg = lang + " program run successfully!! Your Input: " + input + " ExpectedOutput: " + expectedOutput
            //socket.emit('response', msg)
            socket.emit('response', buildMessage(outs))
        }
        else {
            msg = buildMessage(errors)
            console.log(msg)
            socket.emit('response', msg)
        }
    });

    setTimeout(function(){
        console.log('running Solution.java')
        //use input
        terminal.stdin.write('java Solution')
        terminal.stdin.end();
    },1000)
}

module.exports = {

    start : function () {
        console.log("service: inside start()")
        return compile
    }

}