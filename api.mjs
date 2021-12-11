import paizaExec from './paiza.mjs';

import express from 'express'
const router = express.Router()

// プログラムの実行
// TODO GET → POST
// URL例: http://localhost:3000/api/paiza/python?sourceCode=print('hello')%0D%0Aprint(input())&lang=python&input=abc
router.get('/:lang', async (req, res) => {
    const result = await paizaExec(req.query['lang'], req.query['sourceCode'], req.query['input'] ?? '', 2);
    res.json(result)
})

export default  router;