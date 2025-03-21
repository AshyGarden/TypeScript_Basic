import { createInterface } from "readline";
//条件分岐文(if-else)
let userName = "user1";
if (userName === "") {
    console.log("名前が空欄です");
}
else {
    if (userName === "user1") {
        console.log("user1です。");
    }
    else {
        console.log("登録されていないユーザーです");
    }
}
//switch文
const r1 = createInterface({
    input: process.stdin,
    output: process.stdout
}); //入力される形式、出力される形式
r1.question("コマンドを入力してください: ", (name) => {
    switch (name) {
        case "login":
            console.log("login");
            break;
        case "logout":
            console.log("logout");
            break;
        default:
            console.log(`${name}に対する命令は存在しません.`);
    }
    r1.close; //メモリ解除
});
//while
let sumWhile = 0;
let i = 0;
//方法1
while (i <= 100) {
    sumWhile += i;
    i++;
}
console.log(sumWhile); //5050(0~100)
//方法2
while (true) {
    if (i > 100) {
        break;
    }
    sumWhile += i;
    i++;
}
//for文 - for(let 変数名: 初期化式; 条件式; 更新式)
let sumFor = 0;
for (let i = 1; i <= 100; i++) {
    sumFor += i;
}
