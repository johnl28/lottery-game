import './style/main.css';

import { createGame } from './game/core';
import { createInterface } from './ui/userInterface';

const userInterface = createInterface();
userInterface.mount();

const game = createGame();
game.mount();
window.onresize = () => game.onResize();


declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $global: Record<string, any>;
  }
}
