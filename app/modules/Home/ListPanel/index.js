import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helper from '../../../utils/helper';
import { Select, Option } from '../../../components';
import VideoListManager from '../Model/VideoListManager'

import { setDefaultPath, setVideoInfo } from '../_reducers/home_actions';

import styles from './styles';

const renderItem = ({ dirNames, item, index }) => {
  const subTitlePathArr = item.split(/\//gi);
  const dirName = Helper.getHumanTitle(subTitlePathArr[0]);
  const fileName = Helper.getHumanTitle(subTitlePathArr[1]);
  const isNewDir = dirNames.indexOf(dirName) === -1;
  isNewDir && dirNames.push(dirName);
  return (
    <OptionItem key={String(index)}>
      {index === 0 && <option>Select ...</option>}
      {isNewDir ? <optgroup label={dirName} /> : null}
      <option value={index}>
        &nbsp;&nbsp;
        {fileName}
      </option>
    </OptionItem>
  );
};

const OptionItem = props => {
  return <>{props.children}</>;
};

type Props = {};

const ListPanel: FC<Props> = props => {
  console.log('===== ListPanel');

  const dispatch = useDispatch();
  const mainState = useSelector(state => state.Main);
  const [videoList, setVideoList] = useState([]);

  const openDirectoryHandler = async () => {
    const selectedDirectory = Helper.selectDirectory(mainState.defaultPath);
    if (selectedDirectory) {
      const result = await dispatch(setDefaultPath(selectedDirectory[0]));
      if (result.success) {
        loadVideos(mainState.defaultPath);
        setTimeout(() => {
          selectListByIndex(-1);
        }, 500);
      }
    }
  };

  const loadVideos = async path => {
    const videoDatas = await Helper.getJSON(path + '/list.json');
    const videoList = [];
    videoDatas.map(videoData => {
      videoList.push({
        mp4: videoData[0],
        subtitle: videoData[1]
      });
    });
    setVideoList(videoList);
    VideoListManager.setList(videoList);
  };

  const selectListByIndex = index => {
    let videoInfo;
    if (index === -1) {
      videoInfo = {
        videoIndex: -1,
        mp4: '',
        subtitle: '',
        tutorialTitle: Helper.baseDirName(mainState.defaultPath)
      };
    } else {
      videoInfo = {
        videoIndex: index,
        mp4: videoList[index].mp4,
        subtitle: Helper.getHumanTitle(videoList[index].subtitle),
        tutorialTitle: ''
      };
    }
    dispatch(setVideoInfo(videoInfo));
  };

  const onSelectListHandler = event => {
    const videoIndex = event.nativeEvent.target.selectedIndex - 1;
    selectListByIndex(videoIndex);
  };

  const componentDidMount = () => {
    if (mainState.defaultPath) {
      loadVideos(mainState.defaultPath);
    }
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {};
  useEffect(componentDidMount, [mainState.defaultPath]);

  const dirNames = [];
  const subtitlesArray = videoList.map(video => video.subtitle);
  const selectedIndex =
    mainState && mainState.videoInfo ? mainState.videoInfo.videoIndex : 0;
  return (
    <div style={styles.list_panel}>
      <Select
        value={selectedIndex}
        style={styles.list}
        data={subtitlesArray}
        onChange={onSelectListHandler}
        renderItem={({ item, index }) => renderItem({ dirNames, item, index })}
      />
      <button onClick={openDirectoryHandler} style={styles.list_load_button}>
        ...
      </button>
    </div>
  );
};

export default ListPanel;
