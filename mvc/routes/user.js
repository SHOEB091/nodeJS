const express = require('express');
const router = express.Router();

const { 
    handleGetAllUsers,
    getUserById,
    postMethod,
    PatchMethod,
    DeleteMethod 
} = require('../controllers/user');

// Define routes
router.route("/")
    .get(handleGetAllUsers)
    .post(postMethod);

router.route("/:id")
    .get(getUserById)
    .patch(PatchMethod)
    .delete(DeleteMethod);

module.exports = router;