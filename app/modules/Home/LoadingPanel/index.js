import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { SET_DEFAULT_PATH } from '../_reducers/home_actions';
import styles from './styles';

const LoadingPanel = props => {
  const mainState = useSelector(state => state.Main);
  return (
    <>
      {mainState.status === SET_DEFAULT_PATH.DOING &&  (
        <div style={styles.container}>
          <div style={styles.loading} className={'loader'}></div>
        </div>
      )}
    </>
  );
};

export default LoadingPanel;
