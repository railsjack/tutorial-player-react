import React, { FC, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Helper from '../../../utils/helper';
import { setDefaultPath, setVideoInfo } from '../_reducers/home_actions';

import styles from './styles';

const Video = props => {
  return <video {...props}>{props.children}</video>;
};

const PlayerPanel: FC<Props> = props => {
  console.log('===== PlayerPanel');
  const dispatch = useDispatch();
  const mainState = useSelector(state => state.Main);
  const [videoList, setVideoList] = useState([]);
  const videoInfo = mainState.videoInfo;

  const timerCallback = useCallback(() => {
    console.log('window.playerInterval', window.playerInterval);
    const player = document.getElementById('tutorialPlayer');
    const currentTime = Helper.getConf(videoInfo.mp4);

    if (currentTime > 0) player.currentTime = currentTime;

    clearInterval(window.playerInterval);
    let previousCurrentTime = 0;
    window.playerInterval = setInterval(() => {
      if (previousCurrentTime != player.currentTime && player.currentTime > 0) {
        Helper.setConf(videoInfo.mp4, player.currentTime);
      }
      previousCurrentTime = player.currentTime;
    }, 1000);

    player.onended = () => {
      Helper.setConf(videoInfo.mp4, 0);
      const videoInfoCopy = { ...mainState.videoInfo };
      videoInfoCopy.videoIndex = videoInfoCopy.videoIndex + 1;
      dispatch(setVideoInfo(videoInfoCopy));
    };
  }, [mainState.videoInfo]);

  const componentDidMount = () => {
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {};

  useEffect(componentDidMount, [mainState.videoInfo]);

  if (mainState.videoInfo) {
    setTimeout(timerCallback, 500);
  }

  return (
    <div style={styles.container}>
      {videoInfo && videoInfo.videoIndex === -1 && (
        <div style={styles.tutorial_title}>
          <span style={styles.tutorial_title_text}>
            {videoInfo.tutorialTitle}
          </span>
        </div>
      )}
      {videoInfo && videoInfo.videoIndex > -1 && (
        <>
          <div style={styles.video_title}>
            {Helper.getHumanTitle(videoInfo.subtitle)}
          </div>
          <Video
            id="tutorialPlayer"
            controls
            width={'100%'}
            height={'100%'}
            preload={'true'}
            src={mainState.defaultPath + '/' + videoInfo.mp4}
          >
            <track
              kind={'captions'}
              id={'playerCaption'}
              src={''}
              srcLang={'en'}
              label={'English'}
            />
          </Video>
        </>
      )}
    </div>
  );
};

export default PlayerPanel;
