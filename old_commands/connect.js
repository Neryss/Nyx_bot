const { joinVoiceChannel } = require('@discordjs/voice');
const { channel } = require('diagnostics_channel');
// const { client } = require('../index.js')

module.exports = async function connect() {
	if (global.toggle)
	{
		const channel = client.channels.cache.get('838851865432686604');
		console.log(channel.id);
		const connection = joinVoiceChannel({
			channelId: channel.id,
			guildId: channel.guild.id,
			adapterCreator: channel.guild.voiceAdapterCreator
		});

	}
}