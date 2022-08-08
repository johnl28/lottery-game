import { Container, Sprite } from "pixi.js";
import contentLoader from "../contentLoader";
import GameStage from "../gameStage";


class Entity extends Container {
  private id: number = 0;
  private mainSprite: Sprite = null;
  protected stage: GameStage = null;

  constructor(id: number)
  {
    super();

    this.id = id;
    this.initMainSprite();
  }

  public setStage(stage: GameStage)
  {
    this.stage = stage;
    // this.stage.addChild(this);
    this.setParent(this.stage)
  }

  private initMainSprite()
  {
    this.mainSprite = new Sprite(null);
    this.mainSprite.visible = true;
    this.addChild(this.mainSprite);
  }

  public updateCenteredPivot()
  {
    this.pivot.x = this.width / 2;
    this.pivot.y = this.height / 2;
  }

  public setResourceTexture(resourceName: string)
  {
    const texture = contentLoader.getTexture(resourceName);
    if(!texture) {
      console.error(`Entity:setResource: Unknown resource name ${resourceName} for entity id ${this.id}`);
      return;
    }

    this.mainSprite.texture = texture;
    this.mainSprite.texture.update();
    this.updateCenteredPivot();
  }

  public getId(): number 
  {
    return this.id;
  }

  public setPosition(x: number, y: number)
  {
    this.position.set(x, y);
  }

  public onUpdate() {}
}

export default Entity;






