//Typescript高級技法

/* ユニオンタイプ / 電波機能
タイプTとタイプUを一緒に表現できるタイプです
公用体とも呼ばれる
使用方式 -> T|U 電子はタイプ、後者は式に使用
3つ以上のタイプを羅列可能ex)T|U|V|W */

type computer ={
    parts:string;
};

type core ={
    spec:string;
}

type com1 = computer|core; //ユニオンタイプ

//computerタイプなのでcoreタイプに代入可能
const comToCore:com1 ={
    parts:"cooler"
}

//coreタイプなのでcomputerタイプに代入可能
const coreToCom:com1 ={
    spec:"i11900K"
}

//割り当てていないオブジェクトを入れるとエラー
// const cToC:com1 ={
//     graphics:"GTX3080"
// }

//ユニオンタイプの持つ値をそのまま使用することはほぼ不可能
//->誰の表現式なのか曖昧だからだ。
//下の例 - computerのオブジェクトなのかcoreのオブジェクトなのか分からない。
// function getCore(coms: com1): string{
//     return com1.parts;
// }

//要素の前にも | 使用可能 - 主にtype扉が複数行に渡っている場合、よく使用
type com2 = computer|core; 


//ユニオンタイプの電波
type book = {
    species: string;
    bookNum: string;
}

type itBook ={
    name: string;
    bookNum: number;
}

type typeScriptBook = book|itBook;

const book1: typeScriptBook = {
    species:"ITBook1",
    bookNum: "101"
}

const book2: typeScriptBook = {
    name:"TypeScript入門",
    bookNum: 102
}

//下記の場合 b1 のタイプは string |number
function showBook(book: typeScriptBook){
    const b1 = book.bookNum; //エラーが発生しない！
    console.log(book);
}

//関数にもユニオンタイプを適用可能
type unionFunc1 = |((str:string)=>string)|((str:string)=>number);

function useUnion(union: unionFunc1){
    const result = union("union");
    console.log(result); //このとき、result のタイプは string |number
}

//インターセクションタイプ - TタイプでありながらUタイプでもある値
/* T&U-交差タイプとも呼ばれる
3つ以上のタイプを羅列可能ex)T&U&V&W
オブジェクトタイプを拡張する新しいタイプを作る用途によく使われる*/

type inter1 = {
    name: string;
    num: number;
}
//この時、section1はinter1の構成要素に対してサブタイプになる.
type section1 = inter1 & {
    area: string;
}
/* 上の2つの式は以下の式と意味が同じである
type section1 = inter1 & {
    name: string;
    num: number;
    area: string;
}*/
//存在しないタイプはneverで表現されることもある.
type StringAndNumber = string&number; //never
//通常、オブジェクト&原始タイプの場合、実際に属する値がなくてもneverにならないことがある。
//しかし、実際にタイプ検査は行われるため、何かを代入することはできない。（コンパイルエラー）
// const interString: inter1 & string = { //不可能
//     name:"intersection",
//     num: 102
// }

//オプショナルチェイニングによるプロパティアクセス
//optional chaining
// obj.propの代わりにobj？propを使用

//オプショナル·チェイニングは、アクセスするオブジェクトが「null」や「undefined」であっても使用できる。
type optionalChaning = {
    name:string;
    num:number;
}
function useOpChn(oc: optionalChaning|undefined){
    const opChn = oc?.num;
    console.log(opChn); //number | undefined 
    // optionalChaning値が存在しない場合、number
    // optional Chaning値が存在しない場合 undefined
}

//オプショナルチェーンは関数呼び出し、マッサード呼び出しでも使用可能
type opChn1 = () => Date;
function useOpChn1(getOpChn: opChn1|undefined){
    const opChn1 = getOpChn?.(); //()前に。を入れる
}
//特に？その後のプロパティアクセス、関数アクセス、マッサードアクセスを飛ばす効果を持つ
//これがオプチナルチェーン、すなわち？はオプショナルチェーンの始点
//------------------------------------------------------------------
//リテラルタイプ - 原始タイプをさらに細分化したタイプ (const タイプ:リテラルタイプ = 値;)
type literal1 = "literal1";
const lit1:literal1 = "literal1";
// const liter1:literal1 = "liter1"; <-error

