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
		resource = createAudioResource('/home/ckurt/documents/Nyx_bot/sounds/test.ogg', {inlineVolume: true});
		resource.volume.setVolume(0.5);
		player.on('error', (error) => {
			console.error("Aled : ", error);
		})
		player.play(resource);
		const sub = connection.subscribe(player);
		if (sub)
		{
			console.log("JE SUIS DEDANS");
			await new Promise(r => setTimeout(r, 7000));
		}
		connection.destroy();
	}
}