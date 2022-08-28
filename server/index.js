"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const app = express();
const pool = require('./connection');
app.use(express.json());
app.get('/users', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const getUsers = yield pool.query(`SELECT * FROM users`);
        res.json(getUsers.rows);
    }
    catch (err) {
        console.log(err.message);
    }
}));
app.get('/users/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    pool.query(`SELECT * FROM users WHERE id = $1`, [id], (error, result) => {
        if (error) {
            res.status(400).send("You have entered incorrect id!!!OOPS");
        }
        else {
            res.status(200).json(result.rows);
        }
    });
}));
app.post('/add', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, firstname, middlename, lastname, email, phone, role, address } = req.body;
        const newuser = yield pool.query(`INSERT INTO users (id, firstname, middlename, lastname, email ,phone, role, address)
            values($1,$2,$3,$4,$5,$6,$7,$8) RETURNING *`, [id, firstname, middlename, lastname, email, phone, role, address]);
        res.json('successfully created !!Hooray!!');
    }
    catch (err) {
        console.log(err.message);
    }
}));
app.put('/update/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { firstname, middlename, lastname, email, phone, role, address } = req.body;
        const updateUser = yield pool.query('UPDATE users SET firstname=$1, middlename=$2,lastname=$3,email=$4,phone=$5,role=$6,address=$7 WHERE id=$8', [firstname, middlename, lastname, email, phone, role, address, id]);
        res.json('User is succesfully updated!!');
    }
    catch (err) {
        console.log('err.message');
    }
}));
app.delete('/delete/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const deleteUser = yield pool.query('DELETE FROM users WHERE id=$1', [id]);
        res.json('Successfully delted!');
    }
    catch (err) {
        console.log(err.message);
    }
}));
app.listen(3000, () => {
    console.log(`listening on port no : 3000`);
});
