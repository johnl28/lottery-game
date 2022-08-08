
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: "ProgressBar",

  props: {
    percentage: {
      type: [String, Number],
      default: 0
    }
  },

})
</script>

<template>
  <div class="progress-bar">
    <div class="progress" :style="`width: ${percentage}%;`"></div>
  </div>
</template>


<style scoped>
.progress-bar {
  position: relative;
  border-radius: 10px;
  overflow: hidden;
  background-color: rgb(36, 36, 36);
}

.progress {
  position: absolute;
  left: 0; right: 0;
  height: 100%;
  background-color: dodgerblue;
  transition-duration: 0.3s;
}
</style>