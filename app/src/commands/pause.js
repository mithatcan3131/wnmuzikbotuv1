module.exports = {
    name: 'pause',
    aliases: [],
    description: 'Müziği duraklat',
    usage: 'pause',
    voiceChannel: true,
    options: [],

    execute(client, message) {
        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying())
            return message.reply({ content: `❌ | Şu anda çalan müzik yok`, allowedMentions: { repliedUser: false } });

        const success = queue.node.pause();
        return success ? message.react('⏸️') : message.reply({ content: `❌ | Yanlış bir yerde`, allowedMentions: { repliedUser: false } });
    },

    slashExecute(client, interaction) {
        const queue = client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying())
            return interaction.reply({ content: `❌ | Şu anda çalan müzik yok`, allowedMentions: { repliedUser: false } });

        const success = queue.node.pause();
        return success ? interaction.reply("⏸️ | Müzik duraklatıldı") : interaction.reply({ content: `❌ | Yanlış bir yerde`, allowedMentions: { repliedUser: false } });
    },
};