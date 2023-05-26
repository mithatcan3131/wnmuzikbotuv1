const embed = require('../embeds/embeds');


module.exports = {
    name: 'remove',
    aliases: ['r'],
    description: 'Çalma listesindeki herhangi bir müziği silin',
    usage: 'remove <song index number>',
    voiceChannel: true,
    options: [],

    async execute(client, message) {
        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying())
            return message.reply({ content: `❌ | Şu anda çalan müzik yok`, allowedMentions: { repliedUser: false } });


        const tracks = queue.tracks.map((track, index) => `${++index}. ${track.title}`);

        if (tracks.length < 1)
            return message.reply({ content: `❌ | Geçerli müzik çalma listesinde sondadır`, allowedMentions: { repliedUser: false } });


        let nowplaying = `Şuan çalan müzik : ${queue.currentTrack.title}\n\n`;
        let tracksQueue = '';

        if (tracks.length > 9) {
            tracksQueue = tracks.slice(0, 10).join('\n');
            tracksQueue += `\nve ${tracks.length - 10} müziği`;
        }
        else {
            tracksQueue = tracks.join('\n');
        }

        const instruction = `Çalma listesinden kaldırmak istediğiniz müziği seçin **1** ～ **${tracks.length}** Lütfen ile girin\nSayı dışında bir sayı girerek iptal edebilirsiniz. ⬇️`;
        let loopStatus = queue.repeatMode ? (queue.repeatMode === 2 ? 'All' : 'ONE') : 'Off';
        await message.reply({ content: instruction, embeds: [embed.Embed_queue("Çalma listesi", nowplaying, tracksQueue, loopStatus)], allowedMentions: { repliedUser: false } });


        const collector = message.channel.createMessageCollector({
            time: 10000, // 10s
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

        collector.on('collect', async (query) => {

            const index = parseInt(query.content);

            if (!index || index <= 0 || index > tracks.length) {
                return message.reply({ content: `✅ | İptal edilmiştir`, allowedMentions: { repliedUser: false } })
                    && collector.stop();
            }

            collector.stop();
            await queue.node.remove(index - 1);

            query.reply({ embeds: [embed.Embed_remove("Müzik çalma listesinden kaldırıldı", tracks[index - 1])], allowedMentions: { repliedUser: false } });
            return query.react('👍');
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time')
                return message.reply({ content: `❌ | Süreniz doldu Lütfen tekrar deneyin`, allowedMentions: { repliedUser: false } });
        });
    },

    async slashExecute(client, interaction) {
        const queue = client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying())
            return interaction.reply({ content: `❌ | Şu anda çalan müzik yok`, allowedMentions: { repliedUser: false } });


        const tracks = queue.tracks.map((track, index) => `${++index}. ${track.title}`);

        if (tracks.length < 1)
            return interaction.reply({ content: `❌ | Geçerli müzik çalma listesinde sondadır`, allowedMentions: { repliedUser: false } });


        let nowplaying = `Şuan çalan müzik : ${queue.currentTrack.title}\n\n`;
        let tracksQueue = '';

        if (tracks.length > 9) {
            tracksQueue = tracks.slice(0, 10).join('\n');
            tracksQueue += `\nve ${tracks.length - 10} müziği`;
        }
        else {
            tracksQueue = tracks.join('\n');
        }

        const instruction = `Çalma listesinden kaldırmak istediğiniz müziği seçin **1** ～ **${tracks.length}** \nSayılar dışında herhangi bir giriş yaparak iptal edebilirsiniz. ⬇️`;
        let loopStatus = queue.repeatMode ? (queue.repeatMode === 2 ? 'All' : 'ONE') : 'Off';
        await interaction.reply({ content: instruction, embeds: [embed.Embed_queue("Çalma listesi", nowplaying, tracksQueue, loopStatus)], allowedMentions: { repliedUser: false } });


        const collector = interaction.channel.createMessageCollector({
            time: 10000, // 10s
            errors: ['time'],
            filter: m => m.author.id === interaction.user.id
        });

        collector.on('collect', async (query) => {
            const index = parseInt(query.content);

            if (!index || index <= 0 || index > tracks.length) {
                return query.reply({ content: `✅ | İptal edilmiştir`, allowedMentions: { repliedUser: false } })
                    && collector.stop();
            }

            collector.stop();
            await queue.node.remove(index - 1);

            query.reply({ embeds: [embed.Embed_remove("Müzik çalma listesinden kaldırıldı", tracks[index - 1])], allowedMentions: { repliedUser: false } });
            return query.react('👍');
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time')
                return interaction.reply({ content: `❌ | Süreniz doldu Lütfen tekrar deneyin`, allowedMentions: { repliedUser: false } });
        });
    },
};
