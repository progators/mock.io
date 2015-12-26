var fs = require('fs')
var app = require('express')

module.exports = {

	start : function (lang, src_code, resp) {
		console.log("service: inside start()")
		var status = this.compile(resp, lang, src_code)
	},

	compilerCallback : function(err, resp) {
		if (err) {
			resp.send("Compiler Error!!")
		} else {
			resp.send("Compiler Success!!")
		}
	},

	compile : function(resp, lang, src_code) {
		console.log("service: inside compile()")
		fs.writeFile('Solution.java', src_code, function(err){
			if (err) {
				console.log("Error saving source code to file!!")
			}
		})
		this.runcompiler(lang, "filepath", resp)
	},

	runcompiler : function(lang, filepath, resp) {
		console.log("service: inside runcompiler() ")

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
			resp.send("Compilation Success!!")
		});

		setTimeout(function(){
			console.log('compiling Solution.java')
			terminal.stdin.write('javac Solution.java')
			terminal.stdin.end();
		},1000)
	}

}