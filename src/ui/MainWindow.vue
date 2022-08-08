<script lang="ts">

import MainMenu from './window/MainMenu.vue';
import LoadingWindow from './window/LoadingWindow.vue';
import GameWindow from './window/GameWindow.vue';

export default {
  name: 'MainWindow',
  components: { MainMenu, LoadingWindow, GameWindow },
}
</script>


<template>
  <loading-window v-if="$global.gameState == 'loading'"></loading-window>
  <main-menu v-else-if="$global.gameState == 'idle'"></main-menu>
  <game-window v-else></game-window>
</template>


