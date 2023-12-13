"use strict";
const { contextBridge, ipcRenderer } = require("electron");
function register(eventName, func, once) {
    if (!ipcRenderer.eventNames().includes(eventName)) {
        const ipcEventCallback = (event, args) => {
            func(args);
            if (once) {
                ipcRenderer.removeListener(eventName, ipcEventCallback);
            }
        };
        ipcRenderer.on(eventName, ipcEventCallback);
    }
}
function onInitialize() {
}
register('onInitialize', (path) => {
    console.log(path);
}, true);
ipcRenderer.send('rootModulePath');
contextBridge.exposeInMainWorld("plugin", {
    download: () => {
        ipcRenderer.send('downloadPlugin');
    }
});
