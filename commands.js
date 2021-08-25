require("./index.js");
const	issue = require("./commands/issue_send");
const	status = require("./commands/status");
const	ip = require("./commands/ip");
const	hello = require("./commands/hello");
const	modpack = require("./commands/modpack");
const	connect = require("./commands/voice");
const	toggle = require("./commands/toggle");
const	Discord = require("discord.js");
const	join = require("./commands/join");
const	togglejoin = require("./commands/togglejoin");
const	search = require("./commands/mhw_search");
const	e_what = new Discord.MessageEmbed()
	.setColor("#ff0080")
	.setTitle("Possibilites")
	.addField("Possibles commands:", "\`\`\`!ip => get the ip\n\
!status => current server status\n\
!modpack => current modpack download link and infos\n\
!hello => answer from the bot (plus \"there\" to get a reply)\n\
!issue => reports an issue to @Neryss#002\`\`\`")
	.setTimestamp()
	.addField("Made by :", "[Neryss](https://github.com/Neryss)")

const	commands = { issue, status, ip, modpack, hello, toggle, join, togglejoin, search };
module.exports = function	command_handler(msg, args) {
	try {
		commands[args[0]](msg, args);
	} catch (error) {
		console.error(error);
		msg.channel.send(e_what);
	}
}