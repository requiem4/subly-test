import path from 'path'
import multer from "multer";
const maxSize = 10 * 1000 * 1000; //10 MB
const upload = multer({
    dest: 'uploads',
    limits: {fileSize: maxSize},
    fileFilter: (req: Express.Request, file: Express.Multer.File, callback: any) => {

        // Set the filetypes, it is optional
        const fileTypes = /wav|mp4/;
        const mimeType = fileTypes.test(file.mimetype);

        const extname = fileTypes.test(path.extname(
            file.originalname).toLowerCase());

        if (mimeType && extname) {
            return callback(null, true);
        }

        callback(new Error("Error: File upload only supports the "
            + "following filetypes - " + fileTypes));
    },

// mypic is the name of file attribute
}).array('files')

export default upload