const nodemailer = require('nodemailer');
const SMTP_CONFIG = require('../config/smtp')
const path = require('path');
const fs = require('fs');

const rootDir = require('../util/path')

const dirPath = path.resolve(rootDir, 'tmp', 'uploads')

exports.pageUpload = (req, res) => {
    const titulo = req.body.title
    console.log(titulo)

    const getMostRecentFile = (dirPath) => {
      const files = orderRecentFiles(dirPath);
      return files.length ? files[0] : undefined;
    };
  
    const orderRecentFiles = (dirPath) => {
      return fs
        .readdirSync(dirPath)
        .filter(file => fs.lstatSync(path.join(dirPath, file)).isFile())
        .map(file => ({ file, mtime: fs.lstatSync(path.join(dirPath, file)).mtime }))
        .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    };
  
    let rFile = getMostRecentFile(dirPath).file
    
    console.log(getMostRecentFile(dirPath).file, 'file')
    console.log(getMostRecentFile(dirPath).mtime, 'mtime')

    const transporter = nodemailer.createTransport({
      service: SMTP_CONFIG.service,
        auth: {
          user: SMTP_CONFIG.user,
          pass: SMTP_CONFIG.pass
        }
    });
      
    const email = {
      from: SMTP_CONFIG.user,
      to: 'rdg6design@gmail.com',
      subject: titulo,
      text: 'aqui vai meu texto',
      attachments: [
        {
          filename: rFile,
          path: `${dirPath}/${rFile}`,
        }
      ]
    }
      
    transporter.sendMail(email, (err, result) => {
      if(err) return console.log(err)
      console.log('E-mail enviado com sucesso!!!')
    })

  res.send('Arquivo enviado com sucesso!!!')
}
