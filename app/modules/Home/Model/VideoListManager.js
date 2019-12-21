class VideoListManager {
  list: Array<any> = [];

  async loadListFromJSON(jsonDir) {
    const videoDatas = await this.getJSON(jsonDir + '/list.json');
    const videoList = [];
    videoDatas.map(videoData => {
      videoList.push({
        mp4: videoData[0],
        subtitle: videoData[1]
      });
    });
    this.list = videoList;
  }

  getList() {
    return this.list;
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
}

export default new VideoListManager();
