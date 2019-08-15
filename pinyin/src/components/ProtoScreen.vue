<template>
<div class="hello">
  <h1>{{app_name}}</h1>
  <div>
    <p> {{headerMsg}}</p>
    <input v-on:input="hoge" v-bind:class="{ 'alert-color' : isError}" v-model="target">
    <p v-if="isError" class="alert-text"> {{errorMsg}}</p>
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
    headerMsg: '中国人の名前を漢字かローマ字で入力してください',
    target: '',
    errorMsg: '漢字かローマ字を入力してください。',
    responce_zh: null,
    responce_ja: null,
  }),
  computed: {
    isError: function() {
      return !(this.target.replace(/\s+/g, '').match(/^[\u3005-\u3006\u30e0-\u9fcf]+$/) 
        || this.target.replace(/\s+/g, '').match(/^[A-Za-z]*$/))
    }
  },
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

.alert-color {
  border-color: red;
}

.alert-text {
  color: red;
}
</style>