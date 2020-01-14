import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeftPanel from './LeftPanel';
import ListPanel from './ListPanel';
import LoadingPanel from './LoadingPanel';
import PlayerPanel from './PlayerPanel';
import Helper from '../../utils/helper';
import { setDefaultPath } from './_reducers/home_actions';
import { setPlayInfo } from './_reducers/playinfo_actions';
import VideoListManager from './Model/VideoListManager';

import styles from './styles';

type Props = {};

const Home: FC<Props> = props => {
  console.log('===== Home');
  const dispatch = useDispatch();

  const componentDidMount = () => {
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {};
  useEffect(componentDidMount, []);

  const drop = async e => {
    if (e.dataTransfer.files.length === 1) {
      const selectedDirectory = e.dataTransfer.files[0].path;
      if (selectedDirectory) {
        const result = await dispatch(setDefaultPath(selectedDirectory, true));
        if (result.success) {
          VideoListManager.loadListFromJSON(result.createdPath);
        }
      }
    } else {
      alert('You can drop only 1 directory at once...');
    }
  };
  const dragStart = () => {};
  const dragEnd = () => {};

  return (
    <div
      onDrop={drop}
      onDragStart={dragStart}
      onDragOver={event => event.preventDefault()}
      onDragEnd={dragEnd}
      draggable={false}
      style={styles.container}
    >
      <LeftPanel />
      <ListPanel />
      
      <LoadingPanel />
    </div>
  );
};

export default Home;
