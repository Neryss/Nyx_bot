require("../index");

module.exports = function	issue_send(msg, args)
{
	const issue = args.slice(1).join(" ");
	client.users.cache.get(process.env.MY_ID).send("<@" + msg.author.id + "> has reported an issue!\n\"" + issue + "\"");
	return (1);
}