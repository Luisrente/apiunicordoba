const { Router } = require("express");
const { check } = require("express-validator");

const {
  validarCampos,
  validarJWT,
  esAdminRole,
  tieneRole,
} = require("../middlewares");

const {
  esRoleValido,
  emailExiste,
  existeUsuarioPorId,
} = require("../helpers/db-validators");

const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
  usuariosPatch,
  usuariosPas,
  usuariosPuthuella,
  getUserByHuella,
  usuariosToken
} = require("../controllers/usuarios");

const router = Router();

router.get("/:documento", usuariosGet);
router.get("/user/:id", usuariosPas);
router.get("/huella/:index", usuariosPuthuella);
router.get("/gethuella/:id", getUserByHuella);

router.post("/personat", usuariosToken);


router.put(
  "/:id",
  [
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    // check("rol").custom(esRoleValido),
    validarCampos,
  ],
  usuariosPut
);

// router.put('/:id',[
//     // check('id', 'No es un ID válido').isMongoId(),
//     // check('id').custom( existeUsuarioPorId ),
//     // check('rol').custom( esRoleValido ),
//     // validarCampos
// ],usuariosPuthuella );

router.post(
  "/",
  [
    // check("nombre", "El nombre es obligatorio").not().isEmpty(),
    // check('password', 'El password debe de ser más de 6 letras').isLength({ min: 6 }),
    check("correo", "El correo no es válido").isEmail(),
    check("correo").custom(emailExiste),
    // check('rol', 'No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    // check('rol').custom( esRoleValido ),
    validarCampos,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    validarJWT,
    // esAdminRole,
    tieneRole("ADMIN_ROLE", "VENTAR_ROLE", "OTRO_ROLE"),
    check("id", "No es un ID válido").isMongoId(),
    check("id").custom(existeUsuarioPorId),
    validarCampos,
  ],
  usuariosDelete
);

router.patch("/", usuariosPatch);

module.exports = router;
