const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

router.get('/article', (req, res) => {
    res.send('게시글 목록이 들어갈 페이지입니다.');
});

router.get("/article/:articleId", (req, res) => {
    const id = req.params.articleId;
    const [detail] = articles.filter(item => item.id === Number(id));
    res.json({ detail });
})

module.exports = router;