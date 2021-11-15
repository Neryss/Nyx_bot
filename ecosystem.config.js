module.exports = {
	apps : [{
		name : "discord_bot",
		script : "./index.js",
		cron_restart : "0 2 * * *"
	}]
}
