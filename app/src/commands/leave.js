module.exports = {
    name: 'leave',
    aliases: ['stop'],
    description: 'Müzik çalmayı bırakın ve sesten çıkın',
    usage: 'leave',
    voiceChannel: true,
    options: [],

    execute(client, message) {
        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying())
            return message.reply({ content: `❌ | Şu anda çalan müzik yok`, allowedMentions: { repliedUser: false } });

        if (!queue.deleted)
            queue.delete();

        return message.react('👍');
    },

    slashExecute(client, interaction) {
        const queue = client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying())
            return interaction.reply({ content: `❌ | Şu anda çalan müzik yok`, allowedMentions: { repliedUser: false } });

        if (!queue.deleted)
            queue.delete();

        return interaction.reply('✅ | Müzik çalmayı durdurdu ve sesten ayrıldı');
    },
};