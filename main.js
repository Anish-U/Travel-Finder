const { remote } = require("electron");
const electron = require("electron");
const BrowserWindow = electron.BrowserWindow;
const shell = electron.shell;
const Menu = electron.Menu;
const app = electron.app;
const path = require("path");
const url = require("url");

// Global reference of the window object
let win;

// Function to create browser window
function createWindow() {
  win = new BrowserWindow({
    height: 400,
    width: 800,
    show: false,
    // Making Node work on all other pages
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
    icon: __dirname + "/assets/img/icon.png",
  });

  // Loading index.htm file of the app
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, "src/index.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  win.webContents.on("new-window", function (e, url) {
    e.preventDefault();
    require("electron").shell.openExternal(url);
  });

  // Custom menu bar
  const menu = Menu.buildFromTemplate([
    {
      label: "File",
      submenu: [
        {
          role: "minimize",
        },
        { type: "separator" },
        {
          label: "Exit",
          click() {
            app.quit();
          },
        },
      ],
    },
    {
      label: "View",
      submenu: [
        { role: "reload" },
        { role: "forceReload" },
        { type: "separator" },
        { role: "togglefullscreen" },
      ],
    },
    {
      label: "API",
      submenu: [
        {
          label: "Airport Autocomplete JS",
          click() {
            shell.openExternal(
              "https://www.npmjs.com/package/airport-autocomplete-js"
            );
          },
        },
        {
          label: "Tequila Search API",
          click() {
            shell.openExternal(
              "https://kiwicom.github.io/margarita/docs/tequila-api"
            );
          },
        },
      ],
    },
    {
      label: "Help",
      submenu: [
        {
          label: "GitHub",
          click() {
            shell.openExternal("https://github.com/Anish-U/Travel-Finder");
          },
        },
        {
          label: "Developer",
          click() {
            shell.openExternal("https://github.com/Anish-U");
          },
        },
      ],
    },
  ]);

  // Setting custom menu to application
  Menu.setApplicationMenu(menu);

  // Open DevTools
  // win.webContents.openDevTools();

  // When window is closed
  win.on("closed", () => {
    // Dereferencing the window object
    win = null;
  });

  // Show the window only when the content in it is loaded
  win.once("ready-to-show", () => {
    win.show();
  });
}

// Calling createWindow function once the application is ready
app.whenReady().then(() => {
  createWindow();
});

// Quit when all windows are closed
app.on("window-all-closed", function () {
  // In macOS it is common for the applications and their menu bar
  // to stay active until user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") app.quit();
});
