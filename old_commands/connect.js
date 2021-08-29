const { joinVoiceChannel } = require('@discordjs/voice');
const { channel } = require('diagnostics_channel');
// const { client } = require('../index.js')

module.exports = async function connect() {
	const guild = client.guilds.cache.get('838851865432686604');
	console.log(guild.id);
	if (global.toggle)
	{
		const connection = joinVoiceChannel({
			channelId: '838851865432686604',
			guildId: '838851863969005619',
			// adapterCreator: client.guild.
		});
	}
}