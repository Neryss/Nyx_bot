const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('asked to randomly join the vc')
		.addStringOption(option =>
			option.setName('switch')
				.setDescription('turn the join loop on/off')
				.setRequired(true)
				.addChoice('on', 'on')
				.addChoice('off', 'off')),
	async execute(interaction) {
		const choice = interaction.options.getString('switch');
		if (choice == 'on')
			global.toggle = true;
		else
			global.toggle = false;
		await interaction.reply({content: `turned ${choice}\nToggle: ${global.toggle}`, ephemeral: true});
	},
};

// const togglejoin = require("./togglejoin");

// function toMs(s)
// {
// 	return (s * 1000);
// }

// module.exports = async function join(msg)
// {
// 	console.log("Current status before joining: ");
// 	console.log(global.toggle);
// 	console.log(global.togglejoin);
// 	if (msg.member.voice.channel && global.toggle == false && global.togglejoin == true)
// 	{
// 		const	sounds = ["/home/ckurt/documents/discord_bot/sounds/woo.mp3",
// 					"/home/ckurt/documents/discord_bot/sounds/doot.mp3",
// 					"/home/ckurt/documents/discord_bot/sounds/tg.mp3",
// 					"/home/ckurt/documents/discord_bot/sounds/windows.mp3",
// 					"/home/ckurt/documents/discord_bot/sounds/door.mp3",
// 					"/home/ckurt/documents/discord_bot/sounds/discord.mp3",
// 					"/home/ckurt/documents/discord_bot/sounds/tudum.mp3",
// 					"/home/ckurt/documents/discord_bot/sounds/skype.mp3"];
// 		const connection = await msg.member.voice.channel.join();
// 		const dispatcher = connection.play(sounds[Math.floor(Math.random()*sounds.length)], {volume: 0.5});
// 		dispatcher.on('start', () => {
// 			console.log('audio.mp3 is now playing!');
// 		});
// 		dispatcher.on('finish', async() => {
// 			console.log('audio.mp3 has finished playing!');
// 			dispatcher.on('error', console.error);
// 			await new Promise(r => setTimeout(r, 2000));
// 			connection.disconnect();
// 			random = Math.floor(Math.random() * toMs(10)) + toMs(1);
// 			console.log(random);
// 			await new Promise(r => setTimeout(r, random));
// 			console.log("Should re connect");
// 			join(msg);
// 		});
// 		dispatcher.on('error', console.error);
// 	}
// }