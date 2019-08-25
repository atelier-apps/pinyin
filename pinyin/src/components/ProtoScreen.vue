<template>
<div class="page">
  <div class="header">
    <div class="app-name"> {{app_name}}</div>
    <div class="header-content">
      <div class="header-message"> {{headerMsg}}</div>
      <input class="form" v-on:input="translate" v-bind:class="{ 'error-input' : isError}" v-model="target" :placeholder="[[inputPlaceholder]]" spellcheck="false">
      <div class="error-area">
        <span v-if="isError" id="id_charactertype"> {{errorMsg}}</span>
        <span v-if="isOverLimit" id="id_overlimit"> {{lengthErrorMsg}}</span>

      </div>
    </div>
  </div>
  <div class="main">
    <div v-if="resultLength>1" class="main-message">{{caseMsg}}</div>
    <div v-if="resultLength==0">
      <ResultArea v-bind:result="null" />
    </div>
    <div v-for="r in result">
      <ResultArea v-bind:result="r" />
    </div>
    <div　class="note">{{policyMsg}}</div>
  </div>
  <div class="footer">{{copyright}}</div>
</div>
</template>



<script>
import axios from 'axios'
import ResultArea from '@/components/ResultArea.vue'
import pinyinList from '@/assets/pinyinList.json'

export default {
  name: 'ProtoScreen',
  props: {
    app_name: String
  },
  data: () => ({
    MAX_LENGTH: 8,
    KANJI_UNKNOWN: "？",
    KANJI_KANA_UNKNOWN: "？？",
    headerMsg: '▼中国人名を漢字か英字で入力',
    caseMsg: 'この名前は字の意味によって表記と読み方が変わります。',
    target: '',
    errorMsg2: '%s文字以下で入力してください。',
    errorMsg: '漢字か英字を入力してください。',
    result: {},
    inputPlaceholder: "鲁迅",
    policyMsg: "日本名の読み仮名は正統な漢音を採用しており、通俗的な読み方とは異なる可能性があります。例えば、「毛沢東」は通俗的な読み方では「モウタクトウ」ですが、正統な漢音では「ボウタクトウ」となります。",
    copyright: "Developed by 日曜大工"
  }),
  computed: {
    lengthErrorMsg() {
      return this.errorMsg2.replace("%s", this.MAX_LENGTH)
    },
    isError() {
      return !(this.target.replace(/\s+/g, '').match(/^[\u3005-\u3006\u30e0-\u9fcf]+$/) ||
        this.target.replace(/\s+/g, '').match(/^[A-Za-z]*$/))
    },
    isOverLimit() {
      return this.target.length > this.MAX_LENGTH
    },
    resultLength() {
      return Object.keys(this.result).length;
    }
  },
  components: {
    ResultArea
  },
  methods: {
    translate: function() {
      if (this.isOverLimit) {
        console.log("文字数で弾いた")
        return
      }
      if (this.isError) {
        console.log("文字種類で弾いた")
        return
      }



      // シラブルを配列で取得
      //var syllables = this.splitBySyllable(this.target);

      var syllables = this.splitBySyllable("谷乐发绿");

      // TODO: 英字しかない場合はここで適切に値を設定してreturn

      // TODO: 既知の文字ならばここで解決したい


      // ここまでで解決しなかったらサーバーに託す
      var url = "" + process.env.VUE_APP_SERVER_TRANSLATION;
      this.$jsonp(url, {
        syllableString: JSON.stringify(syllables),
      }).then(data => {
        console.log(data);
        this.result = data;
      })
    },

    splitBySyllable: function(chineseName) {
      let characters = chineseName.split("");
      let syllables = [];
      for (let i in characters) {
        let data = {};
        data["type"] = "K";
        data["original"] = characters[i];
        syllables.push(data);
      }
      return syllables;
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
  box-shadow: 0.2rem 0.2rem 1rem 0.2rem rgba(0, 0, 0, 0.2);
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
  padding: 10rem 0;
  box-sizing: border-box;
  margin: 1rem auto;
  width: 80%;
}

.main-message {
  padding: 2rem 0 0 0;
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

.note {
  font-size: 0.8rem;
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
    width: 30%;
  }

  .main {
    width: 30%;
  }
}
</style>
