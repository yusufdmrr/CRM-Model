const express = require('express')
const router = express.Router()
const { inputControllerMiddleware,} = require('../../middleware/inputController')
const { upload } = require('../../helpers/multer')
const { setUserInput, LoginInput, getUsersInput, updateUsersInput, deleteUsersInput, changePasswordInput, setNewPasswordInput } = require('../../controllers/User/types')
const { setUser, Login, getUsers, updateUsers, deleteUsers, changePassword, setNewPassword } = require('../../controllers/User/user')

router.route('/setUser').post(inputControllerMiddleware(setUserInput, setUser, 'post', true))
router.route('/Login').post(inputControllerMiddleware(LoginInput, Login, 'post', true))
router.route('/getUsers').post(inputControllerMiddleware(getUsersInput, getUsers, 'post', true))
router.route('/updateUsers').post(inputControllerMiddleware(updateUsersInput, updateUsers, 'post', true))
router.route('/deleteUsers').post(inputControllerMiddleware(deleteUsersInput, deleteUsers, 'post', true))
router.route('/changePassword').post(inputControllerMiddleware(changePasswordInput, changePassword, 'post', true))
router.route('/setNewPassword').post(inputControllerMiddleware(setNewPasswordInput, setNewPassword, 'post', true))

module.exports = router
