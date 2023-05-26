module.exports = {
    name: 'time',
    aliases: ["t"],
    description: 'O anda çalan müziğin ilerlemesini görüntüler',
    usage: 'time',
    voiceChannel: true,
    options: [],

    async execute(client, message) {
        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying())
            return message.reply({ content: `❌ | Şu anda çalan müzik yok`, allowedMentions: { repliedUser: false } });

        const progress = queue.node.createProgressBar();
        const timestamp = queue.node.getTimestamp();

        if (timestamp.progress == 'Infinity')
            return message.reply({ content: `❌ | Bu müzik canlı yayınlanıyor görüntülenecek oynatma verisi yok`, allowedMentions: { repliedUser: false } });

        return message.reply({ content: `${progress} (**${timestamp.progress}**%)`, allowedMentions: { repliedUser: false } });
    },

    async slashExecute(client, interaction) {
        const queue = client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying())
            return interaction.reply({ content: `❌ | Şu anda çalan müzik yok`, allowedMentions: { repliedUser: false } });

        const progress = queue.node.createProgressBar();
        const timestamp = queue.node.getTimestamp();

        if (timestamp.progress == 'Infinity')
            return interaction.reply({ content: `❌ | Bu müzik canlı yayınlanıyor görüntülenecek oynatma verisi yok`, allowedMentions: { repliedUser: false } });

        return interaction.reply({ content: `${progress} (**${timestamp.progress}**%)`, allowedMentions: { repliedUser: false } });
    },
};