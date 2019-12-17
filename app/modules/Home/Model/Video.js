class Video {
  mp4: string = '';
  subtitle: string = '';
  currentTime: number = 0;

  constructor(params) {
    if (params.mp4) this.mp4 = params.mp4;
    if (params.subtitle) this.subtitle = params.subtitle;
    if (params.currentTime) this.currentTime = params.currentTime;
  }
}

export default Video;
