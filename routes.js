const routes = require('express').Router()
const multer = require('multer')
const multerConfig = require('./middleware/multer')
const uploadController = require('./controllers/uploadController');

routes.post("/posts", multer(multerConfig).single('file'),  uploadController.paginaUpload)

module.exports = routes 