import { name } from "./moduleA";
import { nameB } from "./moduleB";
// const moduleC = require('./moduleC'); // 一旦esm和cjs混合使用，就会导致tree-shaking失效

console.log(name, nameB)