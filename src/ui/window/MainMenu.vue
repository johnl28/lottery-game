<script lang="ts">
import { MAX_NUMBERS_AVAILABLE, NUMBERS_REQUIRED } from '../../constant';
import { defineComponent } from "vue";
import { game } from '../../game/core';

export default defineComponent({
  name: 'MainMenu',

  computed: {
    selectedNumbers(): number[] {
      return this.$global.selectedNumbers;
    },

    selectedNumbersCount(): number {
      return this.selectedNumbers.length;
    },

    requiredNumbers(): number {
      return NUMBERS_REQUIRED;
    },

    allNumbersSelected(): Boolean {
      return NUMBERS_REQUIRED == this.selectedNumbersCount;
    },
    
    maxNumbers(): number {
      return MAX_NUMBERS_AVAILABLE;
    },
    
  },

  methods: {
    StartGame()
    {
      if(!this.CanStart()) {
        return;
      }

      game.startGame();
    },

    CanStart(): boolean
    {
      return this.selectedNumbersCount == NUMBERS_REQUIRED;
    },

    IsNumberSelected(number: number): number
    {
      return this.selectedNumbers.find((n: number) => n == number);
    },

    RandomSelect()
    {
      this.ResetNumbers();

      while(!this.allNumbersSelected) {
        const num = Math.floor(Math.random() * this.maxNumbers);
        this.ToggleNumber(num + 1)
      }
    },


    ToggleNumber(number: number)
    {
      const index = this.selectedNumbers.indexOf(number);

      if(index != -1) {
        this.$global.selectedNumbers.splice(index, 1);
        return;
      }

      if(this.allNumbersSelected) {
        return;
      }

      this.$global.selectedNumbers.push(number);
    },

    ResetNumbers()
    {
      this.$global.selectedNumbers = [];
    },

    ResetGame()
    {
      game.reset();
    }
    
  }
})
</script>


<template>
  <div class="window main-menu">

    <h1>Total Credit: {{$global.totalCredit}}</h1>
    <div class="menu-buttons">
      <button class="button" @click="StartGame">
        Start
      </button>
      <button class="button" @click="RandomSelect">
        Lucky Dip
      </button>
      <button class="button" @click="ResetNumbers">
        Reset Selection
      </button>

      <button class="button" @click="ResetGame">
        Reset Game
      </button>
    </div>

    <div class="selected-count">
      {{selectedNumbersCount}}/{{requiredNumbers}}
    </div>

    <div class="number-table">
      <div class="number-btn" v-for="i in maxNumbers" :key="i" @click="ToggleNumber(i)" :selected="IsNumberSelected(i)">
        {{i}}
      </div>
    </div>
  </div>
</template>

<style scoped>
.main-menu {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: column;
}

.menu-buttons {
  display: flex;
  gap: 5px;
}

.menu-buttons .button {
  font-size: x-large;
}

.number-table {
  width: 100%;
  padding: 50px;
  background-color: rgba(0, 0, 0, 0.103);
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.number-btn {
  background-color: rgb(204, 204, 204);
  color: black;
  font-weight: bold;
  font-size: x-large;
  text-align: center;
  line-height: 70px;
  width: 70px;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
}

.number-btn:hover {
  outline: solid 5px deepskyblue;
}

.number-btn[selected] {
  outline: solid 5px dodgerblue;
}

.selected-count {
  padding: 50px;
  font-size: 40px;
  font-weight: bold;
}
</style>