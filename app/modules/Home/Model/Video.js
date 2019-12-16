class Video {
  mp4: string = '';
  subtitle: string = '';
  basePath: string = '';
  currentTime: number = 0;

  constructor(params) {
    if (params.mp4) this.mp4 = params.mp4;
    if (params.subtitle) this.subtitle = params.subtitle;
    if (params.basePath) this.basePath = params.basePath;
    if (params.currentTime) this.currentTime = params.currentTime;
  }
}

export default Video;
