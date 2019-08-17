<template>
<div class="hello">
  <h1>{{app_name}}</h1>
  <div>
    <p> {{headerMsg}}</p>
    <input v-on:input="translate" v-bind:class="{ 'error-input' : isError}" v-model="target">
    <p v-if="isError" class="error-text"> {{errorMsg}}</p>
    <p v-if="isOverLimit" class="error-text"> {{lengthErrorMsg}}</p>
  </div>
  <ResultArea title="中国語読み" v-bind:responce="result['zh']" />
  <ResultArea title="日本語読み" v-bind:responce="result['ja']" />
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
    headerMsg: '中国人の名前を漢字かローマ字で入力してください',
    target: '',
    errorMsg2: '文字以下で入力してください。',
    errorMsg: '漢字かローマ字を入力してください。',
    result: {
      "zh": null,
      "ja": null
    },
  }),
  computed: {
    lengthErrorMsg() {
      return this.MAX_LENGTH + this.errorMsg2
    },
    isError() {
      return !(this.target.replace(/\s+/g, '').match(/^[\u3005-\u3006\u30e0-\u9fcf]+$/) ||
        this.target.replace(/\s+/g, '').match(/^[A-Za-z]*$/))
    },
    isOverLimit() {
      return this.target.length > this.MAX_LENGTH
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

      var syllables = this.splitBySyllable(this.target);

      // 値としてコピーする
      let syllablesString = JSON.stringify(syllables);
      this.result["zh"] = JSON.parse(syllablesString)
      this.result["ja"] = JSON.parse(syllablesString)


      // すぐにわかるものは解決する
      for (let i in this.result["ja"]) {
        var res = this.result["ja"][i];
        if (res["type"] == "R") {
          res["main"] = this.KANJI_UNKNOWN;
          res["ruby"] = this.KANJI_KANA_UNKNOWN;
        }
      }
      for (let i in this.result["zh"]) {
        var res = this.result["zh"][i];
        if (res["type"] == "R") {
          res["main"] = res["original"];
          res["ruby"] = pinyinList[res["main"]]
        }
      }

      // 既知の文字ならばここで解決したい


      // ここまでで解決しなかったらサーバーに託す
      var url = "" + process.env.VUE_APP_SERVER_TRANSLATION;
      this.$jsonp(url, {
        resultString: JSON.stringify(this.result),
      }).then(data => {
        for (let i in data["zh"]) {
          var res = data["zh"][i];
          res["ruby"] = pinyinList[res["main"]]
        }
        this.result = data
      })
    },
    splitBySyllable: function(chineseName) {
      let characters = chineseName.split("");
      let syllables = [];
      for (let i in characters) {
        let data = {};
        data["type"] = "K";
        data["original"] = characters[i];
        data["main"] = "…";
        data["ruby"] = "…";
        syllables.push(data);
      }
      return syllables;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.error-input {
  border-color: red;
}

.error-text {
  color: red;
}
</style>
