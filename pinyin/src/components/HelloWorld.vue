<template>
<div class="hello">
  <h1>{{msg}}</h1>
  <button v-on:click="hoge">Async test</button>
</div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: () => ({
    piyo: "hi!",
  }),
  methods: {
    hoge: function() {
      let params = new URLSearchParams();
      params.append('hellotext', 'Hello Async!');
      params.append('piyo', this.piyo);
      axios.post(process.env.VUE_APP_SERVER_API_URL, params).then((responce) => {
        console.log(responce.data);
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
