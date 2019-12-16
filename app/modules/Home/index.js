import React, { FC, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeftPanel from '../../components/LeftPanel';
import ListPanel from '../../components/ListPanel';
import PlayerPanel from '../../components/PlayerPanel';

import { setDefaultPath, SET_DEFAULT_PATH } from './_actions';

type Props = {};

const Home: FC<Props> = props => {
  const mainState = useSelector(state => state.Main);
  const dispatch = useDispatch();
  const { ipcRenderer } = require('electron');

  const componentDidMount = () => {
    let selectedPath = '';
    document.addEventListener('dragover', e => {
      e.preventDefault();
    });
    document.addEventListener('drop', e => {
      e.preventDefault();
      if (e.dataTransfer.files.length === 1) {
        selectedPath = e.dataTransfer.files[0].path;
        ipcRenderer.send('Request', selectedPath);
      } else {
        alert('You can drop only 1 directory at once...');
      }
      return false;
    });

    ipcRenderer.removeListener('Response', () => {});
    ipcRenderer.on('Response', (event, response) => {
      if (response.code !== 201) {
        if (response.reason === 'NO_VIDEO_FILES') {
          alert('There is no any video files on the directory');
        } else {
          alert(response.message);
        }
      } else {
        if (response.data && response.data.path) {
          alert(response.message);
          dispatch(setDefaultPath(response.data.path));
        }
      }
    });

    return componentWillUnmount;
  };
  const componentWillUnmount = () => {};
  useEffect(componentDidMount, []);

  const onSelectedPathHandler = selectedPath => {
    ipcRenderer.send('Request', selectedPath);
  };

  return (
    <>
      <LeftPanel />
      <ListPanel
        defaultPath={mainState.defaultPath}
        onSelectPath={onSelectedPathHandler}
      />
      <PlayerPanel />
    </>
  );
};

export default Home;
