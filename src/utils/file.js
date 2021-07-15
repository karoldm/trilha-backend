const path = require('path');
const fs = require('fs');

module.exports = {
    deleteFile: (filename) => {
        fs.unlink(path.resolve(__dirname, '..', '..', 'uploads', filename), (err) => {
            if (err)
                console.log(err);
        });
    }
}
