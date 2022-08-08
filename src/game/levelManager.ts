
import {  MAX_NUMBERS_AVAILABLE, NUMBERS_REQUIRED, MATCH_PRIZE_TABLE } from "../constant";

import globalState from "../globalState";

import Ball from "./entity/ball";
import GameStage from "./gameStage";


class LevelManager {
  private gameStage: GameStage = null;
  private matchedBalls: number = 0;

  constructor(gameStage: GameStage)
  {
    this.gameStage = gameStage;
  }

  public resetLevel()
  {
    globalState.drawnBalls = [];
    globalState.selectedNumbers = [];

    this.matchedBalls = 0;
    this.gameStage.visible = false;
    this.gameStage.destroyEntities();
  }

  public startLevel()
  {
    this.spawnBalls();
    this.gameStage.visible = true;

    this.drawBalls();
  }

  private spawnBalls()
  {
    for(let i = 1; i <= MAX_NUMBERS_AVAILABLE; i++) {
      this.spawnRandomBall(i+1);
    }
  }

  private drawBalls()
  {
    for (let i = 0; i < NUMBERS_REQUIRED; ++i)
    {
      setTimeout(() => this.drawBall(), (i + 1) * 3000);
    }

    setTimeout(() => this.endLevel(), 4000 * NUMBERS_REQUIRED)
  }

  private drawBall()
  {
    const number = this.generateNumber();

    const dranwBall = this.spawnBall(number, this.gameStage.width / 2, 50);
    dranwBall.setPhysics(true);

    globalState.drawnBalls.push(number);

    if(globalState.selectedNumbers.includes(number)) {
      ++this.matchedBalls;
      dranwBall.setMatchedBall();
    }
  }

  private endLevel()
  {
    this.processReward();
    this.showTryAgainBtn();
  }

  private processReward()
  {
    const creditReward = MATCH_PRIZE_TABLE[this.matchedBalls];
    if(creditReward == null) {
      return;
    }

    globalState.totalCredit += creditReward;
  }

  private showTryAgainBtn()
  {
    globalState.tryAgainBtnVisible = true;
  }

  private spawnRandomBall(number: number): Ball
  {
    return this.spawnBall(number, (Math.random() * this.gameStage.width), this.gameStage.height - Math.random() * 50)
  }

  private spawnBall(number: number, x: number, y: number): Ball
  {
    return this.gameStage.spawnBall(number, x, y);
  }

  private generateNumber(): number
  {
    let randomNumber = this.getRandomNumber();
    while(globalState.drawnBalls.includes(randomNumber)) {
      randomNumber = this.getRandomNumber();
    }

    return randomNumber;
  }

  private getRandomNumber(): number
  {
    return Math.floor((Math.random() * MAX_NUMBERS_AVAILABLE) + 1);
  }

}


export default LevelManager;












