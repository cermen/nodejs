const express = require('express');
const res = require('express/lib/response');
const router = express.Router();

/* 테스트 데이터 */
// const articles = [
//     {
//         userId: 1,
//         id: 1,
//         title: "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//         body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
//     },
//     {
//         userId: 1,
//         id: 2,
//         title: "qui est esse",
//         body: "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla",
//     },
// ];

router.get('/article', (req, res) => {
    res.send('게시글 목록이 들어갈 페이지입니다.');
});

router.get("/article/:id", (req, res) => {
    const id = req.params.id;
    const [detail] = articles.filter(item => item.id === Number(id));
    res.json({ detail });
})

module.exports = router;