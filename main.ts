import { app, BrowserWindow } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

const IPFSFactory = require('ipfsd-ctl');
const factory = IPFSFactory.create({ type: 'go' });

const VelvetCurtainRepo = path.join(app.getPath('userData'), 'VelvetCurtain');
const lockPath = path.join(VelvetCurtainRepo, 'repo.lock');
const apiPath = path.join(VelvetCurtainRepo, 'api');
const configPath = path.join(VelvetCurtainRepo, 'config');

let ipfs: any;

const IPFSBeforeStart = () => {
  if (fs.existsSync(lockPath)) {
    try {
      fs.unlinkSync(lockPath);
    } catch (e) {
      console.log('Could not remove lock. Daemon might be running.');
      return false;
    }
  }

  if (fs.existsSync(apiPath)) {
    try {
      fs.unlinkSync(apiPath);
    } catch (e) {
      console.log('Could not remove API file. Daemon might be running.');
      return false;
    }
  }

  if (fs.existsSync(configPath)) {
    let config;
    try {
      // const config = require(configPath);
      fs.readFile(configPath, 'utf8',  (err, data)  => {
          if (err) { throw err; }
          config = JSON.parse(data);
          config.Addresses = {
            'API': '/ip4/127.0.0.1/tcp/5001',
            'Gateway': '/ip4/127.0.0.1/tcp/8080',
            'Swarm': [
              '/ip4/0.0.0.0/tcp/4001',
              '/ip6/::/tcp/4001'
            ]
          };
          fs.writeFileSync(configPath, JSON.stringify(config), 'utf8');
      });
    } catch (e) {
      console.log('Could not edit ipfs daemon config.');
      return false;
    }
  }
  return true;
};

const IPFSSpawn = (): any => {
  factory.spawn({ start: false, disposable: false, repoPath: VelvetCurtainRepo}, (err, ipfsd) => {
    if (err) {
      console.error(err);
    }

    console.log(ipfsd);

    return ipfsd;
  });
};

const IPFSInitialize = (ipfsd) => {
  ipfsd.init({directory: VelvetCurtainRepo}, (err) => {
    if (err) {
      console.error(err);
    }

    return ipfsd;
  });
};

const IPFSStart = (ipfsd) => {
  return new Promise<any>((resolve, reject) => {
    ipfsd.start((err, api) => {
      if (err) {
        reject(err);
        // console.error(err);
      }
      resolve(api);
    });
  });
};

if (process.env.ELECTRON_START_URL) {
  require('electron-reload')(__dirname);
}

let win;

async function ipfsService() {
  if (IPFSBeforeStart()) {
    // ipfs = IPFSSpawn();
    factory.spawn({ start: false, disposable: false, repoPath: VelvetCurtainRepo}, (err, ipfsd) => {
      if (err) {
        console.error(err);
      }

      ipfs = ipfsd;
    });

    if (!ipfs.initialized) {
      IPFSInitialize(ipfs);
    }

    const api: any = await IPFSStart(ipfs);
    return api;
  }
}

function createWindow() {
  win = new BrowserWindow({
    width           : 1024,
    height          : 800,
    titleBarStyle   : 'hiddenInset',
    backgroundColor : '#ffffff',
    webPreferences  : {
    nodeIntegration : true,
    // preload         : __dirname + '/preload.js'
    }
    // icon: `file://${__dirname}/dist/assets/logo.png`
  });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname : path.join(__dirname, 'dist/ngVelvetCurtain/index.html'),
      protocol : 'file:',
      slashes  : true
    });

  win.loadURL(startUrl);

  if (process.env.ELECTRON_START_URL) {
    win.webContents.openDevTools();
  }

  win.on('closed', function() {
    win = null;
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });
}

app.on('ready', () => {
  new Promise<any>((resolve, reject) => {
    console.log('ipfsservice');
    resolve(ipfsService());
  }).then((api) => {
    api.files.mkdir('/photos', (err) => {
      if (err) {
        console.log(err);
      }
      console.log('created stared');
    });

    api.files.mkdir('/stared', (err) => {
      if (err) {
        console.log(err);
      }
      console.log('created stared');
    });

    createWindow();
  });
});

app.on('window-all-closed', function() {
  ipfs.stop((err) => {
    if (err) {
      console.error(err);
    }
  });
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (win === null) {
    createWindow();
  }
});
