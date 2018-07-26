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
  ipfsd.start((err, api) => {
    if (err) {
      console.error(err);
    }

    return api;
  });
};


/**
 * IPFS를 시작 전에 repoPath의 api, repo.lock, config 파일을 제거 해준다.
 * https://github.com/pathephone/pathephone-desktop/blob/4cad8e420ef1007c15da25587581deff312be871/src/main/methods/startCommunication/startIpfsProcess/beforeIpfsDaemonStart.js
 * config의 경우에 software에 하드 코딩된 설정 값을 사용한다.
 *
 */

// const IPFSFactory = require('ipfsd-ctl');
// const factory = IPFSFactory.create({ type: "go" });

// factory.spawn({ init: true, start: false, disposable: false, repoPath: '~/.velvetcurtain' }, (err, ipfsd) => {
//   if (err) {
//     console.log(err);
//   }

//   if (ipfsd.initialized) {
//     startDaemon(ipfsd)
//   } else {
//     ipfsd.init((err) => {
//       if (err) {
//         console.log(err);
//       }
//       startDaemon(ipfsd);
//     });
//   }
// })

// const startDaemon = (ipfsd) => {
//   ipfsd.start((err, api) => {
//     if (err) {
//       reject(err)
//     }
//     resolve(api)
//   })
// }

if (process.env.ELECTRON_START_URL) {
  require('electron-reload')(__dirname);
}

let win;

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

  if (IPFSBeforeStart()) {
    // ipfs = IPFSSpawn();
    factory.spawn({ start: false, disposable: false, repoPath: VelvetCurtainRepo}, (err, ipfsd) => {
      if (err) {
        console.error(err);
      }

      ipfs = ipfsd;
      console.log(ipfs.initialized);
    });

    if (!ipfs.initialized) {
      IPFSInitialize(ipfs);
    }
    const api = IPFSStart(ipfs);
  }

  win.loadURL(startUrl);

  win.on('closed', function() {
    ipfs.stop((err) => {
      if (err) {
        console.error(err);
      }
    });
    win = null;
  });
}

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function() {
  if (win === null) {
    createWindow();
  }
});
