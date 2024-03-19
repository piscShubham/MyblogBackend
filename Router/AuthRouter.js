const express=require('express');
const router=express.Router();

const controller=require('../Controller/AuthController')

// router
router.post('/signup',controller.Signup);


exports.router=router;