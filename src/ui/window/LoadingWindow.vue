<script lang="ts">
import ProgressBar from "../components/ProgressBar.vue"

export default {
  name: 'LoadingWindow',
  components: {ProgressBar}
}
</script>

<template>
  <div class="window loading-window">
    <div class="loading-box">
      <progress-bar :percentage="$global.loadingPercentage"></progress-bar>
    </div>
  </div>
</template>


<style scoped>
.loading-window {
  display: flex;
  align-items: center;
  justify-content: center;
}
.loading-box {
  display: flex;
}

.progress-bar {
  height: 30px;
  width: 500px;
}
</style>