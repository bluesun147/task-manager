const express = require('express');
const User = require('../models/user'); // 유저 모델

// 유저 라우터. index.js에서 분리함.

const auth = require('../middleware/auth') // auth middleware를 individal route에 연결하자

const router = new express.Router(); // create router

// postman 통해 확인해보기
router.post('/users', async (req, res) => { // 유저 생성
    console.log(req.body); // { name: 'Andrew', email: 'andrew@example.com', password: 'Red123!$' }
    const user = new User(req.body); // create new user. 생성자

    try {
        await user.save(); // user를 db에 저장
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        res.status(400).send(e);
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken(); // 직접 정의 함수
        // res.send({user: user.getPublicProfile(), token}); // getPublicProfile: user password, tokens 숨기기 위해
        res.send({ user: user, token });
    } catch (e) {
        res.status(400).send();
    }
})

// 해당 세션만 로그아웃
router.post('/users/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token; // not equal인 경우 체크
        })
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

// 모든 세션에서 log out 
// 로그인 할때마다 token 다름. 여러번(여러 기기로) 로그인한것 다 로그아웃 시키기
router.post('/users/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []; // 다 지움
        await req.user.save(); // 저장

        res.send();
    } catch (e) {
        res.status(500).send();
    }
})

// to add middleware to an individual route, pass it in as an argument. 핸들러 전에. (두번떄 인자)
router.get('/users/me', auth, async (req, res) => {

    res.send(req.user);

    // try { // '/users'
    //     const users = await User.find({});
    //     res.send(users);
    // } catch (e) {
    //     res.status(500).send();
    // }
});

// // fetch individual user by id. : route parameter
// router.get('/users/:id', async (req, res) => {
//     const _id = req.params.id; // route parameter 로 입력한 값

//     try {
//         const user = await User.findById(_id);
//         if (!user) { // 일치하는 값 없어도 failure 아님.
//             return res.status(404).send(); // 찾는 값 없을 때
//         }

//         res.send(user);
//     } catch (e) {
//         res.status(500).send();
//     }
// })

// router.patch('/users/:id', async (req, res) => { // http method, update
router.patch('/users/me', auth, async (req, res) => { // http method, update

    const updates = Object.keys(req.body); // 키들 배열로 리턴

    // 업데이트 허용할 값들
    const allowedUpdates = ['name', 'email', 'password', 'age']; // 나머지는 invalid

    const isValidOperation = updates.every((update) => { // 5개 모두 true 리턴하면 true, 하나라도 false면 false 리턴
        return allowedUpdates.includes(update);
    });

    if (!isValidOperation) { // 모두 만족하지 못하면 (하나라도 false면)
        return res.status(400).send({ error: 'Invalid updates!' });
    }

    try {
        // findByIdAndUpdate bypasses mongoose. it performs direct operation on db. 그래서 runValidators 옵션 작성.
        // const user = await User.findById(req.params.id);

        updates.forEach((update) => {
            req.user[update] = req.body[update];
        })

        await req.user.save();

        // const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true}) // id, 바꿀값, 옵션

        // if (!user) {
        //     return res.status(404).send();
        // }
        res.send(req.user);
    } catch (e) {
        res.status(400).send(e);
    }
})

router.delete('/users/me', auth, async (req, res) => { // /users/:id
    try {
        // const user = await User.findByIdAndDelete(req.params.id);
        // const user = await User.findByIdAndDelete(req.user._id); // 자기 자신의 아이디

        // if (!user) {
        //     return res.status(404).send();
        // }

        await req.user.remove();

        res.send(req.user);
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = router;