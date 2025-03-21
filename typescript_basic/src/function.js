"use strict";
//関数 function
//一般的関数
function range(min, max) {
    const result = [];
    for (let i = min; i <= max; i++) {
        result.push(i);
    }
    return result;
}
console.log(range(5, 10)); //[5,6,7,8,9,10]
//返戻値がない関数
function func2(n) {
    if (n < 100) {
        console.log("nは100より小さいです.");
        return; //返却値がない場合はreturnのみで仕上げます
    }
}
const calcBMI = function (human) {
    return human.weight / human.height ** 2;
};
const calcBMI2 = function ({ height, weight }) {
    return weight / height ** 2;
};
const mySpec = { height: 1.85, weight: 120 };
//下記の2つの式の結果は同じです
console.log(calcBMI(mySpec));
console.log(calcBMI2(mySpec));
//常の矢印関数の表現式（前のfunctionを削除してから =>をnumberの後に追加）
const calcBMI3 = ({ height, weight }) => {
    return weight / height ** 2;
};
//矢印関数縮約形
const calcBMI4 = ({ height, weight }) => weight / height ** 2;
//メソッド技法関数property名(引数目録):返却タイプ{本文}
// この時、property名はメソッド名を指定
//今後thisで有用に使用
const objM = {
    //通常形式
    double(num) {
        return num * 2;
    },
    //縮約型
    double2: (num) => num * 2
};
//可変引数宣言（関数が任意の数だけ引数を受けられるようにします）
const sum = (...args) => {
    let result = 0;
    for (const num of args) {
        result += num;
    }
    return result;
};
//args = 可変引数
console.log(sum()); //0
console.log(sum(1, 10)); //11
console.log(sum(123, 456, 789)); //1368
//rest引数にもタイプ表記が必要ですが、タイプは必ず配列タイプ（またはタプルタイプ）である必要があります！
//(実際の上のargsタイプはnumber[])
//rest引数は通常の引数と同じように使用できますが、引数リストの最後に来る必要があります。
console.log(sum(1, 10)); //この場合、baseに1、argsに10が割り当てられて計算されます。
//---------------------------------------------------------
//選択的引数宣言
//渡しても残さなくてもいい引数
//法1 基本値を指定しないとき->(引数名)?:タイプ
const toLowerOrUpper1 = (str, upper) => {
    if (upper) {
        return str.toUpperCase();
    }
    else {
        return str.toLowerCase();
    }
};
//選択的引数を省略する場合、undefinedが割り当てられます。 (この場合、false)
console.log(toLowerOrUpper1("Hello")); //hello
console.log(toLowerOrUpper1("Hello", false)); //hello
console.log(toLowerOrUpper1("Hello", true)); //HELLO
console.log(toLowerOrUpper1("Hello", undefined)); //hello
//法2 基本値を指定するときの構文->変数名:タイプ=式
const toLowerOrUpper2 = (str, upper = false) => {
    if (upper) {
        return str.toUpperCase();
    }
    else {
        return str.toLowerCase();
    }
};
console.log(toLowerOrUpper2("Hello")); //hello
console.log(toLowerOrUpper2("Hello", false)); //hello
console.log(toLowerOrUpper2("Hello", true)); //HELLO
const getName = (u) => u.name;
const users = [
    { name: "u1", age: 20 },
    { name: "u2", age: 30 }
];
const names = users.map((u) => u.name); //コールバック関数
console.log(names); //["u1","u2"]
const double = (abc) => {
    console.log(abc * 2);
};
//doubleはisUsedプロパティも持ちます
double.isUsed = true;
console.log(double.isUsed);
//doubleは関数として呼び出しが可能です。
double(1000);
const ageCalc = (age) => ({
    name: "Hello",
    age
});
const f = ageCalc;
const resultOfSubtype = f(25);
console.log(resultOfSubtype); //{name: "Hello", age: 25}
// 返値サブタイプ関係では voidタイプが特殊に作動します
//いかなるタイプを返す関数タイプでも（引数が同じでも）voidタイプを返す関数タイプのサブタイプになります
const notVoid = (name) => ({ name });
const thisIsVoid = notVoid;
console.log(thisIsVoid); //[Function: notVoid]
const doubleNum = arg => arg * 2; //与えられた引数に10が入ります
const addNums = (leftB, rightB) => leftB + rightB;
const unaryResult = doubleNum;
console.log(unaryResult(10, 100)); //20が出力
