module.exports = async function connect(msg)
{
	const cID = "418420355569418244";
	const vc = client.channels.cache.get(cID);
	if (vc && vc.members.size && global.toggle)
	{
		const	sounds = ["/home/ckurt/documents/discord_bot/sounds/woo.mp3",
					"/home/ckurt/documents/discord_bot/sounds/doot.mp3",
					"/home/ckurt/documents/discord_bot/sounds/tg.mp3",
					"/home/ckurt/documents/discord_bot/sounds/windows.mp3",
					"/home/ckurt/documents/discord_bot/sounds/door.mp3",
					"/home/ckurt/documents/discord_bot/sounds/discord.mp3",
					"/home/ckurt/documents/discord_bot/sounds/tudum.mp3",
					"/home/ckurt/documents/discord_bot/sounds/skype.mp3"];
		const connection = await vc.join();
		const dispatcher = connection.play(sounds[Math.floor(Math.random()*sounds.length)], {volume: 0.5});
		dispatcher.on('start', () => {
			console.log('audio.mp3 is now playing!');
		});
		dispatcher.on('finish', async() => {
			console.log('audio.mp3 has finished playing!');
			dispatcher.on('error', console.error);
			await new Promise(r => setTimeout(r, 2000));
			connection.disconnect();
			// random = Math.floor(Math.random() * 300000) + 300000;
			// random = Math.floor(Math.random() * 1000) + 1000;
			// await new Promise(r => setTimeout(r, random));
			// connect(msg);
		});
	}
	else
		console.log("Nobody connected!");
}