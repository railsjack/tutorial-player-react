class Helper {
  async loadScript(path) {
    let script = document.createElement('script');
    script.src = path;
    document.getElementsByTagName('head')[0].appendChild(script);
    return new Promise((resolve, eject) => {
      script.onload = () => resolve();
      script.onerror = () => eject();
    });
  }

  getHumanTitle(path) {
    let ret = path.replace(/[\\\/]/g, ' > ');
    ret = ret.replace(/\.mp4/g, '');
    ret = ret.replace(/\.vtt/g, '');
    ret = ret.replace(/\.srt/g, '');
    return ret.replace(/[^A-Za-z0-9\.\>]/g, ' ');
  }

  baseDirName(path) {
    return path.split(/[\\]/gi).pop();
  }

  async getJSON(url, callback) {
    return new Promise((resolve, eject) => {
      let xhr = new XMLHttpRequest();
      xhr.onload = () => {
        try {
          resolve(JSON.parse(xhr.responseText));
        } catch (error) {
          eject(error);
        }
      };
      xhr.onerror = error => eject(error);
      xhr.open('GET', url, true);
      xhr.send();
    });
  }

  selectDirectory(defaultPath: string) {
    const { ipcRenderer, remote } = require('electron');
    const app = remote.app;
    const browserWindow = remote.getCurrentWindow();
    const dialog = require('electron').remote.dialog;
    const selectedDirectory = dialog.showOpenDialogSync(browserWindow, {
      properties: ['openDirectory'],
      defaultPath
    });
    return selectedDirectory;
  }


  
  getConf = key => {
    return (JSON.parse(localStorage.getItem(key)));
  };

  setConf = (key, value) => {
    const newValue =  (value);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

}

export default new Helper();
