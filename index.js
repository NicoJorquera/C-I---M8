const express = require('express');
const app = express();
const expressFileUpload = require('express-fileupload');
const fs = require('fs')

app.use(
  expressFileUpload({
    limits: { fileSize: 5000000},
    abortOnLimit: true,
    responseOnLimit:
      'El peso de la imagen que intenta subir supera el limite permitido'
  })
);
app.use('/imgs', express.static(__dirname + '/imgs'))

app.get('/', (req,res) => {
  res.sendFile(__dirname + '/formulario.html')
});

app.get('/collage', (req, res) => {
  res.sendFile(__dirname + '/collage.html')
})

app.post('/imagen', (req, res) => {
  const { target_file } = req.files;
  const { posicion } = req.body;
  target_file.mv(`${__dirname}/imgs/imagen${posicion}.jpg`, (err) => {
    res.sendFile(__dirname + '/collage.html')
  })
})

app.get('/deleteImg/:imagen', (req, res) => {
  const { imagen } = req.params;
  fs.unlinkSync(__dirname + `/imgs/${imagen}`)
  res.redirect("/collage")
})

app.listen(3000, () => {
  console.log('servidor 2 arriba')
})