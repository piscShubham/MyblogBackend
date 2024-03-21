const express=require('express');
const router=express.Router();

const controller=require('../Controller/AuthController')
router.post('/signup',controller.Signup);
router.post('/login',controller.Login);
exports.router=router;