module.exports = {
    name: 'loop',
    aliases: ['lp'],
    description: 'Döngü modunu değiştir',
    usage: 'loop <all/one/off>',
    voiceChannel: true,
    options: [
        {
            name: "mode",
            description: "Döngü modu",
            type: 3,
            required: true,
            choices: [
                {
                    name: "Off",
                    value: "off"
                },
                {
                    name: "All",
                    value: "all"
                },
                {
                    name: "One",
                    value: "one"
                }
            ]
        }
    ],

    execute(client, message, args) {
        const queue = client.player.nodes.get(message.guild.id);
        const prefix = client.config.prefix;

        if (!queue || !queue.isPlaying())
            return message.reply({ content: `❌ | Şu anda çalan müzik yok`, allowedMentions: { repliedUser: false } });

        let mode = null;
        const methods = ['Off', 'Single', 'All'];

        if (!args[0])
            return message.reply({ content: `❌ | ${prefix}loop <all/one/off>`, allowedMentions: { repliedUser: false } });

        switch (args[0].toLowerCase()) {
            case 'off':
                mode = 0;
                break;
            case 'one' || 'single':
                mode = 1;
                break;
            case 'all' || 'queue':
                mode = 2;
                break;
            default:
                return message.reply({ content: `❌ | ${prefix}loop <all/one/off>`, allowedMentions: { repliedUser: false } });
        }
        queue.setRepeatMode(mode);

        message.react('👍');
        return message.reply({ content: `Bir döngü \`${methods[mode]}\` ayarlanır`, allowedMentions: { repliedUser: false } });
    },

    slashExecute(client, interaction) {
        const queue = client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying())
            return interaction.reply({ content: `❌ | Şu anda çalan müzik yok`, allowedMentions: { repliedUser: false } });


        const methods = {
            off: 0,
            one: 1,
            all: 2
        }
        const names = {
            off: "Off",
            one: "Single",
            all: "All"
        }

        queue.setRepeatMode(methods[interaction.options.getString("mode")]);

        return interaction.reply({ content: `Set loop to \`${names[interaction.options.getString("mode")]}\``, allowedMentions: { repliedUser: false } });
    },
};
