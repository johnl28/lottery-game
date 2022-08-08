import { Application } from 'pixi.js';

import { GameState } from '../constant';

import globalState from '../globalState';
import contentLoader from './contentLoader';

import LevelManager from './levelManager';
import GameStage from './gameStage';

const APP_OPTIONS = {
  width: window.innerWidth,
  height: window.innerHeight,
  resizeTo: window,
  autoStart: false,
  transparent: true
}


class GameCore extends Application {
  private gameStage: GameStage = null;
  private levelManager: LevelManager = null;

  constructor()
  {
    super(APP_OPTIONS);
  }

  public mount()
  {
    document.body.appendChild(this.view);
    this.loadContent();
  }

  private loadContent()
  {
    contentLoader.load(() => {
      this.initStage();
    });
  }

  private initStage()
  {
    this.gameStage = new GameStage(500, this.view.height);
    this.stage.addChild(this.gameStage);
    this.gameStage.alignCenter(this.view.width);

    this.initLevelManager();
  }


  private initLevelManager()
  {
    this.levelManager = new LevelManager(this.gameStage);
    this.initGameLoop();
  }

  public initGameLoop()
  {
    this.setGameState(GameState.IDLE);

    this.ticker.add(() => this.onGameUpdate());
    this.start();
  }

  private onGameUpdate()
  {
    if(!this.isState(GameState.RUNNING)) {
      return;
    }
    
    this.gameStage.onUpdate();
  }
  
  public onResize()
  {
    this.gameStage.alignCenter(this.view.width);
  }


  public startGame()
  {
    this.setGameState(GameState.RUNNING);

    this.levelManager.startLevel();
  }

  public tryAgain()
  {
    globalState.tryAgainBtnVisible = false;
    this.levelManager.resetLevel();
    this.setGameState(GameState.IDLE);
  }

  public setGameState(state: GameState) 
  {
    globalState.gameState = state;
  }

  public isState(state: GameState): boolean
  {
    return globalState.gameState == state;
  }

  public reset()
  {
    globalState.totalCredit = 0;
  }

}

export let game: GameCore = null;

export function createGame(): GameCore {
  game = new GameCore();
  return game;
}

