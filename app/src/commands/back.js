module.exports = {
    name: 'back',
    aliases: ['b', 'rewind'],
    description: 'Önceki müziği çal',
    usage: 'back',
    voiceChannel: true,
    options: [],

    async execute(client, message) {
        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying())
            return message.reply({ content: `❌ | Şu anda çalan müzik yok`, allowedMentions: { repliedUser: false } });

        if (!queue.history.previousTrack)
            return message.reply({ content: `❌ | Daha önce çalan müzik yok`, allowedMentions: { repliedUser: false } });

        await queue.history.back();
        return await message.react('👍');
    },

    async slashExecute(client, interaction) {
        const queue = client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying())
            return interaction.reply({ content: `❌ | Şu anda çalan müzik yok`, allowedMentions: { repliedUser: false } });

        if (!queue.history.previousTrack)
            return interaction.reply({ content: `❌ | Daha önce çalan müzik yok`, allowedMentions: { repliedUser: false } });

        await queue.history.back();
        return await interaction.reply("✅ | Önceki müziği çal");
    },
};