"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const electron_is_dev_1 = __importDefault(require("electron-is-dev"));
const path_1 = __importDefault(require("path"));
let window;
electron_1.app.on('ready', () => {
    window = new electron_1.BrowserWindow({
        width: 1210,
        height: 800,
        webPreferences: {
            preload: path_1.default.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: true
        }
    });
    if (electron_is_dev_1.default) {
        window.loadURL('http://localhost:3000');
    }
});
