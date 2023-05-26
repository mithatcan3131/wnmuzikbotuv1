module.exports = {
    name: 'resume',
    aliases: [],
    description: '一Duraklatılmış müzik çal',
    usage: 'resume',
    voiceChannel: true,
    options: [],

    execute(client, message) {
        const queue = client.player.nodes.get(message.guild.id);

        if (!queue)
            return message.reply({ content: `❌ | Şu anda çalan müzik yok`, allowedMentions: { repliedUser: false } });

        const success = queue.node.resume();
        return success ? message.react('▶️') : message.reply({ content: `❌ | yanlış bir yerde`, allowedMentions: { repliedUser: false } });
    },

    slashExecute(client, interaction) {
        const queue = client.player.nodes.get(interaction.guild.id);

        if (!queue)
            return interaction.reply({ content: `❌ | Şu anda çalan müzik yok`, allowedMentions: { repliedUser: false } });

        const success = queue.node.resume();
        return success ? interaction.reply("▶️ | Başlat") : interaction.reply({ content: `❌ | yanlış bir yerde`, allowedMentions: { repliedUser: false } });
    },
};