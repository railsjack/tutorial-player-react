import React, { FC, useEffect, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Helper from '../../../utils/helper';

import { goNextPlay } from '../_reducers/playinfo_actions';

import styles from './styles';

const PlayerPanel: FC<Props> = props => {
  const dispatch = useDispatch();
  const playInfo = useSelector(state => state.PlayInfo);

  const gotoPlayTime = time => {
    const player = document.getElementById('tutorialPlayer');
    player && (player.currentTime = time);
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
      gotoPlayTime(recordedPlayTime());
      recordPlayTime(playInfo.src);
    }
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {
    console.log('===== componentWillUnmount');
  };

  useEffect(componentDidMount, [playInfo.src]);

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
        preload={'true'}
        src={playInfo.src}
        autoPlay={playInfo.autoPlay}
        style={{ display: playInfo.hasVideo ? 'block' : 'none' }}
        onEnded={onEndedHandler}
      >
        <track
          kind={'captions'}
          id={'playerCaption'}
          src={''}
          srcLang={'en'}
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