//種類 リテラル タイプ
const strLit: literal1 = "literal1"; //文字列リテラルタイプ
const one: 1 = 1;                    // 数字リテラルタイプ
const trueLit: true = true;          // ブーリアンリテラルタイプ
const three: 3n = 3n;                // Bigint リテラル タイプ

// テンプレートリテラルタイプ - `(バックティック)で包んだ文字列タイプの一種
// 関数の戻り値タイプでテンプレートリテラルタイプを使用->戻り値である文字列を検査可能
function templateLiteral():`Template ${string}`{
    const rand = Math.random();
    if(rand>0.5){
        return "Template Literal 0.5 Over"; //${string} = Literal 0.5 Over
    } else{
        return "Template Literal 0.5 Under";//${string} = Literal 0.5 Under
    }
}

//ユニオンタイプ+リテラルタイプ
//特定値の一部だけを受け取りたい場合に有用だ
function plusMinus(type: "plus"|"minus"){
    return type ==="plus" ? 1 : -1;
}

console.log(plusMinus("plus"));
console.log(plusMinus("minus"));
// console.log(plusMinus("zero")); //error(該当しない値)


//タイプを広げる(widening)
//let - 変数がリテラルタイプと推論される場合、原始タイプとして返還される！
// オブジェクトリテラルタイプが推論されたとき、各プロパティがリテラルタイプになると広がりが起こる
const widen1 = "widen";
let widen2 = "widen";

//let変数などは後で変更される可能性があるため <-広げが起こる理由
// この場合、タイプにreadonlyを付けるのが一つの方法
type cup={
    readonly name: string;
    readonly price: number;
}
const mugCup:cup={
    name:"MugCup",
    price:10000
}

// タイプの絞り込み - コントロールフロー分析(control flow analysis)とも呼ばれる
// ユニオンタイプのメリットの一つ
// タイプを絞り込むことで、与えられた値が特定のタイムのときのみ処理を行うことができる。

// タイプ絞り1.等価演算子を活用した方法
type plma = "plus"|"minus";
function plusMinus2(type: plma){
    return type ==="plus" ? 1 : -1;
}

function plusMinusNone(num: number,  type:plma|"none"){ //plmaのタイプはplus|minus|noneのユニオンタイプとして扱う
    if(type==="none"){
        return 0;
    } else{
        return num*plusMinus2(type);
    }
}

console.log(plusMinusNone(4,"plus"));  //4
console.log(plusMinusNone(5,"minus")); //-5
console.log(plusMinusNone(3,"none"));  //0

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
console.log(typeof {});      //object

//  この他にスイッチ等でもタイプを減らすことができる。


//lookupタイプ - タイプ情報を再利用すること
//T[K]の形式 - TというオブジェクトタイプのKというプロパティタイプ
//乱用は禁止 - 具体的なタイプが一目で分かるため 
type lookup1 ={
    type: "abc";
    name:"string"
}

function lookup1Setting(lookup: lookup1, name:lookup1["name"]){ //タイプがすぐにわかる。.
    return {
        ...lookup, 
        name
    };
}

//keyofタイプ - そのオブジェクトのプロパティ名をタイプで取得する機能
type keyOfType= {
    name:string;
    num: number;
}

type keyOfEx = keyof keyOfType; //name|num
let key: keyOfEx = "name";
key = "num"; //letにより変更可能

//any - タイプ検査を無効化するタイプ
// タイプスクリプトの検査よりコンパイリング性能向上のために主に使用
//何を入れてもコンパイルエラーが発生しない->ほとんどのランタイム時エラー発生
//自動入力のサポートを受けられない
function anyThing(obj: any){
    console.log(obj.useUnion.name); //希望するプロパティにアクセス可能
    obj();                          // 関数呼び出し 可能
    const result = obj+10;          // 計算可能
    return result;
}

//unknown - 何でも入れられるタイプ
//何でも入れることができるので性能制限がひどい！
//プロパティへのアクセスが非常に制限的 -> コンパイルエラーが頻繁に発生
function unknownThing(val: unknown){
    console.log(val);
}

unknownThing(3);
unknownThing({
    obj1: {
        name1: "unknown"
    }
});
unknownThing(()=>{
    console.log("id");
});

//object - 原始値以外のすべて
//never - 適切な値が存在しない。