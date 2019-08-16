<template>
<div class="hello">
  <h1>{{app_name}}</h1>
  <div>
    <input v-on:input="hoge">
  </div>
  <ResultArea title="中国語読み" v-bind:responce="responce['zh']" />
  <ResultArea title="日本語読み" v-bind:responce="responce['ja']" />
</div>
</template>



<script>
import axios from 'axios'
import ResultArea from '@/components/ResultArea.vue'

export default {
  name: 'ProtoScreen',
  props: {
    app_name: String
  },
  data: () => ({
    responce: {
      ja: null,
      zh: null
    },
  }),
  components: {
    ResultArea
  },
  methods: {
    hoge: function() {
      var url = "" + process.env.VUE_APP_SERVER_TRANSLATION;
      this.$jsonp(url, {
        chineseName: '習近平'
      }).then(data => {
        console.log(data);
        this.responce = data;
      })
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
</style>
