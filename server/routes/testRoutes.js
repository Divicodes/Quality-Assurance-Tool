import express from 'express';
import { connection } from '../index.js';

const router = express.Router();

router.get('/api', (req, res)=>{
  res.status(200).json({
    test: "API Testing",
    status: "OK"
  })
});

router.get('/db', (req, res)=>{
    connection.query({
      sql: 'SELECT * FROM test'
    }, (err, result)=>{
      if(!err){
        console.log("After Query Run");
        res.status(200).json({
          test: "DB Testing",
          status: "OK",
          data: result
        })
      }
      else{
        res.status(500).json({
          msg: 'Internal Server Error'
        })
      }
      
    })
})

export default router;