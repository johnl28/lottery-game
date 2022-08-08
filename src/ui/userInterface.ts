
import { createApp, App } from 'vue';

import globalState from '../globalState';
import MainWindow from './MainWindow.vue';

class UserInterface {
  vueApp: App = null;

  constructor()
  {
    this.initVueApp();
    this.initGlobalProperties();
  }

  initVueApp()
  {
    this.vueApp = createApp(MainWindow);
  }

  initGlobalProperties()
  {
    let globalProperties = this.vueApp.config.globalProperties;
    globalProperties.$global = globalState;
  }

  mount()
  {
    this.vueApp.mount(document.getElementById("ui"));
  }

}

export let userInterface: UserInterface = null;


export function createInterface(): UserInterface
{
  userInterface = new UserInterface();
  return userInterface;
}








