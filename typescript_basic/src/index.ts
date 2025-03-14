const messages: string = "Hello World!";
console.log(messages);

const greeting = "Hello, "; //変数
const target = "World!"; 
console.log(greeting+target); //式

const i = 8;
if(i<10){
    console.log("iは10未満です。");
}

//識別子
const あいう = 123;
const えお = あいう+ 456;
console.log(えお);

//変数にタイプ表記
//const 変数名: タイプ = 式 ;

const type: string = "Type";
const script: string = "Script";
// const script: number = "Script"; //型が違うのでエラーが発生します
console.log(type+script);

//let = 宣言時にすぐに値を割り当てる必要がありません。（値部分省略可）
let value1, value2;
value1 = "Welcome ";
value2 = "Home!";
console.log(value1+value2);

//変数にタイプ表記時、該当タイプのみ宣言可能です！
let sval1: string, sval2: string;
sval1 = "This is ";
sval2 = "String value!";
console.log(value1+value2);

//TypeScriptコンパイラ使用時、タイプ表記の付いた変数に値を割り当てず、使用時にコンパイルエラーが発生します

//原始値 = TypeScriptの基本的な値
//文字列、数字, Boolean, Bigint, null, undefined, Symbol


//数字タイプ特徴
//numberタイプは整数と実数の区別がありません。
//数字リテラル
// 2進数 binary(0b)、8進数 octal(0o)、16進数 hexadecimal(0x)
const binary = 0b1010;
const octal = 0o755;
const hexadecimal = 0xff;

console.log(binary, octal, hexadecimal); //10, 492, 255

//지수표기법指数表記法
const big = 1e0;
const small = 4e-5;
console.log(big, small); //100000000, 0.00004

//任意精度整数(BigInt)
const bignum: bigint = (123n+456n)*2n;
console.log(bignum); //1158n

//BigIntは整数しか分けられませんので、小数点以下の桁を全て捨てます
const divResult = 5n / 2n;
console.log(divResult); //2n

//BigIntはnumberと演算不可
//const numErr = 100n +50; //エーラ

//テンプレート·リテラル
const temLet: string = `Template Leteral!`;
console.log(temLet); //Template Leteral!

const tem1: string = "words ";
const tem2: string = "add!";
console.log(`${tem1}, ${tem2}`); //words add!

//이스케이프 시퀀스 エスケープシーケンス
console.log("Escape \\Sequence/"); //Escape \Sequence/ バックスラッシュの使い方
console.log("Escape \u{c774} Sequence/"); //Escape 이 Sequence

//boolean
const no: boolean = false;
const yes: boolean = true;
console.log(yes, no);

//null, undefined
const nullVal = null;
const n: null =null;

const undef = undefined;
const u: undefined = undefined;

