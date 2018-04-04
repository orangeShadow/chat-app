let generateMessage = (from, text) => {
    return {
        from,
        text,
        craetedAt: new Date().getTime()
    };
};

let generateLocationMessage = (from, lat, lon) => {
    return {
        from,
        url: `https://google.com/maps?q=${lat},${lon}`,
        craetedAt: new Date().getTime()
    }
};

module.exports = {generateMessage, generateLocationMessage};
