//オブジェクト

//オブジェクトは関連配列。
//オブジェクトは、いくつかの値を集めたデータ。
const obj1 = {
    one: 1,
    two: "Two"
}

console.log(obj1.one); //1
console.log(obj1.two); //Two

//プロパティと変数名が同じであれば省略可能!
const name1 = oninput ? oninput: "名無し";
const user1 = {
    name1,
    age: 20
}

//文字、数字 リテラル
const obj2 = {
    "ex1": "ex1",
    "ex1 ex2" : -123,
    '$%' : "",
    1: "one",
    2.05: "two point o five"
}

//文字列リテラル("または"で囲んだ名前をプロパティ名として使用可能)
console.log(obj2.ex1); //ex1
console.log(obj2["ex1 ex2"]); //-123
console.log(obj2['$%']); //$%

//数字リテラル
console.log(obj2[1]); //one
console.log(obj2[2.05]); //two point o five

//計算されたプロパティ名(computed property) - 文字列がproperty名で使用されます
//この時、タイプ推論に気を使わなければならない場合が生じる -> 今後再登場予定
const propName ="computed";
const objP ={
    [propName]: "propName"
}

console.log(objP.computed); //propName

//展開構文(spread syntax) - 構文の実行時に"propertyのコピー"が実行されます。
//元のオブジェクトを修正しても、コピー内のオブジェクトは影響を受けません

const obj3={
    bar3:890, //コンパイル時エラー(overwritten)
    bar1:123,
    bar2:456
}

const obj4={
    bar3:789,
    ...obj1
}

console.log(obj4); //{bar3:789, bar1:123, bar2:456}
//console.log(obj3.bar3); //error

const obja1 ={
    a1: 123,
    a2: 456
}

const obja2 ={
    a1: 345,
    a2: 678
}

const a3 ={
    ...obja1,
    ...obja2
}
console.log(a3); // この場合、遅く宣言されたobja2の値が作動 = {a1:345、a2:678}

//オブジェクトは'明示的にコピーしなければ同じ'です