const jwt = require("jsonwebtoken");
const User = require("../schemas/user");

module.exports = (req, res, next) => {
    const { authorization } = req.headers;
    const [authType, authToken] = authorization.split(" ");

    if (!authToken || authType !== "Bearer") {
        res.status(401).send({
            errorMessage: "로그인 후 이용 가능합니다.",
        });
        return;
    }
    
    try {
        const { userId } = jwt.verify(authToken, "my-secret-key");
        console.log(userId);
        User.findById(userId).then((user) => {
            res.locals.user = user;
            next();
        });
    } catch (err) {
        res.status(401).send({
            errorMessage: "로그인이 필요합니다.",
        });
    }
};