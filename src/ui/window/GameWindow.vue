<script lang="ts">
import { defineComponent } from "vue";
import { game } from "../../game/core";

export default defineComponent({
  name: 'GameWindow',

  methods: {
    isMatching(number: number): number {
      return this.$global.drawnBalls.includes(number);
    },

    openMenu()
    {
      game.tryAgain();
    }
  }
})
</script>


<template>
<div class="window game-window">
  <div class="picked-numbers">
    <h3>Credit: {{$global.totalCredit}}</h3>
    <div v-for="number in $global.selectedNumbers" :key="number" :matched="isMatching(number)" class="number">
      {{number}}
    </div>
  </div>

  <button class="button try-again-btn" @click="openMenu" v-if="$global.tryAgainBtnVisible">
    Try Again
  </button>
</div>
</template>


<style scoped>
.game-window {
  display: flex;
  justify-content: center;
}

.picked-numbers {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  width: 100px;
  height: fit-content;
  padding: 10px;
  right: 0;
  top: 20%;
  background-color: rgba(0, 0, 0, 0.274);
}

.number {
  background-image: url('/assets/ball.png');
  color: white;
  font-size: large;
  background-repeat: no-repeat;
  height: 50px;
  width: 50px;
  font-weight: bold;
  line-height: 50px;
  text-align: center;
  animation: slide-up 0.5s;
}

.number[matched=true] {
  background-image: url('/assets/ball_red.png');
}

.try-again-btn {
  margin: 25%;
}
</style>