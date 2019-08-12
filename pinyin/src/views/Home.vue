<template>
<div class="home">
  <img alt="Vue logo" src="../assets/logo.png">
  <ProtoScreen msg="Find me in Hone.vue" />
</div>
</template>

<script>
// @ is an alias to /src
import ProtoScreen from '@/components/ProtoScreen.vue'

export default {
  name: 'home',
  components: {
    ProtoScreen
  }
}
</script>
