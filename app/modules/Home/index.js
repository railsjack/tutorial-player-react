import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeftPanel from './LeftPanel';
import ListPanel from './ListPanel';
import PlayerPanel from './PlayerPanel';
import LoadingPanel from './LoadingPanel';
import Helper from '../../utils/helper';
import VideoList from './Model/VideoList';

type Props = {};

const Home: FC<Props> = props => {
  console.log('===== Home')

  // const componentDidMount = () => {
  //   let selectedDirectory = '';
  //   document.addEventListener('dragover', e => {
  //     e.preventDefault();
  //   });
  //   document.addEventListener('drop', e => {
  //     e.preventDefault();
  //     if (e.dataTransfer.files.length === 1) {
  //       selectedDirectory = e.dataTransfer.files[0].path;
  //       ipcRenderer.send('Request', selectedDirectory);
  //     } else {
  //       alert('You can drop only 1 directory at once...');
  //     }
  //     return false;
  //   });

  return (
    <>
      <LeftPanel />
      <ListPanel />
      <PlayerPanel />
      <LoadingPanel />
    </>
  );
};

export default Home;
