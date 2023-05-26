const embed = require('../embeds/embeds');


module.exports = {
    name: 'ping',
    aliases: [],
    description: 'Sunucu pingini al',
    usage: 'ping',
    options: [],

    execute(client, message) {
        message.reply({ embeds: [embed.Embed_ping(client.ws.ping)], allowedMentions: { repliedUser: false } });
    },

    slashExecute(client, interaction) {
        interaction.reply({ embeds: [embed.Embed_ping(client.ws.ping)], allowedMentions: { repliedUser: false } });
    },
};
