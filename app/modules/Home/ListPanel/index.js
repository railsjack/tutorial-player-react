import React, { FC, useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helper from '../../../utils/helper';
import { Select, Option } from '../../../components';
import VideoListManager from '../Model/VideoListManager';
import PlayerPanel from '../PlayerPanel';

import { initLoadingStatus, setDefaultPath } from '../_reducers/home_actions';

import { setPlayInfo } from '../_reducers/playinfo_actions';

import styles from './styles';

const renderItem = ({ dirNames, item, index, topTitle }) => {
  let isNewDir;
  let dirName;
  let fileName;

  if (item.indexOf('/') > -1) {
    const subTitlePathArr = item.split(/\//gi);
    dirName = Helper.getHumanTitle(subTitlePathArr[0]);
    fileName = Helper.getHumanTitle(subTitlePathArr[1]);
    isNewDir = dirNames.indexOf(dirName) === -1;
    isNewDir && dirNames.push(dirName);
  } else {
    isNewDir = false;
    dirName = item;
    fileName = item;
  }
  return (
    <OptionItem key={String(index)}>
      {index === 0 && <option>{topTitle}</option>}
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
  const dispatch = useDispatch();
  // const mainState = {defaultPath: ''};
  const mainState = useSelector(state => state.Main);
  const [playInfo, setPlayInfo2] = useState({});

  const [videoList, setVideoList] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const openDirectoryHandler = async () => {
    const selectedDirectory = Helper.selectDirectory(mainState.defaultPath);
    if (selectedDirectory) {
      const result = await dispatch(setDefaultPath(selectedDirectory[0], true));
      if (result.success) {
        await VideoListManager.loadListFromJSON(result.createdPath);
        setVideoList(VideoListManager.getList());
        // setSelectedIndex(-1);
        // dispatch(setPlayInfo({ playIndex: -1, hasVideo: false, src: '' }));
      }
    }
  };

  const selectListByIndex = useCallback(
    (index, autoPlay = false) => {
      const videoList = VideoListManager.getList();
      let playInfo;
      if (index === -1) {
        playInfo = {
          autoPlay,
          playIndex: index,
          hasVideo: false,
          src: '',
          title: '',
          insteadTitle: Helper.baseDirName(mainState.defaultPath)
        };
      } else {
        playInfo = {
          srcBase: mainState.defaultPath,
          autoPlay,
          playIndex: index,
          hasVideo: true,
          src: mainState.defaultPath + '/' + videoList[index].mp4,
          subtitle: mainState.defaultPath + '/' + videoList[index].subtitle,
          title: Helper.getHumanTitle(videoList[index].mp4),
          insteadTitle: ''
        };
      }

      dispatch(setPlayInfo(playInfo));
      setPlayInfo2(playInfo);
    },
    [mainState.defaultPath]
  );

  const onSelectListHandler = event => {
    const selectedIndex = event.nativeEvent.target.selectedIndex - 1;
    selectListByIndex(selectedIndex, true);
    setSelectedIndex(selectedIndex, true);
  };

  const componentDidMount = () => {
    if (mainState.defaultPath) {
      dispatch(initLoadingStatus());
      const loadVideoList = async () => {
        await VideoListManager.loadListFromJSON(mainState.defaultPath);
        setVideoList(VideoListManager.getList());
        // setTimeout(() => {
        //   if (playInfo.playIndex != undefined) {
        //     selectListByIndex(playInfo.playIndex);
        //     setSelectedIndex(playInfo.playIndex);
        //   }
        // }, 1000);
      };
      loadVideoList();
    }
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {};
  useEffect(componentDidMount, [mainState.defaultPath, playInfo.playIndex]);

  const subtitlesArray = videoList.map(video => video.mp4);
  const topTitle = Helper.baseDirName(mainState.defaultPath);

  const dirNames = [];
  return (
    <>
      <div style={styles.list_panel}>
        {subtitlesArray && (
          <Select
            value={selectedIndex}
            style={styles.list}
            data={subtitlesArray}
            onChange={onSelectListHandler}
            renderItem={({ item, index }) =>
              renderItem({ dirNames, item, index, topTitle })
            }
          />
        )}
        <button onClick={openDirectoryHandler} style={styles.list_load_button}>
          ..
        </button>
      </div>
      {playInfo.src && <PlayerPanel playInfo={playInfo} />}
    </>
  );
};

export default ListPanel;
