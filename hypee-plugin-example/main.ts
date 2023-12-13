import { app, BrowserWindow } from 'electron';
import electronIsDev from 'electron-is-dev';
import path from 'path';

let window: BrowserWindow;

app.on('ready', () => {
  window = new BrowserWindow({
    width: 1210,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: true
    }
  })
  if (electronIsDev) {
    window.loadURL('http://localhost:3000');
  }
})