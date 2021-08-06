module.exports = function status(msg, ip)
{
	if (!global.is_online) 
		msg.channel.send("Server is currently down!");
	else if (global.is_online)
		msg.channel.send(
			"Server is up and running!\nUse the following address: " + ip
		);
	return (1);
}
