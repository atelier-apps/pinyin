<template>
<div class="page">
  <div class="header" ref="header">
    <div class="app-name"> {{app_name}}</div>
    <div class="header-content">
      <div class="header-message"> {{headerMsg}}</div>
      <!-- //ここを直す -->
      <input id="id_search_box" class="form" v-on:input="checkInput" v-bind:class="{ 'error-input' : isCharacterTypeError || isKanjiAlphabetError || isOverLimit}" v-model="target" :placeholder="[[inputPlaceholder]]" spellcheck="false">
      <div class="error-area">
        <span v-if="isCharacterTypeError" id="id_charactertype"> {{errorMsg}}</span>
        <span v-if="isKanjiAlphabetError" id="id_kanjialphabet"> {{errorMsg3}}</span>
        <span v-if="isOverLimit" id="id_overlimit"> {{lengthErrorMsg}}</span>
      </div>
    </div>
  </div>
  <div class="main" v-bind:style="{'margin-top':mainMargin}">
    <div v-if="unsupported" class="main-message">
      <img src="@/assets/unsupported.png" class="warning-image" />
      <div>{{unsupportedMsg}}</div>
    </div>
    <div v-if="resultLength>1" class="main-message">
      <img src="@/assets/case.png" class="warning-image" />
      <div>{{caseMsg}}</div>
    </div>
    <div v-if="resultLength==0">
      <ResultArea v-bind:result="null" />
    </div>
    <div v-for="r in result">
      <ResultArea v-bind:result="r" />
    </div>
    <div class="note" v-for="msg in policyMsg">{{msg}}</div>
  </div>
  <div class="footer">{{copyright}}</div>
</div>
</template>



<script>
import axios from 'axios'
import ResultArea from '@/components/ResultArea.vue'
import alphabetKana from '@/assets/alphabetKana.json'
import pinyinAlphabet from '@/assets/pinyinAlphabet.json'
import pinyinList from '@/assets/pinyinList.json'

