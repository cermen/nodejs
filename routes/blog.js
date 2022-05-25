const express = require('express');
const Article = require('../schemas/article')
const router = express.Router();

// 게시글 조회
router.get('/article', async (req, res) => {
    const articles = await Article.find().sort({"date": -1});
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
    res.json({ detail });
})

// 게시글 수정
router.put('/article/:articleId', async (req, res) => {
    const { articleId, title, content, password } = req.body;

    const article = await Article.find({ articleId: Number(articleId) });
    const pwd = article[0].password;
    if (article.length && (password === pwd)) {
        await Article.updateOne({ articleId: Number(articleId) }, { $set: { title, content } });
    }

    res.json({ success: true });
})

// 게시글 삭제
router.delete("/article/:articleId", async (req, res) => {
    const { articleId, password } = req.body;

    const article = await Article.find({ articleId: Number(articleId) });
    const pwd = article[0].password;
    if (article.length && (password === pwd)) {
        await Article.deleteOne({ articleId });
    }
  
    res.json({ result: "success" });
});

module.exports = router;