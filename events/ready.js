const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {
        const activities = [
            { name: 'VALORANT', type: ActivityType.Playing },
            { name: 'Netflix', type: ActivityType.Watching },
            { name: 'Fortnite', type: ActivityType.Competing },
            { name: 'Loading members...', type: ActivityType.Watching } 
        ];

        const statuses = ['idle', 'dnd'];

        let currentActivityIndex = 0;
        let currentStatusIndex = 0;

        let apiOverride = {
            activity: null,
            status: null,
        };

        async function updateMemberCountActivity() {
            let totalMembers = 0;

            for (const guild of client.guilds.cache.values()) {
                try {
                    const members = await guild.members.fetch();
                    totalMembers += members.size;
                } catch (err) {
                    console.error(`Failed to fetch members for guild ${guild.name}:`, err);
                }
            }

            // Update the last activity slot dynamically
            activities[activities.length - 1] = {
                name: `Serving ${totalMembers} members`,
                type: ActivityType.Watching,
            };
        }

        async function setActivityAndStatus() {
            const activity = apiOverride.activity || activities[currentActivityIndex];
            const status = apiOverride.status || statuses[currentStatusIndex];

            if (activity) {
                client.user.setPresence({
                    activities: [activity],
                    status: status,
                });
            }

            if (!apiOverride.activity) {
                currentActivityIndex = (currentActivityIndex + 1) % activities.length;
            }

            if (!apiOverride.status) {
                currentStatusIndex = (currentStatusIndex + 1) % statuses.length;
            }
        }

        setTimeout(async () => {
            await updateMemberCountActivity();
            await setActivityAndStatus();
            console.log('\x1b[31m[ CORE ]\x1b[0m \x1b[32m%s\x1b[0m', 'Bot Activity Set Successfully ✅');
        }, 2000);

        setInterval(async () => {
            await updateMemberCountActivity();
            await setActivityAndStatus();
        }, 6000); // Rotate activity

        setInterval(updateMemberCountActivity, 30000); 

        client.setActivityAndStatus = (activity, status) => {
            apiOverride.activity = activity ? { name: activity.name, type: activity.type } : null;
            apiOverride.status = status || null;
            setActivityAndStatus();
        };
    },
};
