const express = require('express');
const jwt = require("jsonwebtoken");
const User = require('../schemas/user');
const authMiddleWare = require("../middlewares/auth");

const router = express.Router();

// 회원가입
router.post("/users", async (req, res) => {
    const { nickname, password, confirmPassword } = req.body;

    // 닉네임 유효 확인
    const nickReg = /^[a-zA-Z0-9]{3,}$/;
    if (!nickReg.test(nickname)) {
        res.status(400).send({
            errorMessage: "닉네임은 최소 3자 이상이어야 하며, 특수문자는 포함되지 않습니다.",
        })
        return;
    }

    // 비밀번호 자릿수 확인
    if (password.length < 4) {
        res.status(400).send({
            errorMessage: "비밀번호는 최소 4자 이상이어야 합니다.",
        })
        return;
    }

    // 비밀번호 내 닉네임 포함 여부 확인
    if (password.includes(nickname)) {
        res.status(400).send({
            errorMessage: "비밀번호에 닉네임은 포함할 수 없습니다.",
        })
        return;
    }

    // 비밀번호 확인 일치 여부 확인
    if (password != confirmPassword) {
        res.status(400).send({
            errorMessage: "비밀번호와 비밀번호 확인란이 일치하지 않습니다.",
        })
        return;
    }

    // 닉네임 중복 확인
    const existUser = await User.find({ nickname });
    if (existUser.length) {
        res.status(400).send({
            errorMessage: "중복된 닉네임입니다.",
        })
        return;
    }

    const user = new User({ nickname, password });
    await user.save();

    res.status(201).send({ user });
});

// 로그인
router.post("/login", async (req, res) => {
    const { nickname, password } = req.body;

    const user = await User.findOne({ nickname, password }).exec();

    if (!user) {
        res.status(400).send({
            errorMessage: "닉네임 또는 비밀번호를 확인해주세요",
        });
    }

    console.log(user.userId);
    const token = jwt.sign({ userId: user.userId }, "my-secret-key");
    res.send({ token });
})

// 사용자 인증
router.get("/users/auth", authMiddleWare, async (req, res) => {
    const { user } = res.locals;

    res.send({
        user,
    });
});

module.exports = router;