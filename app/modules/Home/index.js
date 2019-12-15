import React, { FC, useEffect, useReducer } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeftPanel from '../../components/LeftPanel';
import ListPanel from '../../components/ListPanel';
import PlayerPanel from '../../components/PlayerPanel';

import { setDefaultPath, SET_DEFAULT_PATH } from './_actions';

type Props = {};

const { ipcRenderer } = require('electron');

const Home: FC<Props> = props => {
  const mainState = useSelector(state => state.Main);
  const dispatch = useDispatch();

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
        alert('You can drop only 1 directory at once.');
      }
      return false;
    });
    ipcRenderer.on('Response', (event, response) => {
      if (response.code !== 201) {
        alert(response.content);
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
        onSelectedPath={onSelectedPathHandler}
      />
      <PlayerPanel />
    </>
  );
};

export default Home;
