import React, { FC, useEffect, useState } from 'react';
import Helper from '../../../utils/helper';
import styles from './styles';
type Props = {
  videoIndex: number
};

const PlayerPanel: FC<Props> = props => {
  const componentDidMount = () => {
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {};
  useEffect(componentDidMount, []);

  const video = {
    mp4:
      props.videoIndex != undefined ? props.mp4Files[props.videoIndex] : null,
    subtitle:
      props.videoIndex != undefined ? props.subTitles[props.videoIndex] : null
  };

  return (
    <div style={styles.player_panel}>
      {video.mp4 && (
        <>
          <div style={styles.video_title}>
            {Helper.getHumanTitle(video.subtitle)}
          </div>
          <video
            id="video_player"
            controls
            className="player"
            width="100%"
            height="100%"
            poster=""
            preload="none"
          >
            <source src={props.listPath + "/" + video.mp4} type="video/mp4" />
            <track
              kind="captions"
              id="playerCaption"
              src=""
              srcLang="en"
              label="English"
            />
          </video>
        </>
      )}
    </div>
  );
};

export default PlayerPanel;
