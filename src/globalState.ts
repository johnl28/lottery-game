import { reactive } from "vue";
import { GameState } from "./constant";


const STATE_BLUEPRINT = {
  gameState: GameState.LOADING,
  loadingPercentage: 0,
  totalCredit: 0,
  tryAgainBtnVisible: false,

  drawnBalls: [] as number[],
  selectedNumbers: [] as number[]
};


let globalState = reactive(STATE_BLUEPRINT);

export default globalState;