export default {
  name: 'ProtoScreen',
  props: {
    app_name: String
  },
  data: () => ({
    MAX_LENGTH: 5,
    UNKNOWN: "？",
    UNKNOWN_KANJI: "？",
    UNKNOWN_KANJI_KANA: "？？",
    TYPE_ALPHABET: "A",
    TYPE_PINYIN: "P",
    TYPE_KANJI: "K",
    TYPE_OTHER: "O",
    headerMsg: '▼中国人名を簡体字か英字で入力',
    caseMsg: 'この名前は字の意味によって表記や読み方が変わります',
    target: '',
    errorMsg3: '漢字か英字のどちらか一方のみ入力してください。',
    errorMsg2: '%s音節以下で入力してください。',
    errorMsg: '漢字か英字を入力してください。',
    result: {},
    inputPlaceholder: "鲁迅",
    policyMsg: [
      "入力対応している漢字は、中国大陸における常用字2500字（簡体字）のみです。",
      "本システムは「中国人名は音読みの漢音で読む」という日本の伝統に従い、漢音を日本名として採用しています。" +
      "ただし、漢音による読み方は通俗的な読み方とは異なる可能性があります。たとえば「毛沢東」は通俗的にはモウタクトウと読み習わされていますが、" +
      "法則上はボウタクトウと読まれるべきものであり、本システムもその読み方を採用しています。",
      "現地読みの近似音については「中国語音節表記ガイドライン［平凡社版］」に準拠しています。 (http://cn.heibonsha.co.jp/)",
      "本システムを利用することによって発生した損害について、当方はいかなる責任も負いません。また、出力内容の正確性や妥当性等は保証していません。"
    ],
    unsupportedMsg: "一部の漢字は未対応です",
    copyright: "Developed by 日曜大工",
    inputStack: [],
    delayTimeMs: 500,
    unsupported: false,
    mainMargin: "0",
  }),
  computed: {
    lengthErrorMsg() {
      return this.errorMsg2.replace("%s", this.MAX_LENGTH)
    },
    isCharacterTypeError() {
      return !this.convertPinyinTextToAlphabetText(this.convertFullWidthToHalfWidth(this.target)).match(/^[' A-Za-z\u3005-\u3006\u30e0-\u9fcf]*$/)
    },
    isKanjiAlphabetError() {
      //ここを編集
      const str = this.convertPinyinTextToAlphabetText(this.convertFullWidthToHalfWidth(this.target))
      const regex1 = RegExp("[\u3005-\u3006\u30e0-\u9fcf]");
      const regex2 = RegExp("[A-Za-z]");

      var includeKanji = regex1.test(str)
      var includeAlphabet = regex2.test(str)
      return includeKanji && includeAlphabet

    },
    syllables: function() {
      return this.splitBySyllable(this.target);
    },
    isOverLimit() {
      return this.syllables.length > this.MAX_LENGTH
    },
    isEmpty() {
      return this.syllables.length == 0
    },
    resultLength() {
      return Object.keys(this.result).length;
    }
  },
  components: {
    ResultArea
  },
  mounted() {
    window.addEventListener('resize', this.setMainMargin);
    this.setMainMargin();
  },
  methods: {
    setMainMargin: function() {
      this.mainMargin = this.$refs.header.clientHeight + 'px';
    },
    checkInput: function() {
      // 入力が終わってdelayTimeMs秒経過するまで待つための処理
      this.inputStack.push(1);
      setTimeout(function() {
        this.inputStack.pop();
        if (this.inputStack.length == 0) {
          this.inputStack = [];
          this.translate();
        }
      }.bind(this), this.delayTimeMs);
    },

    translate: function() {

      if (this.isEmpty) {
        this.result = {};
        return;
      }
      if (this.isOverLimit) {
        return;
      }
      if (this.isCharacterTypeError) {
        return;
      }
      if (this.isKanjiAlphabetError) {
        return;
      }

      scrollTo(0, 0);

      let syllables = this.syllables;

      // 漢字が含まれない場合（英字かピンインしかない場合）はここで解決して終了
      let includesKanji = false;
      for (let i in syllables) {
        if (syllables[i]["type"] == this.TYPE_KANJI) {
          includesKanji = true;
          break;
        }
      }
      if (includesKanji == false) {
        for (let i in syllables) {
          syllables[i]["kanji"] = this.UNKNOWN_KANJI;
          syllables[i]["kanji_kana"] = this.UNKNOWN_KANJI_KANA;
          if (syllables[i]["type"] == this.TYPE_PINYIN) {
            syllables[i]["pinyin"] = syllables[i].original;
            syllables[i]["alphabet"] = this.convertPinyinTextToAlphabetText(syllables[i]["original"]);
          } else if (syllables[i]["type"] == this.TYPE_ALPHABET) {
            syllables[i]["pinyin"] = this.UNKNOWN;
            syllables[i]["alphabet"] = syllables[i]["original"];
          }
          syllables[i]["pinyin_kana"] = this.getKanaOfAlphabet(syllables[i]["alphabet"]);
        }
        let resultData = [];
        resultData.push(syllables);
        this.result = resultData;
        return;
      }

      // ここまでで解決しなかったらサーバーに託す
      let url = "" + process.env.VUE_APP_SERVER_TRANSLATION;
      this.$jsonp(url, {
        syllableString: JSON.stringify(syllables),
      }).then(resultData => {
        this.addAlphabetInfo(resultData);
        this.unsupported = this.hasUnsupportedCharacter(resultData);
        this.result = resultData;
      })
    },

    splitBySyllable: function(targetText) {

      let splitPoints = {};
      splitPoints[0] = true;
      splitPoints[targetText.length] = true;

      let targetTextConvertedToHelfWidth = this.convertFullWidthToHalfWidth(targetText);
      let targeTextConvertedToAlphabet = this.convertPinyinTextToAlphabetText(targetTextConvertedToHelfWidth);
      let bits = new Array(targeTextConvertedToAlphabet.length).fill(false);

      // startからendまでの範囲が未マッチングの範囲ならば、その前後に分割点を追加し、マッチング済みであることを示すビットを立てる関数。
      var addSplitPoint = function(splitPoints, bits, start, end) {
        if (bits.slice(start, end).indexOf(true) != -1) {
          return;
        }
        splitPoints[start] = true;
        splitPoints[end] = true;
        bits.fill(true, start, end);
      }

      //1音節文字を探して分割点をbitsに追加し、その範囲をマッチング済みとしてビットを立てる。
      let regResult;
      let reg = new RegExp("[' \u3005-\u3006\u30e0-\u9fcf]", "g");
      while ((regResult = reg.exec(targeTextConvertedToAlphabet)) !== null) {
        let start = regResult.index;
        let end = start + 1;
        addSplitPoint(splitPoints, bits, start, end);
      }

      //ピンインを探して分割点をbitsに追加し、その範囲をマッチング済みとしてビットを立てる。
      for (let i in pinyinList) {
        let pinyin = pinyinList[i];
        let reg = new RegExp(pinyin, "g");
        while ((regResult = reg.exec(targeTextConvertedToAlphabet.toLowerCase())) !== null) {
          let start = regResult.index;
          let end = start + pinyin.length;
          addSplitPoint(splitPoints, bits, start, end);
        }
      }

      // 分割点について、 重複を削除して昇順にする。
      var splitPointsArray = Array.from(Object.keys(splitPoints)).sort(
        function(a, b) {
          return a - b;
        });

      // 音節で分割し、typeを付与する
      let syllables = [];
      for (let i = 0; i < splitPointsArray.length - 1; i++) {
        let syllable = targetTextConvertedToHelfWidth.slice(splitPointsArray[i], splitPointsArray[i + 1])
        if (syllable.match(/^[' ]$/)) {
          continue;
        }
        let data = {};
        data["original"] = syllable;
        if (this.isKanji(syllable)) {
          data["type"] = this.TYPE_KANJI;
        } else if (this.isPinyin(syllable)) {
          data["type"] = this.TYPE_PINYIN;
        } else if (this.isAlphabet(syllable)) {
          data["type"] = this.TYPE_ALPHABET;
        } else {
          data["type"] = this.TYPE_OTHER;
        }

        syllables.push(data);
      }

      return syllables;
    },

    isAlphabet(text) {
      return text.match(/^[A-Za-z]+$/);
    },
    isKanji(text) {
      return text.match(/^[\u3005-\u3006\u30e0-\u9fcf]$/);
    },
    isPinyin(text) {
      return text.match(/^[A-Za-z]*[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜüĀÁǍÀĪÍǏÌŌÓǑÒĒÉĚÈŪÚǓÙÜǕǗǙǛ][A-Za-z]*$/);
    },

    // 拼音文字列を英字文字列に変換する。
    convertPinyinTextToAlphabetText: function(pinyinText) {
      var letters = pinyinText.split("");
      for (let i in letters) {
        let alphabet = pinyinAlphabet[letters[i]];
        if (alphabet != null) {
          letters[i] = alphabet;
        }
      }
      return letters.join("");
    },

    convertFullWidthToHalfWidth(pinyinText) {
      return pinyinText
        .replace(/[Ａ-Ｚａ-ｚ]/g, function(s) {
          return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
        })
        .replace(/[　]/g, " ")
        .replace(/[‘’]/g, "'");
    },

    // 1音節の英字文字列を近似音に変換する。
    getKanaOfAlphabet: function(alphabet) {
      let kana = alphabetKana[alphabet.toLowerCase()];
      if (kana == null) {
        return this.UNKNOWN;
      }
      return kana;
    },

    // 引数にとった結果データ（pinyinをもつ）を対象に、pinyinに対応する英字と近似音を付与する。
    addAlphabetInfo: function(resultData) {
      for (let i in resultData) {
        for (let j in resultData[i]) {
          let pinyin = resultData[i][j]["pinyin"];
          if (pinyin == null) {
            continue;
          }
          let alphabet = this.convertPinyinTextToAlphabetText(pinyin);
          let pinyinKana = this.getKanaOfAlphabet(alphabet);
          resultData[i][j]["alphabet"] = alphabet;
          resultData[i][j]["pinyin_kana"] = pinyinKana;
        }
      }
    },
    // 未対応の漢字があるならtrue、そうでなければfalseを返す
    hasUnsupportedCharacter: function(resultData) {
      for (let i in resultData) {
        for (let j in resultData[i]) {
          if (resultData[i][j]["type"] == this.TYPE_KANJI && resultData[i][j]["kanji"] == "") {
            return true;
          }
        }
      }
      return false;
    }


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.header {
  background-color: #ffffff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 0 0.4rem 0.1rem rgba(0, 0, 0, 0.1);
}

.app-name {
  font-size: 0.8rem;
  padding: 0.3rem;
  color: #ffffff;
  background-color: #e06666;
  text-align: center;
}


.header-content {
  margin: 1rem auto;
  width: 80%;
  box-sizing: border-box;
}

.main {
  padding: 3rem 0;
  box-sizing: border-box;
  margin: 1rem auto;
  width: 80%;
}

.main-message {
  padding: 1rem;
  margin: 0 auto 3rem auto;
  text-align: center;
  color: #808080;
  background-color: #F3F3F3;
  border-radius: 1rem;
}

.form {
  width: 100%;
  font-size: 1.5rem;
  padding: 1rem;
  box-sizing: border-box;
  outline: 0;
  border: 2px solid #dddddd;
}

.form::placeholder {
  color: #e0e0e0;
}

.error-input {
  border: 2px solid red;
}

.error-area {
  font-size: 0.5rem;
  color: red;
  height: 1rem;
}

.warning-image {
  margin: 0;
  height: 3rem;
}

.note {
  font-size: 0.8rem;
  color: #909090;
}

.note::before {
  content: "＊";
}

.footer {
  color: #888888;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: #eeeeee;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.5em;
  padding: 0.5em;
  box-sizing: border-box;
}

@media screen and (min-width: 1200px) {
  .app-name {
    font-size: 2rem;
  }

  .header-content {
    width: 40%;
  }

  .main {
    width: 40%;
  }
}
</style>
