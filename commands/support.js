/*

  ________.__                        _____.___.___________
 /  _____/|  | _____    ____  ____   \__  |   |\__    ___/
/   \  ___|  | \__  \ _/ ___\/ __ \   /   |   |  |    |   
\    \_\  \  |__/ __ \\  \__\  ___/   \____   |  |    |   
 \______  /____(____  /\___  >___  >  / ______|  |____|   
        \/          \/     \/    \/   \/                  

╔════════════════════════════════════════════════════════════════════════╗
║                                                                        ║
║  ## Created by GlaceYT!                                                ║
║  ## Feel free to utilize any portion of the code                       ║
║  ## DISCORD :  https://discord.com/invite/xQF9f9yUEM                   ║
║  ## YouTube : https://www.youtube.com/@GlaceYt                         ║
║                                                                        ║
╚════════════════════════════════════════════════════════════════════════╝


*/


const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const Icons = require('../UI/Icons');
module.exports = {
    data: new SlashCommandBuilder()
        .setName('support')
        .setDescription('Support server of this Bot'),
    async execute(interaction) {
        const supportServerLink = "https://discord.gg/uc-1111272495497101372";
      

        const embed = new EmbedBuilder()
            .setColor('#b300ff')
            .setAuthor({
                name: 'Support Server',
                iconURL: Icons.dotIcon,
                url: 'https://discord.gg/xQF9f9yUEM'
            })
            .setDescription(`➡️ **Join our Discord server for support and updates:**\n- Discord - ${supportServerLink}\n\n➡️ `)
            .setImage('https://cdn.discordapp.com/attachments/1208349675250389032/1362931534298087445/standard.gif?ex=68043067&is=6802dee7&hm=5e65fec14822e005b04e0ad4b5a436121f92ee6bca0389053364b9dc44b8f59c&')
            .setTimestamp();

        await interaction.reply({ embeds: [embed] });
    },
};
