module.exports = {
    hasNull: (body, attrs) => {
        for (const attr of attrs) {
            if (!body[attr] || body[attr] === undefined || body[attr] === null)
                return true;
        }

        return false;
    }
}