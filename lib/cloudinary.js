const multer = require("multer");
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;


// Return "https" URLs by setting secure: true
cloudinary.config({ secure: true });



const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: 'ImagesUpload',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }
});


const upload = multer({ storage });

module.exports = upload