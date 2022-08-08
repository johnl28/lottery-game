import { Loader, Texture } from "pixi.js";

import { DEFAULT_ASSET_DIR, RESOURCES, DEVELOPMENT_MODE, GAME_VERSION } from '../constant';



class ContentLoader {
  private loader: Loader = null;
  
  constructor()
  {
    this.initLoader();
    this.initResources();
  }

  public getTexture(resourceName: string): Texture
  {
    return this.loader.resources[resourceName]?.texture;
  }

  public load(callback: Function)
  {
    this.loader.load(() => callback());
  }

  private initLoader()
  {
    this.loader = new Loader(DEFAULT_ASSET_DIR);
    this.loader.defaultQueryString = this.getQueryString();
  }

  private initResources()
  {
    for(const [key, value] of Object.entries(RESOURCES)) {
      this.loader.add(key, value);
    }
  }

  private getQueryString()
  {
    return DEVELOPMENT_MODE ? `?timestamp=${Date.now()}`: `?game-version=${GAME_VERSION}`;
  }
}

const contentLoader: ContentLoader =  new ContentLoader();

export default contentLoader;

