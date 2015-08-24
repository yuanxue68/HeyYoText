var env = process.env;
var client=require("twilio")(env.twilioAccountSid, env.twilioAuthToken);


function sendText(message){
	if (env.supressTextMessages==="true") 
		return;

	client.sendSms({
		to: env.mobile,
		from: env.twilioAssignedPhoneNumber,
		body: message
	}, function(err, responseData){
		console.log(responseData);
	});
}

function parseMsg(message){
	
}

module.exports.sendText=sendText;