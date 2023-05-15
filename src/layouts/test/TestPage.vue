<template>
  <div v-for="item in msg" >
    {{item}}
  </div>
</template>
<script lang="ts" setup>
import {onMounted, inject, ref} from 'vue'
const msg = ref([])
onMounted(() => {
  const socket = inject('socket')
  const ws = socket('websocket/message')
  ws.onopen = () => {
    let msg = {
      type: 'screen',
      classId: 1
    }
    ws.send(JSON.stringify(msg))
  }
  ws.onmessage = ({ data }) => {
    console.log(data)
    msg.value.push(data)
  }
})


</script>
<style scoped>

</style>