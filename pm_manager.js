const { exec } = require("child_process");
const cronJob = require("cron").CronJob;
const apps = [0, 1, 2];

console.log("Starting apps restarter");

function restartApps() {
    apps.forEach((app) => {
        exec(`pm2 restart ${app}`, (err, stdout, stderr) => {
            if (!err && !stderr) console.log(new Date(), `App ${app} restarted`);
            else if (err || stderr)
                console.log(
                    new Date(),
                    `Error in executing 'pm2 reload ${app} --time' `,
                    err || stderr
                );
        });
    });
}

new cronJob(
    "0 0 2 * * *",
    () => {
        console.log("2am, reload apps");
        restartApps();
    },
    null,
    true,
    "Europe/Paris"
);
