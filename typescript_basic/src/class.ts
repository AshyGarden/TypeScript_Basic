//class

import { error } from "console";

//class宣言 - json形式と類似
class userClass{
    name: string = "user1";
    age: number = 30;
}
const u1 = new userClass();

//プロパティ宣言
console.log(u1.name); //user1
console.log(u1.age); //30

//userをclassオブジェクトにして使用すること
const upperUserClass = {
    uuc: userClass
};
const upperU1 = new upperUserClass.uuc();
console.log(upperU1.age); //30

// メソッド宣言 - クラス内にマサード宣言も入れることができます。 
// この時、当該クラスは自動的にそのマッサードを持った状態で作られます
// メソッド宣言構文は、オブジェクトリテラルのマサード手法と同じです
class method1 {
    m1: string = "";
    m2: number = 0;

    isTrue(): boolean{
        return true;
    }
    setM2(m2: number){
        this.m2 = m2;
    }
}
const methodUser1 = new method1();
console.log(methodUser1.isTrue());  //true
console.log(methodUser1.setM2(30)); //30セット

//生成者 - newでインスタンスが作成されたときに呼び出される関数
//作成者は自分の読み取り専用プロパティにも値を代入できます！
class constructor1 {
    name: string ;
    age: number ;

    constructor(name: string, age:number){
        this.name = name;
        this.age = age;
    }

    isAdult(): boolean{
        return this.age >=20;
    }
}
const c1 = new constructor1("c1",25);
console.log(c1.name); //c1
console.log(c1.isAdult()); //true

//静的プロパティ/静的メソッド - 通常のプロパティ/メソッド宣言の前にstaticを付けて宣言します
//クラス自体に属するプロパティ+マサードに変更されます
class staticFunc1 {
    static s1: string = "s1"; //静的変数
    static getStatic1(){
        return new staticFunc1(staticFunc1.s1, 32);    
    }

    name: string ;
    age: number ;

    constructor(name: string, age:number){
        this.name = name;
        this.age = age;
    }

    isAdult(): boolean{
        return this.age >=20;
    }
}

console.log(staticFunc1.s1); //s1 - 関数コールと呼ぶべきです
const static1 = new staticFunc1("s2",35);
console.log(static1.age); //35

//アクセス制限者
//public:何も貼らない場合
//private: class 内部からのみアクセス可能
//protected:自分と相続したクラスでのみアクセス可能
class restrictedAccess {
    name: string ;
    private age: number ; //class外部からはアクセスできません

    constructor(name: string, age:number){
        this.name = name;
        this.age = age;
    }

    isAdult(): boolean{
        return this.age >=20;
    }
}

//生成者引数におけるプロパティ宣言
class simpleCsrt {
    // name: string ;
    // age: number ; 
    
    // constructor(name: string, age:number){
    //     this.name = name;
    //     this.age = age;
    // }

    //上記の内容と同じです。
    constructor(public name: string, public age:number){} //一行で要約して生成者生成可能
}

//クラス表現式でクラス作り
const classExpress = class { //constにすぐ割り当てます
    name: string ;
    age: number ; 
    constructor(name: string, age:number){
        this.name = name;
        this.age = age;
    }
}

//非公開プロパティ
class unknownProperty {
    name: string ;
    #age: number ; //非公開プロパティ = privateと同じ機能 + json.stringfy でも値が出力されない!(注意)

    constructor(name: string, age:number){
        this.name = name;
        this.#age = age;
    }
}

//クラスの静的初期化ブロック - クラス宣言評価途中に動作+複数使用 可能！
class staticBlock{
    static{
        console.log("Static initialized!");
    }
}

//タイプ引数を持つクラス - クラスはタイプ引数を持つことができます。
class typeProperty<T>{
    name: string;
    #age: number;
    readonly data: T;
    constructor(name: string, age:number, data:T){
        this.name = name;
        this.#age = age;
        this.data = data;
    }
}

const typeProp = new typeProperty<string>("typeP2",20,"Added");
const dataProp = typeProp.data; //この場合 dataは string タイプ
const typeProp2 = new typeProperty("typeP2",30,{num : 123});
const dataProp2 = typeProp2.data; //この場合 dataは number タイプ
//--------------------------------------------------------------------------
//クラスタイプ
//クラスの宣言はインスタンスタイプを作成します。- クラス オブジェクトという値を作成すると同時に、インスタンス タイプを宣言します。
//newシグネチャーを利用してインスタンス化可視性表現
class newSignature{
    name: string ="class1";
    age: number = 2020;
}
 
type newSignatureConstructor = new() => newSignature; //newSignatureは newSignatureConstructorタイプ
const newSignatureEx:newSignatureConstructor = newSignature;
const sig1 = new newSignatureEx();
console.log(sig1.name, sig1.name);

//クラス相続
//子供は親の機能を引き継ぎます
class parent1{
    name: string;
    age: number;
    constructor(name: string, age:number){
        this.name = name;
        this.age = age;
    }
}

class Child1 extends parent1{
    rank: number =1;
}

//相続した親の価値+自分の変数の価値
const p1 = new Child1("p1",30);
console.log(p1.name); //p1
console.log(p1.age);  //30
console.log(p1.rank); //1

//親機能上書き(override)
class parent2{
    name: string;
    age: number;
    constructor(name: string, age:number){
        this.name = name;
        this.age = age;
    }
    isAdult():boolean{
        return this.age >=20;
    }
}

class Child2 extends parent1{
    rank: number =1;
    isAdult():boolean{
        return false;
    }
}

const p21 = new parent2("p2",25);
const p22 = new Child2("p2",25);
console.log(p21.isAdult); //true
console.log(p22.isAdult); //false

//impliments
type parent3 = {
    name: string;
}

class child3 implements parent3{
    name: string; //親に存在しても再宣言しなければなりません。(そうでなければコンパイルエラー)
    #age: number;
    constructor(name: string, age:number){
        this.name = name;
        this.#age = age;
    }
}
//---------------------------------------------------------------------------
//this
//矢印関数
//矢印関数は自分自身のthisを持ちません！
//そのため、thisの外側から関数を受け取ります。
class arrowFunc {
    a1: string;
    a2: number;
    constructor(a1: string, a2:number){
        this.a1 = a1;
        this.a2 = a2;
    }

    public arrowFilter(arrowFuncs: readonly arrowFunc[]):arrowFunc[]{
        return arrowFuncs.filter(u=>u.a2>this.a2);
    }
    //
    // public arrowFilter(aFunc: arrowFunc[]): arrowFunc[]{
    //     const _this = this;
    //     return aFunc.filter(function(u){return u.a2 > this.a2});
    // }
}

//関数内外this
//プログラムの一番外側のthis= undefined
//クラス宣言内のプロパティ宣言= 一般的なnew生成のインスタンスを指定します
//静的プロパティの初期化式 + static 内部の初期化式 this = クラスオブジェクトそのものを指します
//例外処理
//Throw文 / Errorオブジェクト / try-catch文
try{
    console.log("try");
    throw error; //エラー発生時
} catch(err){
    console.log("Error!"); //エラー構文実行
}

//例外処理+全域脱出+finally
try{
    console.log("try");
    throw error;
} catch(err){
    console.log("Error!");
} finally{
    console.log("finally!"); //すべての処理が終了するか、エラー処理後に実行します
}