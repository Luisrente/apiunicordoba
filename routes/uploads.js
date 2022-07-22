const { Router } = require('express');
const { check } = require('express-validator');

//  const { validarCampos } = require('../middlewares');
 const { validarCampos, validarArchivoSubir } = require('../middlewares');
const {actualizarImagenCloudinary } = require('../controllers/uploads');
// const { coleccionesPermitidas } = require('../helpers');


const router = Router();


// router.post( '/', validarArchivoSubir, cargarArchivo );

router.put('/:coleccion/:id', [
     validarArchivoSubir,
    check('id','El id debe de ser de mongo').isMongoId(),
    // check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','asistencias'] ) ),
     validarCampos
], actualizarImagenCloudinary )

// router.put('/:coleccion/:id', [
//     validarArchivoSubir,
//     check('id','El id debe de ser de mongo').isMongoId(),
//     check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] ) ),
//     validarCampos
// ], actualizarImagenCloudinary )
// ], actualizarImagen )

// router.get('/:coleccion/:id', [
//     check('id','El id debe de ser de mongo').isMongoId(),
//     check('coleccion').custom( c => coleccionesPermitidas( c, ['usuarios','productos'] ) ),
//     validarCampos
// ], mostrarImagen  )

module.exports = router;