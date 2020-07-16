import multer from 'multer'
import path from 'path'

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Upload folder name
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
const maxSize = 10 * 1000 * 1000; //10 MB
const upload = multer({
    storage: storage,
    limits: {fileSize: maxSize},
    fileFilter: function (req, file, cb) {

        // Set the filetypes, it is optional
        var filetypes = /wav|mp4/;
        var mimetype = filetypes.test(file.mimetype);

        var extname = filetypes.test(path.extname(
            file.originalname).toLowerCase());

        if (mimetype && extname) {
            return cb(null, true);
        }

        cb(new Error("Error: File upload only supports the "
            + "following filetypes - " + filetypes));
    }

// mypic is the name of file attribute
}).array("files")

export default upload