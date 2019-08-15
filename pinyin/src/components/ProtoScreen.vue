<template>
<div class="hello">
  <h1>{{app_name}}</h1>
  <div>
    <input v-on:input="hoge">
  </div>
  <ResultArea title="中国語読み" v-bind:responce="responce_zh" />
  <ResultArea title="日本語読み" v-bind:responce="responce_ja" />
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
    responce_zh: null,
    responce_ja: null,
    kanji: '',
  }),
  components: {
    ResultArea
  },
  methods: {
    hoge: function() {
      let params = new URLSearchParams();
      params.append('hellotext', 'Hello Async!');
      axios.post(process.env.VUE_APP_SERVER_API_URL, params).then((responce) => {
        console.log(responce.data + ' :async test');
        this.responce_zh = [{
            'ruby': 'シー',
            'main': 'xi',
          },
          {
            'ruby': 'チン',
            'main': 'jin',
          },
          {
            'ruby': 'ピン',
            'main': 'ping',
          },
        ];
        this.responce_ja = [{
            'ruby': 'しゅう',
            'main': '習',
          },
          {
            'ruby': 'きん',
            'main': '近',
          },
          {
            'ruby': 'へい',
            'main': '平',
          },
        ];
      }, (error) => {
        console.log(error);
      });
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
