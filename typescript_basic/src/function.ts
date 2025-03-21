//関数 function

//一般的関数
function range(min: number, max: number): number[]{
    const result = [];
    for(let i=min; i<=max; i++){
        result.push(i);
    }
    return result;
}

console.log(range(5,10)); //[5,6,7,8,9,10]

//返戻値がない関数
function func2(n: number): void{ 
    if (n<100){
        console.log("nは100より小さいです.");
        return; //返却値がない場合はreturnのみで仕上げます
    }
}

//関数表現式で関数作り
type Human = {
    height: number,
    weight: number
}

const calcBMI = function(human: Human): number{
    return human.weight/ human.height ** 2;
}

const calcBMI2 = function({height, weight}: Human): number{
    return weight/ height ** 2;
}

const mySpec: Human ={height:1.85, weight:120};
//下記の2つの式の結果は同じです
console.log(calcBMI(mySpec));
console.log(calcBMI2(mySpec));

//常の矢印関数の表現式（前のfunctionを削除してから =>をnumberの後に追加）
const calcBMI3 = ({height, weight}: Human): number => {
    return weight/ height ** 2;
};

//矢印関数縮約形
const calcBMI4 = ({height, weight}: Human): number => weight/ height ** 2;

//メソッド技法関数property名(引数目録):返却タイプ{本文}
// この時、property名はメソッド名を指定
//今後thisで有用に使用
const objM = {
    //通常形式
    double(num:number): number{
        return num*2;
    },

    //縮約型
    double2: (num:number):number => num*2
}

//可変引数宣言（関数が任意の数だけ引数を受けられるようにします）
const sum = (...args:number[]):number=>{
    let result =0;
    for(const num of args){
        result +=num;
    }
    return result;
}

//args = 可変引数
console.log(sum()); //0
console.log(sum(1,10)); //11
console.log(sum(123,456,789)); //1368

//rest引数にもタイプ表記が必要ですが、タイプは必ず配列タイプ（またはタプルタイプ）である必要があります！
//(実際の上のargsタイプはnumber[])

//rest引数は通常の引数と同じように使用できますが、引数リストの最後に来る必要があります。
console.log(sum(1,10)); //この場合、baseに1、argsに10が割り当てられて計算されます。

//---------------------------------------------------------

//選択的引数宣言
//渡しても残さなくてもいい引数

//法1 基本値を指定しないとき->(引数名)?:タイプ
const toLowerOrUpper1 = (str:string, upper?:boolean):string=>{
    if(upper){
        return str.toUpperCase();
    } else {
        return str.toLowerCase();
    }
}

//選択的引数を省略する場合、undefinedが割り当てられます。 (この場合、false)
console.log(toLowerOrUpper1("Hello")); //hello
console.log(toLowerOrUpper1("Hello", false)); //hello
console.log(toLowerOrUpper1("Hello",true)); //HELLO
console.log(toLowerOrUpper1("Hello",undefined)); //hello

//法2 基本値を指定するときの構文->変数名:タイプ=式
const toLowerOrUpper2 = (str:string, upper:boolean = false):string=>{
    if(upper){
        return str.toUpperCase();
    } else {
        return str.toLowerCase();
    }
}

console.log(toLowerOrUpper2("Hello")); //hello
console.log(toLowerOrUpper2("Hello", false)); //hello
console.log(toLowerOrUpper2("Hello",true)); //HELLO
//この場合はエラー発生（必須因子が選択的因子より後に来ることができないため）
//const toLowerOrUpper2 = (str?:string, upper:boolean):string=>{

//コールバック関数callbackfunction（関数の引数で関数をめくること）
type userProps ={name: string, age:number};
const getName = (u:userProps):string => u.name;

const users:userProps[] = [
    {name: "u1",age:20},
    {name: "u2",age:30}
];

const names = users.map((u:userProps): string => u.name); //コールバック関数
console.log(names); //["u1","u2"]

//呼び出しシグネチャー(call signature)->(引数リスト):返却値タイプ;
//この構文を使用する場合、該当オブジェクトタイプに'このタイプは関数タイプです。という意味が付与されます
//また、呼び出しシグネチャーを利用することで「プロパティを持つ関数」タイプを表現できるようになります

type sig1 = {
    isUsed: boolean;
    (abc: number): void;
};

const double: sig1 = (abc:number)=>{
    console.log(abc*2);
}

//doubleはisUsedプロパティも持ちます
double.isUsed = true;
console.log(double.isUsed);

//doubleは関数として呼び出しが可能です。
double(1000);

//平凡な関数タイプも呼び出しシグネチャーで表すことができます.
type swap1 = (n:number)=>number;
type swap2 = {(n:number): number;}

//オブジェクトタイプが複数の呼び出しシグネチャーを持つことができます。
//最近はオーバーローディングがあまり使われていないため、参考用としてだけ知っておくこと
type swapFunc = {
    (str:string): number;
    (n:number): boolean;
}

//関数タイプサブタイプ関係

//1.返戻値タイプによるサブタイプ
//SがTのサブタイプの場合+引数リストが同一の場合
//(引数目録)=>Sという関数タイプは(引数目録)=>Tという関数のサブタイプとなります。
// 関数戻り値タイプは 関数タイプに 共変積(convariant) →順方向のサブタイプ

type ex1 = {
    name: string;
}

type ex2 ={
    name: string;
    age: number;
}

const ageCalc = (age:number): ex2=>({
    name: "Hello",
    age
});

const f: (age: number)=>ex1 = ageCalc;
const resultOfSubtype: ex1 = f(25);
console.log(resultOfSubtype); //{name: "Hello", age: 25}

// 返値サブタイプ関係では voidタイプが特殊に作動します
//いかなるタイプを返す関数タイプでも（引数が同じでも）voidタイプを返す関数タイプのサブタイプになります
const notVoid = (name:string) =>({name});
const thisIsVoid : (name:string) => void = notVoid;
console.log(thisIsVoid); //[Function: notVoid]

//2.引数タイプによるサブタイプ関係
// 関数の引数タイプは、反共変積（contravariant）→逆方向のサブタイプです

//3. 引数の数によるサブタイプ関係
//人数が多い場合は左辺から処理開始！
type unaryFunc = (arg:number) => number;
type binaryFunc = (leftB:number, rightB:number) => number;

const doubleNum:unaryFunc = arg => arg*2; //与えられた引数に10が入ります
const addNums: binaryFunc = (leftB, rightB) => leftB + rightB;

const unaryResult: binaryFunc = doubleNum;
console.log(unaryResult(10,100)); //20が出力