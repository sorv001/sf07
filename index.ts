const express = require('express');

const app = express();

import { Request, response, Response } from "express";
import { rmSync } from "fs";

const pool = require('./connection');

app.use(express.json());

app.get('/users',async(req:Request, res:Response)=>{
    try{
        const getUsers = await pool.query(`SELECT * FROM users`);
        res.json(getUsers.rows);
    }
    catch(err:any){
        console.log(err.message);
    }
})

app.get('/users/:id', async(req:Request, res: Response)=>{

    const id = Number(req.params.id);
    pool.query(`SELECT * FROM users WHERE id = $1`,[id],(error:Error,result:any) =>{
        if(error)
        {
            res.status(400).send("You have entered incorrect id!!!OOPS");
        }
        else{
            res.status(200).json(result.rows);
        }
    })

})

app.post('/add', async (req: Request, res: Response)=>{
    try{
        const {id, firstname, middlename, lastname, email, phone, role, address} = req.body;
        const newuser = await pool.query(`INSERT INTO users (id, firstname, middlename, lastname, email ,phone, role, address)
            values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`,[id, firstname, middlename, lastname, email, phone, role, address]);
        res.json('successfully created !!Hooray!!');
    }
    catch(err:any)
    {
        console.log(err.message);
    }
})

app.put('/update/:id', async (req:Request,res:Response)=>{
    try {
        const {id} = req.params;
        const{firstname,middlename,lastname,email,phone,role,address}=req.body;
        const updateUser = await pool.query('UPDATE users SET firstname=$1, middlename=$2,lastname=$3,email=$4,phone=$5,role=$6,address=$7 WHERE id=$8',[firstname,middlename,lastname,email,phone,role,address,id]);
        res.json('User is succesfully updated!!');
    } catch (err: any) {
        console.log('err.message');
    }
})

app.delete('/delete/:id',async(req: Request, res:Response)=>{
    try {
        const {id} = req.params;
        const deleteUser = await pool.query('DELETE FROM users WHERE id=$1',[id]);
        res.json('Successfully delted!');
    } catch (err:any) {
        console.log(err.message);
    }
})

app.listen(3000,()=>{
    console.log(`listening on port no : 3000`)
})