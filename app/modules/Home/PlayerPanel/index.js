import React, { FC, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Helper from '../../../utils/helper';

import { goNextPlay } from '../_reducers/playinfo_actions';

import styles from './styles';

const PlayerPanel: FC<Props> = props => {
  const dispatch = useDispatch();
  // const playInfo = useSelector(state => state.PlayInfo);

  const { playInfo } = props;

  const gotoPlayTime = time => {
    const player = document.getElementById('tutorialPlayer');
    player && (player.currentTime = time);
  };

  const showSubtitle = time => {
    const player = document.getElementById('tutorialPlayer');
    player && (player.textTracks[0].mode = 'showing');
  };

  const recordPlayTime = () => {
    clearInterval(window.recordInterval);
    const player = document.getElementById('tutorialPlayer');
    window.recordInterval = setInterval(() => {
      Helper.setConf(playInfo.src, player.currentTime);
    }, 1000);
  };
  const recordedPlayTime = () => Helper.getConf(playInfo.src);
  const onEndedHandler = () => {
    setTimeout(() => {
      dispatch(goNextPlay());
    }, 1000);
  };

  const componentDidMount = () => {
    if (!playInfo.hasVideo) {
      console.log('===== PlayerPanel');
    } else {
      if (playInfo.recordedPlay) gotoPlayTime(recordedPlayTime());
      recordPlayTime(playInfo.src);
      showSubtitle();
    }

    return componentWillUnmount;
  };
  const componentWillUnmount = () => {
    console.log('===== componentWillUnmount');
  };

  useEffect(componentDidMount, [playInfo]);

  return (
    <div style={styles.container}>
      <div>
        {playInfo.hasVideo && (
          <div style={styles.video_title}>{playInfo.title}</div>
        )}
      </div>
      <video
        id="tutorialPlayer"
        controls
        width={'100%'}
        height={'100%'}
        preload={'metadata'}
        autoPlay={playInfo.autoPlay}
        poster=""
        src={playInfo.src}
        style={{ display: playInfo.hasVideo ? 'block' : 'none' }}
        onEnded={onEndedHandler}
      >
        <track
          kind={'captions'}
          id={'playerCaption'}
          src={playInfo.subtitle.replace(/\//gi, '\\')}
          srcLang={'en'}
          mode={'showing'}
          label={'English'}
        />
      </video>
      {!playInfo.hasVideo && (
        <div style={styles.tutorial_title}>
          <span style={styles.tutorial_title_text}>
            {playInfo.insteadTitle}
          </span>
        </div>
      )}
    </div>
  );
};

export default PlayerPanel;
