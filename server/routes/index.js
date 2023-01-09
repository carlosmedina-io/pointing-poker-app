const express = require("express");
const router = express.Router();

const API_VERSION = "v1";
const BASE_PATH = `/api/${API_VERSION}`;

router.get(BASE_PATH, (req, res) => {
    res.json({
        message: "Hello fella!"
    });
});

module.exports = router;