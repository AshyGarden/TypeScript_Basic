//class
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _unknownProperty_age, _typeProperty_age, _child3_age;
import { error } from "console";
//class宣言 - json形式と類似
class userClass {
    constructor() {
        this.name = "user1";
        this.age = 30;
    }
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
    constructor() {
        this.m1 = "";
        this.m2 = 0;
    }
    isTrue() {
        return true;
    }
    setM2(m2) {
        this.m2 = m2;
    }
}
const methodUser1 = new method1();
console.log(methodUser1.isTrue()); //true
console.log(methodUser1.setM2(30)); //30セット
//生成者 - newでインスタンスが作成されたときに呼び出される関数
//作成者は自分の読み取り専用プロパティにも値を代入できます！
class constructor1 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    isAdult() {
        return this.age >= 20;
    }
}
const c1 = new constructor1("c1", 25);
console.log(c1.name); //c1
console.log(c1.isAdult()); //true
//静的プロパティ/静的メソッド - 通常のプロパティ/メソッド宣言の前にstaticを付けて宣言します
//クラス自体に属するプロパティ+マサードに変更されます
class staticFunc1 {
    static getStatic1() {
        return new staticFunc1(staticFunc1.s1, 32);
    }
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    isAdult() {
        return this.age >= 20;
    }
}
staticFunc1.s1 = "s1"; //静的変数
console.log(staticFunc1.s1); //s1 - 関数コールと呼ぶべきです
const static1 = new staticFunc1("s2", 35);
console.log(static1.age); //35
//アクセス制限者
//public:何も貼らない場合
//private: class 内部からのみアクセス可能
//protected:自分と相続したクラスでのみアクセス可能
class restrictedAccess {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    isAdult() {
        return this.age >= 20;
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
    constructor(name, age) {
        this.name = name;
        this.age = age;
    } //一行で要約して生成者生成可能
}
//クラス表現式でクラス作り
const classExpress = class {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
};
//非公開プロパティ
class unknownProperty {
    constructor(name, age) {
        _unknownProperty_age.set(this, void 0); //非公開プロパティ = privateと同じ機能 + json.stringfy でも値が出力されない!(注意)
        this.name = name;
        __classPrivateFieldSet(this, _unknownProperty_age, age, "f");
    }
}
_unknownProperty_age = new WeakMap();
//クラスの静的初期化ブロック - クラス宣言評価途中に動作+複数使用 可能！
class staticBlock {
}
(() => {
    console.log("Static initialized!");
})();
//タイプ引数を持つクラス - クラスはタイプ引数を持つことができます。
class typeProperty {
    constructor(name, age, data) {
        _typeProperty_age.set(this, void 0);
        this.name = name;
        __classPrivateFieldSet(this, _typeProperty_age, age, "f");
        this.data = data;
    }
}
_typeProperty_age = new WeakMap();
const typeProp = new typeProperty("typeP2", 20, "Added");
const dataProp = typeProp.data; //この場合 dataは string タイプ
const typeProp2 = new typeProperty("typeP2", 30, { num: 123 });
const dataProp2 = typeProp2.data; //この場合 dataは number タイプ
//--------------------------------------------------------------------------
//クラスタイプ
//クラスの宣言はインスタンスタイプを作成します。- クラス オブジェクトという値を作成すると同時に、インスタンス タイプを宣言します。
//newシグネチャーを利用してインスタンス化可視性表現
class newSignature {
    constructor() {
        this.name = "class1";
        this.age = 2020;
    }
}
const newSignatureEx = newSignature;
const sig1 = new newSignatureEx();
console.log(sig1.name, sig1.name);
//クラス相続
//子供は親の機能を引き継ぎます
class parent1 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}
class Child1 extends parent1 {
    constructor() {
        super(...arguments);
        this.rank = 1;
    }
}
//相続した親の価値+自分の変数の価値
const p1 = new Child1("p1", 30);
console.log(p1.name); //p1
console.log(p1.age); //30
console.log(p1.rank); //1
//親機能上書き(override)
class parent2 {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
    isAdult() {
        return this.age >= 20;
    }
}
class Child2 extends parent1 {
    constructor() {
        super(...arguments);
        this.rank = 1;
    }
    isAdult() {
        return false;
    }
}
const p21 = new parent2("p2", 25);
const p22 = new Child2("p2", 25);
console.log(p21.isAdult); //true
console.log(p22.isAdult); //false
class child3 {
    constructor(name, age) {
        _child3_age.set(this, void 0);
        this.name = name;
        __classPrivateFieldSet(this, _child3_age, age, "f");
    }
}
_child3_age = new WeakMap();
//---------------------------------------------------------------------------
//this
//矢印関数
//矢印関数は自分自身のthisを持ちません！
//そのため、thisの外側から関数を受け取ります。
class arrowFunc {
    constructor(a1, a2) {
        this.a1 = a1;
        this.a2 = a2;
    }
    arrowFilter(arrowFuncs) {
        return arrowFuncs.filter(u => u.a2 > this.a2);
    }
}
//関数内外this
//プログラムの一番外側のthis= undefined
//クラス宣言内のプロパティ宣言= 一般的なnew生成のインスタンスを指定します
//静的プロパティの初期化式 + static 内部の初期化式 this = クラスオブジェクトそのものを指します
//例外処理
//Throw文 / Errorオブジェクト / try-catch文
try {
    console.log("try");
    throw error; //エラー発生時
}
catch (err) {
    console.log("Error!"); //エラー構文実行
}
//例外処理+全域脱出+finally
try {
    console.log("try");
    throw error;
}
catch (err) {
    console.log("Error!");
}
finally {
    console.log("finally!"); //すべての処理が終了するか、エラー処理後に実行します
}
