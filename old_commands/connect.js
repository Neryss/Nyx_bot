const { joinVoiceChannel, createAudioPlayer, createAudioResource, NoSubscriberBehavior } = require('@discordjs/voice');
const { channel } = require('diagnostics_channel');
const { OpusEncoder } = require('@discordjs/opus');
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
		const player = createAudioPlayer({
			behaviors: {
				noSubscriber: NoSubscriberBehavior.Pause,
			},
		});
		const sub = connection.subscribe(player);
		resource = createAudioResource("/home/ckurt/documents/discord_bot/sounds/doot.mp3", {inlineVolume: true});
		resource.volume.setVolume(0.5);
		if (sub)
		{
			console.log("JE SUIS DEDANS");
			player.play(resource);
			await new Promise(r => setTimeout(r, 5000));
		}
		connection.destroy();
	}
}