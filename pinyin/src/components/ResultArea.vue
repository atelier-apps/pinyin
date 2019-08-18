<template>
<div class="result-area">
  <div class="title">{{title}}</div>
  <div class="content" v-html="content">
  </div>
</div>
</template>

<script>
export default {
  name: 'ResultArea',
  props: {
    title: String,
    responce: Array,
  },
  computed: {
    content: function() {
      let r = this.responce;
      if (r == null) {
        return "<div class='block'>ここに結果を表示します</div>";
      }
      let html = "";
      for (let i in r) {
        html +=
          "<div class='block'>" +
          "<div class='ruby'>" + r[i]["ruby"] + "</div>" +
          "<div class='main'>" + r[i]["main"] + "</div>" +
          "</div>";
      }
      return html;
    },
  },
  data: () => ({

  }),
  methods: {
    hoge: function() {

    }
  }
}
</script>

<style scoped>
.result-area {
  background-color: red;
  height: 10em;
  width: 40%;
  margin: 2em auto;
}

.title {
  background-color: gray;
  height: 30%;
}

.content {
  background-color: pink;
  display: flex;
  height: 70%;
}

.content>>>.block {
  background-color: red;
  margin: 1em;
}

.content>>>.ruby {
  background-color: yellow;
  font-size: 0.8em;
}

.content>>>.main {
  background-color: white;
  font-size: 2em;
  height: 80%;
}
</style>
