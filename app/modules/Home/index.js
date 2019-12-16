import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeftPanel from '../../components/LeftPanel';
import ListPanel from '../../components/ListPanel';
import PlayerPanel from '../../components/PlayerPanel';
import Helper from '../../utils/helper';

import { setListPath, SET_DEFAULT_PATH } from './_actions';

type Props = {};

const Home: FC<Props> = props => {
  const mainState = useSelector(state => state.Main);
  const [mp4Files, setMp4Files] = useState([]);
  const [subTitles, setSubTitles] = useState([]);
  const [videoIndex, setVideoIndex] = useState('');

  const dispatch = useDispatch();
  const { ipcRenderer } = require('electron');

  const componentDidMount = () => {
    let listPath = '';
    document.addEventListener('dragover', e => {
      e.preventDefault();
    });
    document.addEventListener('drop', e => {
      e.preventDefault();
      if (e.dataTransfer.files.length === 1) {
        listPath = e.dataTransfer.files[0].path;
        ipcRenderer.send('Request', listPath);
      } else {
        alert('You can drop only 1 directory at once...');
      }
      return false;
    });

    ipcRenderer.removeListener('Response', () => {});
    ipcRenderer.on('Response', (event, response) => {
      if (response.code === 201) {
        if (response.data && response.data.path) {
          const listPath = response.data.path;
          dispatch(setListPath(listPath));
          alert(response.message);
          loadScript(listPath);
        }
      } else {
        switch (response.reason) {
          case 'NO_VIDEO_FILES':
            alert('There is no any video files on the directory');
            break;
          default:
            alert(response.message);
        }
      }
    });
    return componentWillUnmount;
  };

  const loadScript = async path => {
    await Helper.loadScript(path + '/list_mp4.js');
    await Helper.loadScript(path + '/list_subtitle.js');
    setMp4Files(mp4_files);
    setSubTitles(subtitles);
  };

  const componentWillUnmount = () => {};
  useEffect(componentDidMount, []);

  const onSelectListPathHandler = listPath => {
    ipcRenderer.send('Request', listPath);
  };

  const onSelectVideoHandler = videoIndex => {
    onSelectVideo(videoIndex);
  };

  return (
    <>
      <LeftPanel />
      <ListPanel
        orgListPath={mainState.listPath}
        onSelectListPath={onSelectListPathHandler}
        onSelectVideo={onSelectVideoHandler}
        subTitles={subTitles}
        mp4Files={mp4Files}
      />
      <PlayerPanel
        videoIndex={videoIndex}
        subTitles={subTitles}
        mp4Files={mp4Files}
        listPath={mainState.listPath}
      />
    </>
  );
};

export default Home;
