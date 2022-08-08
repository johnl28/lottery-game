
import { TilingSprite } from "pixi.js";

import contentLoader from "./contentLoader";
import Entity from "./entity/entity";
import Ball from "./entity/ball";



class GameStage extends TilingSprite {
  private entities: EntitiesContainer = {};
  private lastEntityId: number = 0;

  constructor(width: number, height: number)
  {
    super(contentLoader.getTexture("background"), width, height);
    this.visible = false;
  }
  
  public spawnBall(ballNumber: number, x: number, y: number): Ball
  {
    const ball = new Ball(this.newEntityId, ballNumber);
    this.addEntity(ball);

    ball.setPosition(x, y);
    return ball;
  }

  public addEntity(entity: Entity)
  {
    entity.setStage(this);
    this.entities[entity.getId()] = entity;
  }

  public alignCenter(width: number)
  {
    this.position.x = width / 2 - this.width / 2;
  }

  public destroyEntities()
  {
    for (let id in this.entities) {
      this.entities[id].destroy();
    }

    this.entities = {};
  }

  public onUpdate()
  {
    for (let id in this.entities) {
      this.entities[id].onUpdate();
    }
  }

  get newEntityId(): number
  {
    return ++this.lastEntityId;
  }

}


export default GameStage;





