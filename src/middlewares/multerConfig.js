const multer = require('multer');
const path = require('path');

module.exports = {
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'uploads'));
        },
        filename: (req, file, cb) => {
            const date = new Date();
            file.key = `${date.getTime()}-${file.originalname}`;
            cb(null, file.key);
        }
    }),
    dest: path.resolve(__dirname, '..', '..', 'uploads'),
    limits: {
        fileSize: 500 * 1024,
    },

    fileFilter: (req, file, cb) => {
        const allowedMimes = [
            'image/jpeg',
            'image/pjpeg',
            'image/png',
        ];

        if (allowedMimes.includes(file.mimetype))
            cb(null, true)
        else
            cb(new Error('invalid file type'));
    }
}