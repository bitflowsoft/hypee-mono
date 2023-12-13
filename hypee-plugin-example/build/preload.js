"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugin = require("./plugin");
const electron_1 = require("electron");
function register(eventName, func, once) {
    if (!electron_1.ipcRenderer.eventNames().includes(eventName)) {
        const ipcEventCallback = (event, args) => {
            func(args);
            if (once) {
                electron_1.ipcRenderer.removeListener(eventName, ipcEventCallback);
            }
        };
        electron_1.ipcRenderer.on(eventName, ipcEventCallback);
    }
}
register('onInitialize', (path) => {
    const { channel } = require(path + '/hypee-sdk');
    plugin.default.onInitialize(channel.channelRegister);
    electron_1.contextBridge.exposeInMainWorld("hypee", {
        channel: {
            register: channel.channelRegister,
            sender: channel.emitter
        }
    });
}, true);
electron_1.ipcRenderer.send('rootModulePath');
