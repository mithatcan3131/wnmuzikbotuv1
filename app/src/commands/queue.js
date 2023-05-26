const embed = require('../embeds/embeds');


module.exports = {
    name: 'queue',
    aliases: ['q', 'list'],
    description: 'Çalma listesini göster',
    usage: 'queue',
    voiceChannel: true,
    options: [],

    execute(client, message) {
        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.currentTrack)
            return message.reply({ content: `❌ | Şu anda çalan müzik yok`, allowedMentions: { repliedUser: false } });


        const tracks = queue.tracks.map((track, index) => `${++index}. ${track.title}`);

        let nowplaying = `Şuan çalan müzik : ${queue.currentTrack.title}\n\n`;
        let tracksQueue = '';

        if (tracks.length < 1) {
            tracksQueue = '------------------------------';
        }
        else if (tracks.length > 9) {
            tracksQueue = tracks.slice(0, 10).join('\n');
            tracksQueue += `\nve ${tracks.length - 10} müziği`;
        }
        else {
            tracksQueue = tracks.join('\n');
        }

        let loopStatus = queue.repeatMode ? (queue.repeatMode === 2 ? 'All' : 'One') : 'Off';
        return message.reply({ embeds: [embed.Embed_queue("Çalma listesi", nowplaying, tracksQueue, loopStatus)], allowedMentions: { repliedUser: false } });
    },

    slashExecute(client, interaction) {
        const queue = client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.currentTrack)
            return interaction.reply({ content: `❌ | Şu anda çalan müzik yok`, allowedMentions: { repliedUser: false } });


        const tracks = queue.tracks.map((track, index) => `${++index}. ${track.title}`);

        let nowplaying = `Şuan çalan müzik : ${queue.currentTrack.title}\n\n`;
        let tracksQueue = '';

        if (tracks.length < 1) {
            tracksQueue = '------------------------------';
        }
        else if (tracks.length > 9) {
            tracksQueue = tracks.slice(0, 10).join('\n');
            tracksQueue += `\nve ${tracks.length - 10} müziği`;
        }
        else {
            tracksQueue = tracks.join('\n');
        }

        let loopStatus = queue.repeatMode ? (queue.repeatMode === 2 ? 'All' : 'One') : 'Off';
        return interaction.reply({ embeds: [embed.Embed_queue("Çalma listesi", nowplaying, tracksQueue, loopStatus)] });
    },
};
