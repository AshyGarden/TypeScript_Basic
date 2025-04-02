"use strict";
//Typescript高級技法
//computerタイプなのでcoreタイプに代入可能
const comToCore = {
    parts: "cooler"
};
//coreタイプなのでcomputerタイプに代入可能
const coreToCom = {
    spec: "i11900K"
};
const book1 = {
    species: "ITBook1",
    bookNum: "101"
};
const book2 = {
    name: "TypeScript入門",
    bookNum: 102
};
//下記の場合 b1 のタイプは string |number
function showBook(book) {
    const b1 = book.bookNum; //エラーが発生しない！
    console.log(book);
}
function useUnion(union) {
    const result = union("union");
    console.log(result); //このとき、result のタイプは string |number
}
function useOpChn(oc) {
    const opChn = oc?.num;
    console.log(opChn); //number | undefined 
    // optionalChaning値が存在しない場合、number
    // optional Chaning値が存在しない場合 undefined
}
function useOpChn1(getOpChn) {
    const opChn1 = getOpChn?.(); //()前に。を入れる
}
const lit1 = "literal1";
// const liter1:literal1 = "liter1"; <-error
//種類 リテラル タイプ
const strLit = "literal1"; //文字列リテラルタイプ
const one = 1; // 数字リテラルタイプ
const trueLit = true; // ブーリアンリテラルタイプ
const three = 3n; // Bigint リテラル タイプ
// テンプレートリテラルタイプ - `(バックティック)で包んだ文字列タイプの一種
// 関数の戻り値タイプでテンプレートリテラルタイプを使用->戻り値である文字列を検査可能
function templateLiteral() {
    const rand = Math.random();
    if (rand > 0.5) {
        return "Template Literal 0.5 Over"; //${string} = Literal 0.5 Over
    }
    else {
        return "Template Literal 0.5 Under"; //${string} = Literal 0.5 Under
    }
}
//ユニオンタイプ+リテラルタイプ
//特定値の一部だけを受け取りたい場合に有用だ
function plusMinus(type) {
    return type === "plus" ? 1 : -1;
}
console.log(plusMinus("plus"));
console.log(plusMinus("minus"));
// console.log(plusMinus("zero")); //error(該当しない値)
//タイプを広げる(widening)
//let - 変数がリテラルタイプと推論される場合、原始タイプとして返還される！
// オブジェクトリテラルタイプが推論されたとき、各プロパティがリテラルタイプになると広がりが起こる
const widen1 = "widen";
let widen2 = "widen";
const mugCup = {
    name: "MugCup",
    price: 10000
};
function plusMinus2(type) {
    return type === "plus" ? 1 : -1;
}
function plusMinusNone(num, type) {
    if (type === "none") {
        return 0;
    }
    else {
        return num * plusMinus2(type);
    }
}
console.log(plusMinusNone(4, "plus")); //4
console.log(plusMinusNone(5, "minus")); //-5
console.log(plusMinusNone(3, "none")); //0
// タイプ絞り込み 2. type of 演算子を活用した絞り込み
// 文字列                    -"string"
// 数字                      -"number"
// ブーリアン                 - "boolean"
// BigInt                    -"bigint"
// シンボル                   - "symbol"
// null                      -"object"！
// undefined                 -"undefined"
// オブジェクト(関数を除く)    - "object"
// 関数                       - "function"
console.log(typeof "hello"); //string
console.log(typeof {}); //object
function lookup1Setting(lookup, name) {
    return {
        ...lookup,
        name
    };
}
let key = "name";
key = "num"; //letにより変更可能
//any - タイプ検査を無効化するタイプ
// タイプスクリプトの検査よりコンパイリング性能向上のために主に使用
//何を入れてもコンパイルエラーが発生しない->ほとんどのランタイム時エラー発生
//自動入力のサポートを受けられない
function anyThing(obj) {
    console.log(obj.useUnion.name); //希望するプロパティにアクセス可能
    obj(); // 関数呼び出し 可能
    const result = obj + 10; // 計算可能
    return result;
}
//unknown - 何でも入れられるタイプ
//何でも入れることができるので性能制限がひどい！
//プロパティへのアクセスが非常に制限的 -> コンパイルエラーが頻繁に発生
function unknownThing(val) {
    console.log(val);
}
unknownThing(3);
unknownThing({
    obj1: {
        name1: "unknown"
    }
});
unknownThing(() => {
    console.log("id");
});
//object - 原始値以外のすべて
//never - 適切な値が存在しない。
