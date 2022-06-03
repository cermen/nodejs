const express = require('express');
const Article = require('../schemas/article');
const Comment = require('../schemas/comment');
const authMiddleWare = require("../middlewares/auth");
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
    const id = req.params.articleId;
    const { title, content, password } = req.body;

    const article = await Article.find({ articleId: Number(id) });
    const pwd = article[0].password;
    if (article.length && (password === pwd)) {
        await Article.updateOne({ articleId: Number(id) }, { $set: { title, content } });
    }

    res.json({ success: true });
})

// 게시글 삭제
router.delete("/article/:articleId", async (req, res) => {
    const id = req.params.articleId;
    const { password } = req.body;

    const article = await Article.find({ articleId: Number(id) });
    const pwd = article[0].password;
    if (article.length && (password === pwd)) {
        await Article.deleteOne({ articleId: Number(id) });
    }
  
    res.json({ result: "success" });
});

// 댓글 조회
router.get("/article/:articleId/comments", async (req, res) => {
    const id = req.params.articleId;
    const comments = await Comment.find({ articleId: Number(id) }).sort({"date": -1});
    res.json({ comments: comments });
});

// 댓글 작성
router.post("/article/:articleId/comments", authMiddleWare, async (req, res) => {
    const user = res.locals.user;
    const articleId = req.params.articleId;

    const { commentId, date, content } = req.body;
    if (!content) {     // 댓글 내용이 없을 경우
        res.status(400).send({
            errorMessage: "댓글 내용을 입력해주세요."
        })
        return;
    }
    const comment = await Comment.create({ commentId, articleId, author: user.nickname, date, content });
    res.json({ comment: comment });
});

// 댓글 수정
router.put('/article/:articleId/comments/:commentId', authMiddleWare, async (req, res) => {
    const user = res.locals.user;
    
    const commentId = req.params.commentId;
    const { content } = req.body;

    const comment = await Comment.find({ commentId: Number(commentId) });
    if (comment[0].author === user.nickname) {
        await Comment.updateOne({ commentId: Number(commentId) }, {$set: { content }});
    }

    res.json({ success: true });
});

// 댓글 삭제
router.delete('/article/:articleId/comments/:commentId', authMiddleWare, async (req, res) => {
    const user = res.locals.user;
    
    const commentId = req.params.commentId;

    const comment = await Comment.find({ commentId: Number(commentId) });
    if (comment[0].author === user.nickname) {
        await Comment.deleteOne({ commentId: Number(commentId) });
    }
  
    res.json({ result: "success" });
});

module.exports = router;