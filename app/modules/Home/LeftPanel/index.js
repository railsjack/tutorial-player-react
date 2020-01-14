import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { UL, LI } from '../../../components';
import Helper from '../../../utils/helper';
import { setDefaultPath, removeDefaultPath } from '../_reducers/home_actions';
import { setPlayInfo } from '../_reducers/playinfo_actions';

import styles from './styles';

const renderItem = ({ item, index, onClickHandler, removePressHandler }) => {
  return (
    <LiItem key={String(index)}>
      <LI title={item} fullPath={item} style={styles.list_item}>
        <a
          onClick={() => {
            onClickHandler(item);
          }}
        >
          {Helper.baseDirName(item)}
        </a>
        <button
          onClick={() => {
            removePressHandler(item);
          }}
          title={"Delete"}
          style={styles.list_item_remove}
        >
          X
        </button>
      </LI>
    </LiItem>
  );
};

const LiItem = props => {
  return <>{props.children}</>;
};

const LeftPanel = props => {
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
    dispatch(setPlayInfo({ playIndex: -1 }));
    dispatch(setDefaultPath(fullPath));
  });

  const removePressHandler = useCallback(fullPath => {
    dispatch(setPlayInfo({ playIndex: -1 }));
    dispatch(removeDefaultPath(fullPath));
  });

  const componentDidMount = () => {
    if (mainState.listPaths.length > 0) {
      console.log('===== Left Panel');
    }
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
            renderItem({ item, index, onClickHandler, removePressHandler })
          }
        />
      )}
    </div>
  );
};

export default LeftPanel;