import React, { Component } from 'react';
import styles from './styles';

const PlayerPanel = props => {
  return (
    <div style={styles.player_panel}>
      <div style={styles.video_title} />
      <video
        id="video_player"
        controls
        className="player"
        width="100%"
        height="100%"
        poster=""
        preload="none"
      >
        <source src="" type="video/mp4" />
        <track
          kind="captions"
          id="playerCaption"
          src=""
          srcLang="en"
          label="English"
        />
      </video>
    </div>
  );
};

export default PlayerPanel;
