const { QueryType } = require('discord-player');


/**
 * Constants variables
 */
const cst = {
    button: {
        play        : '►',
        pause       : '❚❚',
        skip        : '►❚',
        back        : '❚◄',
        stop        : '◼',
        loop        : 'Döngü',
        shuffle     : 'Karıştır',
    },
    // Default config
    config: {
        name                : 'WN Müzik Botu',
        prefix              : '+',
        playing             : '+help | WN Müzik',
        defaultVolume       : 50,
        maxVolume           : 100,
        autoLeave           : true,
        autoLeaveCooldown   : 5000,
        displayVoiceState   : true,
        port                : 33333,
        urlQuery            : QueryType.AUTO,
        textQuery           : QueryType.AUTO
    },
    ytdlOptions: {
        filter          : 'audioonly',
        quality         : 'highestaudio',
        highWaterMark   : 1 << 27
    },
    color: {
        white   : '\x1B[0m',
        grey    : '\x1B[2m',
        green   : '\x1B[32m',
        cyan    : '\x1B[36m'
    }
};

module.exports = cst;