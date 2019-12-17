class VideoListManager {
  list: Array<any> = [];

  setList(list) {
    this.list = list;
  }

  getList() {
    return this.list;
  }
}

export default new VideoListManager();
