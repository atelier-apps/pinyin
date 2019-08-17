const functions = require('firebase-functions');
const cors = require('cors')({origin: true});


exports.helloWorld = functions.https.onRequest((request, response) => {
  cors(request, response, () => {
    var result="　"+request.body.hellotext;
    response.send(result);
  });
});

function getPinyinKana(pinyin){
  //ここで引数pintinを使い、kanaを戻り値として返す
  var pinyin_kana = $.getJSON("./pinkana.json", function(pinyin){ //外部JSONファイルの呼び出し https://www.webopixel.net/javascript/91.html
    if (item.pinyin == pinyin) return true; //なんでtrueなんだろ https://qiita.com/1mada/items/9a48f7053a6016b5fd5a
  }); // pinyinに対応するカナが返ってくるはず

  //動作確認用のログ
  console.log(pinyin_kana)

  return pinyin_kana
}
