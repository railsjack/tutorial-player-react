import React from 'react';

const Player = props => {
  return (
    <div style={styles.container}>
      {props.hasVideo ? (
        <>
          <div style={styles.video_title}>{props.title}</div>
          <video
            id="tutorialPlayer"
            controls
            width={'100%'}
            height={'100%'}
            preload={'true'}
            src={props.src}
            onEnded={props.onEnded}
          >
            <track
              kind={'captions'}
              id={'playerCaption'}
              src={''}
              srcLang={'en'}
              label={'English'}
            />
          </video>
        </>
      ) : (
        <div style={styles.tutorial_title}>
          <span style={styles.tutorial_title_text}>{props.insteadTitle}</span>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    float: 'right',
    width: '100%',
    height: 'calc(100% - 33px)'
  },
  tutorial_title: {
    width: '70%',
    height: '150px',
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: '-100px',
    marginLeft: '-35%',
    textAlign: 'center',
    display: 'table'
  },
  tutorial_title_text: {
    verticalAlign: 'middle',
    display: 'table-cell',
    fontSize: '20pt'
  },
  video_title: {
    width: '80%',
    position: 'absolute',
    top: '30px',
    left: '10%',
    zIndex: '100',
    padding: '5px',
    lineHeight: '30px',
    fontSize: '20pt',
    color: 'white',
    textAlign: 'center',
    background: 'rgba(0,0,0,0.5)',
    margin: '0 auto'
  }
};

export default Player;
