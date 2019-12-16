class Helper {

  async loadScript(path) {
    let script = document.createElement("script");
    script.src = path;
    document.getElementsByTagName("head")[0].appendChild(script);
    return new Promise((resolve, eject) => {
      script.onload = () => resolve();
      script.onerror = () => eject();
    });
  }

  getHumanTitle(path) {
    let ret = path.replace(/[\\\/]/g, " > ");
    ret = ret.replace(/\.mp4/g, "");
    ret = ret.replace(/\.vtt/g, "");
    ret = ret.replace(/\.srt/g, "");
    return ret.replace(/[^A-Za-z0-9\.\>]/g, " ");
  }

  baseDirName(path) {
    return path.split(/[\\]/gi).pop();
  }
}

export default new Helper();
