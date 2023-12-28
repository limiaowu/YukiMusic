//app:App类的对象，BrowserWindow：可实例化的浏览器窗口
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

//将某个页面装载到新的浏览器窗口
const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('index.html')
}

//在app初始化完成时，调用创建窗口函数，创建一个浏览器窗口
app.whenReady().then(() => {
    ipcMain.handle('ping', () => 'pong')
    createWindow()
})

//在关闭所有窗口时，关闭应用
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})