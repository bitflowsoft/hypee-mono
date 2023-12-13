"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const path_1 = __importDefault(require("path"));
const hypee_sdk_1 = require("hypee-sdk");
const electronIsDev = require("electron-is-dev");
let window;
let view;
electron_1.app.on("ready", () => {
    window = new electron_1.BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
        }
    });
    view = new electron_1.BrowserView({
        webPreferences: {
            nodeIntegration: true,
            preload: path_1.default.join(__dirname, 'preload.js')
        }
    });
    window.addBrowserView(view);
    view.setBounds({
        x: 0,
        y: 0,
        width: 800,
        height: 800,
    });
    if (electronIsDev) {
        view.webContents.loadURL('http://localhost:3000');
    }
    else {
        view.webContents.loadURL(path_1.default.join(__dirname, 'app/dist/index.html'));
    }
    hypee_sdk_1.downloader.initializeRootPath(electron_1.app.getPath('userData'));
    electron_1.ipcMain.on('rootModulePath', (event) => __awaiter(void 0, void 0, void 0, function* () {
        event.reply('onInitialize', path_1.default.join(__dirname, '../node_modules'));
    }));
    electron_1.ipcMain.on('downloadPlugin', (event) => __awaiter(void 0, void 0, void 0, function* () {
        const plugin = yield hypee_sdk_1.downloader.downloadPlugin('example-plugin');
        console.log(plugin);
        yield hypee_sdk_1.utils.sleep(1000);
        const pluginWindow = new electron_1.BrowserWindow({
            width: 800,
            height: 600,
            webPreferences: {
                nodeIntegration: true,
                preload: plugin.preloadPath,
                sandbox: false
            }
        });
        pluginWindow.loadFile(plugin.indexHtmlPath);
    }));
});
