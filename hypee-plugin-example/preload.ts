import plugin = require('./plugin');
import { contextBridge, ipcRenderer } from 'electron';

function register(eventName: string, func: Function, once: boolean) {
  if (!ipcRenderer.eventNames().includes(eventName)) {
    const ipcEventCallback = (event: any, args: any[]) => {
      func(args);
      if (once) {
        ipcRenderer.removeListener(eventName, ipcEventCallback);
      }
    };
    ipcRenderer.on(eventName, ipcEventCallback);
  }
}

register('onInitialize', (path: string) => {
  const { channel } = require(path + '/hypee-sdk');
  plugin.default.onInitialize(channel.channelRegister);

  contextBridge.exposeInMainWorld("hypee", {
    channel: {
      register: channel.channelRegister,
      sender: channel.emitter
    }
  })
}, true);

ipcRenderer.send('rootModulePath');