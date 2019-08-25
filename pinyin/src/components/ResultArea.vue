<template>
<div class="result-area">
  <div class="title">{{title}}</div>
  <div class="header main">日本名</div>
  <div class="content">
    <div class="ruby">
      <span class="japanese-block placeholder" v-if="result==null" v-for="r in resultPlaceholder" v-text="r['kanji_kana']"></span>
      <span class="japanese-block" v-for="r in result" v-text="r['kanji_kana']"></span>
    </div>
    <div class="kanji">
      <span class="japanese-block placeholder" v-if="result==null" v-for="r in resultPlaceholder" v-text="r['kanji']"></span>
      <span class="japanese-block" v-for="r in result" v-text="r['kanji']"></span>
    </div>
  </div>
  <div class="header sub">現地読み</div>
  <div class="sub-content">
    <div class="row">
      <div class="row-label">近似音</div>
      <div class="row-content">
        <span class="japanese-block placeholder" v-if="result==null" v-for="r in resultPlaceholder" v-text="r['pinyin_kana']"></span>
        <span class="chinese-block kana" v-for="r in result" v-text="r['pinyin_kana']"></span>
      </div>
    </div>
    <div class="row">
      <div class="row-label">拼音</div>
      <div class="row-content">
        <span class="japanese-block placeholder" v-if="result==null" v-for="r in resultPlaceholder" v-text="r['pinyin']"></span>
        <span class="chinese-block" v-for="r in result" v-text="r['pinyin']"></span>
      </div>
    </div>
    <div class="row">
      <div class="row-label">英字</div>
      <div class="row-content">
        <span class="japanese-block placeholder" v-if="result==null" v-for="r in resultPlaceholder" v-text="r['alphabet']"></span>
        <span class="chinese-block" v-for="r in result" v-text="r['alphabet']"></span>
      </div>
    </div>
  </div>
</div>

</div>
</template>

<script>
export default {
  name: 'ResultArea',
  props: {
    result: Array,
  },
  computed: {
    title: function() {
      let r = this.result;
      let conditions = [];
      for (let i in r) {
        if (r[i]["meaning"] != null) {
          conditions.push(r[i]["original"] + "：" + r[i]["meaning"]);
        }
      }
      if (conditions.length > 0) {
        return conditions.join("｜");
      }
      return "";
    }
  },
  data: () => ({
    resultPlaceholder: [{
        "kanji": "魯",
        "kanji_kana": "ロ",
        "pinyin": "lǔ",
        "alphabet": "lu",
        "pinyin_kana": "ルー"
      },
      {
        "kanji": "迅",
        "kanji_kana": "ジン",
        "pinyin": "xùn",
        "alphabet": "xun",
        "pinyin_kana": "シュン"
      }
    ]
  }),
  methods: {}
}
</script>

<style scoped>
.result-area {
  width: 100%;
  margin: 4em auto;
  text-align: left;
}

.title {}

.header {
  color: #ffffff;
  padding: 0.5rem 1rem;
}

.header.main {
  background-color: #e06666;
}

.header.sub {
  background-color: #b0b0b0;
}

.content {
  background-color: #f3f3f3;
  padding: 1rem 0.5rem;
}

.sub-content {
  background-color: #f3f3f3;
  font-size: 0.8em;
}

.ruby {
  font-size: 0.5rem;
  display: flex;
}

.kanji {
  font-size: 2rem;
  display: flex;
}

.row {
  display: flex;
  width: 100%;
}

.row:not(:last-child) {
  border-bottom: 1px solid #eeeeee;
}

.row-label {
  width: 3rem;
  background-color: #efefef;
  padding: 0.5rem 1rem;
}

.row-content {
  display: flex;
}

.japanese-block {
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chinese-block {
  width: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}

.chinese-block.kana {
  font-size: 0.6em;
}

.placeholder {
  color: #cccccc;
}
</style>
