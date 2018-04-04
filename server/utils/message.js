let moment = require('moment');

let generateMessage = (from, text) => {
    return {
        from,
        text,
        craetedAt: moment().valueOf()
    };
};

let generateLocationMessage = (from, lat, lon) => {
    return {
        from,
        url: `https://google.com/maps?q=${lat},${lon}`,
        craetedAt: moment().valueOf()
    }
};

module.exports = {generateMessage, generateLocationMessage};
