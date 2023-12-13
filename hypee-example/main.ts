import { app, BrowserView, BrowserWindow, ipcMain } from "electron";
import path from 'path';
import {downloader, utils} from 'hypee-sdk'
import electronIsDev = require("electron-is-dev");

let window: BrowserWindow;
let view: BrowserView;

app.on("ready", () => {
  window = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    }
  });
  view = new BrowserView({
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js')
    }
  })
  window.addBrowserView(view);
  view.setBounds({
    x: 0,
    y: 0,
    width: 800,
    height: 800,
  })

  if (electronIsDev) {
    view.webContents.loadURL('http://localhost:3000');
  }
  else {
    view.webContents.loadURL(path.join(__dirname, 'app/dist/index.html'))
  }
  downloader.initializeRootPath(app.getPath('userData'));

  ipcMain.on('rootModulePath', async (event) => {
    event.reply('onInitialize', path.join(__dirname, '../node_modules'));
  })

  ipcMain.on('downloadPlugin', async (event) => {
    const plugin = await downloader.downloadPlugin('example-plugin');
    console.log(plugin);
    await utils.sleep(1000);
    const pluginWindow = new BrowserWindow({
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true,
        preload: plugin.preloadPath!!,
        sandbox: false
      }
    });
    pluginWindow.loadFile(plugin.indexHtmlPath!!);
  })
})