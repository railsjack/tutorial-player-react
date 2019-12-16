import Video from './Video';

class VideoList {
  videos: Array<Video> = [];
  selectedIndex: number = 0;

  constructor(params) {
    if (params.videos) this.videos = params.videos;
    if (params.selectedIndex) this.selectedIndex = params.selectedIndex;
  }
}

export default VideoList;