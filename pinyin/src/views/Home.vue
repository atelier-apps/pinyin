<template>
<div class="home">
  <ProtoScreen app_name="プロトタイプ" />
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
