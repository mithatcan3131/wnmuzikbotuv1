module.exports = {
    name: 'volume',
    aliases: ['v'],
    description: `Ses seviyesini değiştir`,
    usage: 'v <0-100>',
    voiceChannel: true,
    options: [
        {
            name: "volume",
            description: "Lütfen ses yüzdesini girin",
            type: 4,
            required: true,
            min_value: 1
        }
    ],

    async execute(client, message, args) {
        const maxVolume = client.config.maxVolume;
        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying())
            return message.reply({ content: `❌ | Şu anda çalan müzik yok`, allowedMentions: { repliedUser: false } });


        await message.react('👍');
        const vol = parseInt(args[0], 10);

        if (!vol)
            return message.reply({ content: `Mevcut Ses Seviyesi: **${queue.node.volume}** 🔊\n**Sesi değiştirmek için \`1\` ～ \`${maxVolume}\` Lütfen sayısını girin**`, allowedMentions: { repliedUser: false } });

        if (queue.volume === vol)
            return message.reply({ content: `❌ | Ses seviyesi mevcut ses seviyesi ile aynı`, allowedMentions: { repliedUser: false } });

        if (vol < 0 || vol > maxVolume)
            return message.reply({ content: `❌ | **Sesi değiştirmek için \`1\` ～ \`${maxVolume}\` Lütfen sayısını girin**`, allowedMentions: { repliedUser: false } });


        const success = queue.node.setVolume(vol);
        const replymsg = success ? `🔊 **${vol}**/**${maxVolume}**%` : `❌ | yanlış bir yerde`;
        return message.reply({ content: replymsg, allowedMentions: { repliedUser: false } });
    },

    async slashExecute(client, interaction) {
        const maxVolume = client.config.maxVolume;
        const queue = client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying())
            return interaction.reply({ content: `❌ | Şu anda çalan müzik yok`, allowedMentions: { repliedUser: false } });

        const vol = parseInt(interaction.options.getInteger("volume"), 10);

        if (!vol)
            return interaction.reply({ content: `Mevcut Ses Seviyesi: **${queue.node.volume}** 🔊\n**Sesi değiştirmek için \`1\` ～ \`${maxVolume}\` Lütfen sayısını girin**`, allowedMentions: { repliedUser: false } });

        if (queue.volume === vol)
            return interaction.reply({ content: `❌ | Ses seviyesi mevcut ses seviyesi ile aynı`, allowedMentions: { repliedUser: false } });

        if (vol < 0 || vol > maxVolume)
            return interaction.reply({ content: `❌ | **Sesi değiştirmek için \`1\` ～ \`${maxVolume}\` Lütfen sayısını girin**`, allowedMentions: { repliedUser: false } });


        const success = queue.node.setVolume(vol);
        const replymsg = success ? `🔊 **${vol}**/**${maxVolume}**%` : `❌ | yanlış bir yerde`;
        return interaction.reply({ content: replymsg, allowedMentions: { repliedUser: false } });
    },
};