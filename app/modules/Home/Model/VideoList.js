import Video from './Video';

class VideoList {
  videos: Array<Video> = [];
  selectedIndex: number = 0;
  basePath: string;

  constructor(params) {
    this.set(params);
  }

  set(params) {
    if (params.selectedIndex) this.selectedIndex = params.selectedIndex;
    if (params.basePath) this.basePath = params.basePath;
    if (params.videos) {
      this.videos = [];
      params.videos.map(videoData => {
        this.videos.push(new Video(videoData));
      });
    }
  }
}

export default new VideoList({});
