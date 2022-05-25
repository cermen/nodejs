const express = require('express');
const Article = require('../schemas/article')
const router = express.Router();

// 게시글 조회
router.get('/article', async (req, res) => {
    const articles = await Article.find();

    res.json({ articles: articles });
});

// 게시글 작성
router.post('/article', async (req, res) => {
    const { articleId, title, author, date, content, password } = req.body;
    
    const createdArticle = await Article.create({ articleId, title, author, date, content, password });
    res.json({ article: createdArticle });

})

// 게시글 상세 조회
router.get('/article/:articleId', async (req, res) => {
    const id = req.params.articleId;
    const detail = await Article.findOne({ articleId: id });

    console.log(detail);
    res.json({ detail });
})

module.exports = router;