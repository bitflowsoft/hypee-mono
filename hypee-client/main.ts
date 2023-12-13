import { app, BrowserView, BrowserWindow } from "electron";
import path = require('path');
import electronIsDev = require('electron-is-dev');

const defaultWindowSize = {
  width: 1280,
  height: 720,
};

let window: BrowserWindow;
let tabView: BrowserView;
let gnbView: BrowserView;
let mainView: BrowserView;

app.on("ready", () => {
  window = new BrowserWindow({
    width: defaultWindowSize.width,
    height: defaultWindowSize.height,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  window.setTitle('HYPEE');
  window.addListener("resize", () => {
    const size = window.getSize();
    const width = size[0];
    const height = size[1];

    const gnbHeight = height - 40;
    gnbView.setBounds({
      x: 0,
      y: 40,
      width: 78,
      height: gnbHeight,
    });

    const mainViewHeight = height - 40;
    const mainViewWidth = width - 78;
    mainView.setBounds({ x: 78, y: 40, width: mainViewWidth, height: mainViewHeight });
  });
  tabView = new BrowserView({
    webPreferences: {
      nodeIntegration: true,
    },
  });
  gnbView = new BrowserView({
    webPreferences: {
      nodeIntegration: true,
    },
  });
  mainView = new BrowserView({
    webPreferences: {
      nodeIntegration: true,
    },
  });
  window.addBrowserView(tabView);
  window.addBrowserView(gnbView);
  window.addBrowserView(mainView);

  tabView.setBackgroundColor("#F5F5F5");
  tabView.setAutoResize({
    width: true,
  });

  gnbView.setBounds({ x: 0, y: 40, width: 78, height: defaultWindowSize.height });
  mainView.setBounds({ x: 78, y: 40, width: defaultWindowSize.width - 78, height: defaultWindowSize.height - 40 });
  tabView.setBounds({ x: 0, y: 0, width: defaultWindowSize.width, height: 40 });

  if (electronIsDev) {
    gnbView.webContents.loadURL('http://localhost:3000');
    tabView.webContents.loadURL('http://localhost:3001');
    mainView.webContents.loadURL('http://localhost:3002');
  }
  else {
    gnbView.webContents.loadURL(`file://${path.join(__dirname, "./gnb/dist/index.html")}`);
    tabView.webContents.loadURL(`file://${path.join(__dirname, "./tabs/dist/index.html")}`);
    mainView.webContents.loadURL(`file://${path.join(__dirname, "./tabs/main/index.html")}`)
  }
});
