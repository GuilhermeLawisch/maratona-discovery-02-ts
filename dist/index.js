"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
app.get('/', (req, res) => {
    return res.json({ massage: 'Hello World' });
});
app.listen(3333, () => {
    console.log('Server is running in http://localhost:3333');
});
