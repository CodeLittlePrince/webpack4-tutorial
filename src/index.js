import { name } from "./moduleA";
import { nameB } from "./moduleB";
const moduleC = require('./moduleC')

console.log(name, nameB, moduleC.nameC)