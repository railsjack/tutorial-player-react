import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UL, LI } from '../../../components';
import Helper from '../../../utils/helper';
import { setDefaultPath, setVideoInfo } from '../_reducers/home_actions';

import styles from './styles';

const renderItem = ({ item, index, onClickHandler }) => {
  return (
    <LiItem key={String(index)}>
      <LI
        onClick={() => {
          onClickHandler(item);
        }}
        className={'tutorial-list-item'}
        title={item}
        fullPath={item}
        style={styles.list_item}
      >
        {index + 1}. {Helper.baseDirName(item)}
      </LI>
    </LiItem>
  );
};

const LiItem = props => {
  return <>{props.children}</>;
};

const LeftPanel = props => {
  console.log('===== Left Panel');
  const dispatch = useDispatch();
  const mainState = useSelector(state => state.Main);
  const [openStatus, setOpenStatus] = useState(false);
  const [openStatus2, setOpenStatus2] = useState(false);
  const togglePanel = () => {
    setOpenStatus(!openStatus);
    setTimeout(
      () => {
        setOpenStatus2(!openStatus);
      },
      !openStatus ? 200 : 0
    );
  };

  const onClickHandler = useCallback(fullPath => {
    togglePanel();
    dispatch(setDefaultPath(fullPath));

    setTimeout(() => {
      const videoInfo = {
        videoIndex: -1,
        mp4: '',
        subtitle: '',
        tutorialTitle: Helper.baseDirName(mainState.defaultPath)
      };
      dispatch(setVideoInfo(videoInfo));
    }, 500);
  });

  const componentDidMount = () => {
    console.log('===== Left Panel componentDidMount');
    console.log('mainState.listPaths', mainState.listPaths);
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {};
  useEffect(componentDidMount, [mainState.listPaths]);

  return (
    <div
      style={{
        ...styles.left_panel,
        ...(openStatus ? styles.left_panel_open : {})
      }}
    >
      <a
        onClick={togglePanel}
        style={{
          ...styles.control_button,
          ...(openStatus ? styles.control_button_open : {})
        }}
      >
        {!openStatus ? '>' : '<'}
      </a>
      {mainState.listPaths && (
        <UL
          style={{
            ...styles.list,
            ...(!openStatus2 ? { display: 'none' } : {})
          }}
          data={mainState.listPaths}
          renderItem={({ item, index }) =>
            renderItem({ item, index, onClickHandler })
          }
        />
      )}
    </div>
  );
};

export default LeftPanel;
