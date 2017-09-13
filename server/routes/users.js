var express = require('express');
var router = express.Router();
var User = require('../models/user')
var mongoose = require('mongoose');

/* GET users listing. */
router.get('/', function (req, res, next) {
	res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
	let param = {
		userName: req.body.userName,
		userPwd: req.body.userPwd
	}

	// 把用户名，去数据库查询，看看是否存在
	User.findOne(param, function (err, doc) {
		if (err) {
			res.json({
				status: '1',
				msg: '用户名或密码错误'
			})
		} else {
			if (doc) {
				res.cookie('userId', doc.userId, {
					path: '/',
					maxAge: 60 * 60 * 24
				})

				res.cookie('userName', doc.userName, {
					path: '/',
					maxAge: 60 * 60 * 24
				})

				if (doc) {
					res.json({
						status: '0',
						msg: '',
						result: {
							userName: doc.userName
						}
					})
				}
			} else {
				res.json({
					status: '1',
					msg: '',
					result: '用户名密码错误'
				})
			}
		}
	})

})
// 验证用户名
router.post('/checkUserName', function (req, res, next) {
	let param = {
		userName: req.body.userName
	}

	User.findOne(param, function (err, doc) {
		if (err) {
			res.json({
				status: '1',
				msg: '用户名错误'
			})
		} else {
			if (!doc) {
				res.json({
					status: '0',
					msg: '用户名可以注册',
					result: doc
				})
			} else {
				res.json({
					status: '1',
					msg: '用户名已存在',
					result: ''
				})
			}
		}
	})
})

// 注册接口
router.post('/register', function (req, res, next) {
	let userName = req.body.userName,
		userPwd = req.body.userPwd;
	let str = parseInt(Math.random() * 999999999 + 100000000);
	let userId = str.toString();
	User.findOne({userId:userId},function(err,doc) {
		if (err) {
			res.json({
				status: '1',
				msg: '',
				result: err
			})
		} else {
			if (!doc) {
				let addUser = new User({
					"userId": userId,
					"userName": userName,
					"userPwd": userPwd,
				})
				addUser.save((err) => {
					if (err) throw err;
					res.json({
						status: '0',
						msg: '用户注册成功'
					})
				})
			} else {
				res.json({
					status: '1',
					msg: 'Id已存在',
					result:''
				})
			}
		}
	})


})
// 判断用户是否登录
router.get('/checkLogin', function (req, res, next) {
	if (req.cookies.userId) {
		res.json({
			status: '0',
			msg: '',
			result: req.cookies.userName || ''
		})
	} else {
		res.json({
			status: '1',
			msg: '未登录',
			result: ''
		})
	}
})


router.post('/logout', function (req, res, next) {
	res.cookie("userId", "", {
		path: '/',
		maxAge: -1
	});
	res.json({
		status: '0',
		msg: '',
		result: '退出成功'
	})
})

// 查询购物车列表
router.get("/cartList", function (req, res, next) {
	let userId = req.cookies.userId;
	User.findOne({ userId: userId }, function (err, doc) {
		if (err) {
			res.json({
				status: '1',
				msg: err.message,
				result: ''
			})
		} else {
			if (doc) {
				res.json({
					status: '0',
					msg: '',
					result: doc.cartList
				})
			}
		}
	})
})

// 购物车数量操作
router.post("/cartEdit", function (req, res, next) {
	let userId = req.cookies.userId,
		productId = req.body.productId,
		productNum = req.body.productNum,
		checked = req.body.checked;
	User.update({ "userId": userId, "cartList.productId": productId }, {
		"cartList.$.productNum": productNum,
		"cartList.$.checked": checked,
	}, function (err, doc) {
		if (err) {
			res.json({
				status: '1',
				msg: err.message,
				result: ''
			})
		} else {
			res.json({
				status: '0',
				msg: '',
				result: '商品数量改变成功'
			})
		}
	})
})

// 删除商品
router.post("/cartDel", function (req, res, next) {
	var userId = req.cookies.userId,productId = req.body.productId;

	User.update({
		userId: userId
	}, {
			$pull: {
				'cartList': {
					'productId': productId
				}
			}
		}, function (err, doc) {
			if (err) {
				res.json({
					status: '1',
					msg: err.message,
					result: ''
				})
			} else {
				res.json({
					status: '0',
					msg: '',
					result: '商品删除成功'
				})
			}
		})
})

// 全选
router.post("/editCheckAll", function (req, res, next) {
	let userId = req.cookies.userId,
		checkAll = req.body.checkAll ? '1' : '0';

	User.findOne({ userId: userId }, function (err, doc) {
		if (err) {
			res.json({
				status: '1',
				msg: err.message,
				result: ''
			})
		} else {
			doc.cartList.forEach((item) => {
				item.checked = checkAll;
			})
			doc.save(function (err1, doc1) {
				if (err1) {
					res.json({
						status: '1',
						msg: err.message,
						result: ''
					})
				} else {
					res.json({
						status: '0',
						msg: '',
						result: '操作成功'
					})
				}
			})

		}
	})
})

router.get('*', function (req, res, next) {
	res.send('世界都是中国的!');
})
module.exports = router;
