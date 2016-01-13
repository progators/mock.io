var fs = require('fs')
var app = require('express')

module.exports = {

	start : function (lang, src_code, resp) {
		console.log("service: inside start()")
		var status = this.runcompiler(resp, lang, src_code)
	},

	compilerCallback : function(err, resp) {
		if (err) {
			resp.send("Compiler Error!!")
		} else {
			resp.send("Compiler Success!!")
		}
	},

	runcompiler : function(resp, lang, src_code) {
		console.log("service: inside runcompiler()")
		fs.writeFile('Solution.java', src_code, function(err){
			if (err) {
				console.log("Error saving source code to file!!")
			}
		})
		this.compile(lang, "filepath", resp, this.run(null, resp))
	},

	compile : function(lang, filepath, resp, runcallback) {
		console.log("service: inside compile() ")

		var terminal = require('child_process').spawn('bash')

		terminal.stdout.on('data', function(data){
			console.log('stdout: '+ data);
			resp.send(String(data))
		});

		terminal.stderr.on('data', function(data) {
    		console.log('ERROR:', String(data))
    		resp.send(String(data))
   		});

   		terminal.on('exit', function(exitcode){
			console.log('child process exited with code: ' + exitcode)
			//resp.send("Compilation Success!!")
			runcallback("", resp);
		});

		setTimeout(function(){
			console.log('compiling Solution.java')
			terminal.stdin.write('javac Solution.java')
			terminal.stdin.end();
		},1000)
	},

	run : function(input, resp) {
		console.log("service: inside run() ")

		var terminal = require('child_process').spawn('bash')

		terminal.stdout.on('data', function(data){
			console.log('stdout: '+ data);
			resp.send(String(data))
		});

		terminal.stderr.on('data', function(data) {
    		console.log('ERROR:', String(data))
    		resp.send(String(data))
   		});

   		terminal.on('exit', function(exitcode){
			console.log('child process exited with code: ' + exitcode)
			//send output in response
			resp.send("java program ran Successfully!!")
		});

		setTimeout(function(){
			console.log('compiling Solution.java')
			//use input
			terminal.stdin.write('java Solution')
			terminal.stdin.end();
		},1000)
	}


}