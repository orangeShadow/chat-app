let generateMessage = (from, text) => {
    return {
        from,
        text,
        craetedAt: new Date().getTime()
    };
};

module.exports = {generateMessage};
