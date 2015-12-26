module.exports = {

	getCodeFromRequest : function (req) {
		console.log("util: inside getCodeFromRequest()")
		return req.body.data
	}

}