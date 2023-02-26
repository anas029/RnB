// const multer = require('multer');

// const upload = multer({
//     limits: {
//         fileSize: 4 * 1024 * 1024,
//     }
// });

// module.exports = upload


// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, 'uploads/');
//     },
//     filename: function (req, file, cb) {
//       cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
//     }
//   });
  
//   const upload = multer({ storage: storage });

  
//   app.post('/upload', upload.single('image'), (req, res) => {
//     res.send('Image uploaded successfully');
//   });

//   In this example, we are using the upload.single() method to handle a single file upload with the field name of image.

// Finally, you can test your image upload endpoint using a form with an input field of type file:


// <form action="/upload" method="post" enctype="multipart/form-data">
//   <input type="file" name="image">
//   <button type="submit">Upload Image</button>
// </form>



