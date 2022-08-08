export {};

declare global {
  

  interface EntitiesContainer {
    [name: number]: Entity
  }

  interface MoveDirection {
    x: number;
    y: number;
    rotation: number;
  }

  interface Velocity extends MoveDirection {}

  interface PrizeTable {
    [key: number]: number;
  }
}



