import { Text, TextStyle } from "pixi.js";
import Entity from "./entity";

class Ball extends Entity {
  private number: number = 0;
  private weight: number = 3;

  // private bounches: number = 0;

  private direction: MoveDirection = {
    x: Math.random(),
    y: 1,
    rotation: 0
  };

  private velocity: Velocity = {
    x: 0,
    y: 0,
    rotation: 0
  };

  private physics: boolean = false;
  private collision: boolean = true;

  constructor(id: number, ballNumber: number)
  {
    super(id);

    this.setNumber(ballNumber);
    this.setResourceTexture("ball");

    this.initLabel();
    this.updateCenteredPivot();
  }

  private initLabel()
  {
    const basicText = new Text(`${this.number}`, this.getLabelStyle());

    basicText.x = this.width / 2 - basicText.width / 2;
    basicText.y = this.height / 2 - basicText.height / 2;
    this.addChild(basicText);
  }

  private getLabelStyle(): TextStyle
  {
    return new TextStyle({
      fontSize: 20,
      align: 'center',
      fontWeight: 'bold',
      fill: ['#ffffff'],
      lineJoin: 'round',
    });
  }

  public setNumber(ballNumber: number)
  {
    this.number = ballNumber;
  }

  public getNumber(): number 
  {
    return this.number;
  }

  public setMatchedBall()
  {
    this.setResourceTexture("ball_red");
  }

  public onUpdate()
  {
    this.updatePhysics();
  }

  private updatePhysics()
  {
    if(!this.physics) {
      return;
    }

    this.checkCollision();
    this.calcVelocity();

    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.rotation += this.velocity.rotation;
  }

  private checkCollision()
  {
    if(!this.collision) {
      return;
    }

    this.checkEnvCollision();
  }

  private checkEnvCollision()
  {

    if (this.y + this.height >= this.stage.height)
    {
      this.direction.y = -1;
      // this.bounch();
    }
    else if (this.y <= 0)
    {
      this.direction.y = 1;
    }

    else if(this.x + this.width >= this.stage.width)
    {
      this.direction.x = -1;
    }
    else if(this.x <= 0)
    {
      this.direction.x = 1;
    }
    else {
      return;
    }

    this.colide();
  }

  public checkEntityCollision(entity: Ball): Boolean
  {
    const d = Math.sqrt((this.x - entity.x)**2 + (this.y - entity.y)**2)
    return (d < this.radius + entity.radius)
  }

  private colide()
  {
    this.velocity.rotation = Math.random() * 0.1;
    this.velocity.rotation *= Math.random() > 0.5 ? -1: 1;
  }


  private calcVelocity()
  {
    this.velocity.x = this.direction.x * this.weight;
    this.velocity.y = this.direction.y * this.weight;
  }

  public setPhysics(physics: boolean)
  {
    this.physics = physics;
  }

  private get radius(): number
  {
    return this.height / 2;
  }
}



export default Ball;






