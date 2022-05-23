const express = require('express');
const router = express.Router();

router.get('/article', (req, res) => {
    res.send('게시글 목록이 들어갈 페이지입니다.');
});

module.exports = router;