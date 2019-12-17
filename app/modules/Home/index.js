import React, { FC, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LeftPanel from './LeftPanel';
import ListPanel from './ListPanel';
import PlayerPanel from './PlayerPanel';
import Helper from '../../utils/helper';
import VideoList from './Model/VideoList';

type Props = {};

const Home: FC<Props> = props => {
  console.log('===== Home')
  // const [mp4Files, setMp4Files] = useState([]);
  // const [subTitles, setSubTitles] = useState([]);
  // const [videoIndex, setVideoIndex] = useState('');

  // const dispatch = useDispatch();
  // const { ipcRenderer } = require('electron');

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

  //   ipcRenderer.removeListener('Response', () => {});
  //   ipcRenderer.on('Response', (event, response) => {
  //     if (response.code === 201) {
  //       if (response.data && response.data.path) {
  //         const listPath = response.data.path;
  //         alert(response.message);
  //         loadVideos(listPath);
  //       }
  //     } else {
  //       switch (response.reason) {
  //         case 'NO_VIDEO_FILES':
  //           alert('There is no any video files on the directory');
  //           break;
  //         default:
  //           alert(response.message);
  //       }
  //     }
  //   });
  //   return componentWillUnmount;
  // };

  // const loadVideos = async path => {
  //   const videoDatas = await Helper.getJSON(path + '/list.json');
  //   const videos = [];
  //   videoDatas.map(videoData => {
  //     videos.push({
  //       mp4: videoData[0],
  //       subtitle: videoData[1]
  //     });
  //   });
  //   VideoList.set({ videos, selectedIndex: 0, basePath: path });
  //   dispatch(setVideoList(VideoList));
  //   // setMp4Files(mp4_files);
  //   // setSubTitles(subtitles);
  // };

  // const componentWillUnmount = () => {};
  // useEffect(componentDidMount, []);

  // const onDirectorySelectedHandler = selectedDirectory => {
  //   ipcRenderer.send('Request', selectedDirectory);
  // };

  // const onSelectListHandler = itemIndex => {
  //   // onSelectVideo(videoIndex);
  //   console.log('itemIndex', itemIndex);
  // };

  return (
    <>
      <LeftPanel />
      <ListPanel
      />
      <PlayerPanel
        // videoIndex={videoIndex}
        // subTitles={subTitles}
        // mp4Files={mp4Files}
        // listPath={mainState.listPath}
      />
    </>
  );
};

export default Home;
