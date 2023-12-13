const { contextBridge, ipcRenderer } = require("electron");

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
  console.log(path);
}, true);

ipcRenderer.send('rootModulePath');

contextBridge.exposeInMainWorld("plugin", {
  download: () => {
    ipcRenderer.send('downloadPlugin')
  }
})