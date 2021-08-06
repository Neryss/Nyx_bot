module.exports = function	hello(msg, args)
{
	if (args[1] == "there")
		msg.reply("Hi!");
	else
		msg.channel.send("Hey!")
}
