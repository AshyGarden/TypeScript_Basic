"use strict";
//演算子(operator)
//算術演算子
const addResult = 1234 + 765;
console.log(addResult);
const discounted = 1234 * 0.2;
console.log(discounted);
//平方根, 自乗根
const sqrt2 = 2 ** 0.5;
console.log(sqrt2); //1.414...
//number
console.log(18 / 12); //1.5
console.log(18 % 12); //6
//bigint
console.log(18n / 12n); //1n
console.log(18n / 12n); //6n
//被演算子がnumberタイプならnumberタイプ、bigintタイプならbigintタイプで値が返されます.
const res1 = 5 - 1.86; // number타입
const res2 = 2n ** 5n; //bigint타입
//算術演算子の右辺はany、nymber、bigint、enumタイプのいずれかでなければなりません！（でない場合はコンパイルエラー）
const err = "123";
// console.log(err*"123");
//単項演算子
let t = 10;
t++;
console.log(t); //11
t--;
console.log(t); //10
console.log(++t); //11 (変更後、値が出力されます)
console.log(t--); //11 (変更前の値が出力後の値が10に変更されます)
//比較演算子, 等価演算子
const left1 = -5;
const right1 = 3;
console.log(left1 < right1); //true
const left2 = 100n;
const right2 = 70n;
console.log(left2 < right2); //false
console.log("apple" < "orange"); //true (この場合、aのコード値がoより小さいため比較可能です!)
//一致検査(文字列、数字、null、undefinedまで一致検査可能)
const test1 = 1;
const test2 = 3;
console.log(test1 === test2); //false
console.log(test1 !== test2); //true
//NaN = Not a Number =  数字タイプではない場合を意味
//論理演算子
const true1 = true;
const false1 = false;
console.log(true1 && true1); //true
console.log(true1 && false1); //false
console.log(false1 && false1); //false
console.log(true1 || true1); //true
console.log(true1 || false1); //true
console.log(false1 || false1); //false
//条件演算子
const number1 = 101;
const torf = number1 > 100 ? `${number1}は100を超` : `${number1}は100以下`;
console.log(torf);
