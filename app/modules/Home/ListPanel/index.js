import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Helper from '../../../utils/helper';
import TutorialAPI, { showError } from '../../../api/tutorial/web';
import { Select, Option } from '../../../components';

import {
  setListPath,
  SET_DEFAULT_PATH,
  setVideoList,
  SET_VIDEO_LIST
} from '../_reducers/home_actions';

import styles from './styles';

const dataArray = [
  'asdfasdfd a sdfasdf1/asdfasdfasdf as df asd1',
  'asdfasdfd a sdfasdf1/asdfasdfasdf as df asd2',
  'asdfasdfd a sdfasdf1/asdfasdfasdf as df asd3',
  'asdfasdfd a sdfasdf2/asdfasdfasdf as df asd4',
  'asdfasdfd a sdfasdf2/asdfasdfasdf as df asd5',
  'asdfasdfd a sdfasdf2/asdfasdfasdf as df asd6',
  'asdfasdfd a sdfasdf2/asdfasdfasdf as df asd7',
  'asdfasdfd a sdfasdf3/asdfasdfasdf as df asd8',
  'asdfasdfd a sdfasdf3/asdfasdfasdf as df asd9'
];

const renderItem = (dirNames, { item, index }) => {
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
  const openDirectoryHandler = () => {
    const selectedDirectory = Helper.selectDirectory();
    if (selectedDirectory) {
      // selectedDirectory[0]
      // loadVideos(listPath);
      TutorialAPI.createListJSON(selectedDirectory[0])
        .then(result => {
          if (result.success) {
            alert(result.message);
            console.log('createdPath', result.createdPath);
            dispatch(setListPath(result.createdPath));
          }
        })
        .catch(error => {
          showError(error);
        });
    }
  };

  const onSelectListHandler = event => {
    props.onSelectList && props.onSelectList(event.target.value);
  };

  const componentDidMount = () => {
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {};
  useEffect(componentDidMount, []);

  const dirNames = [];
  return (
    <div style={styles.list_panel}>
      <Select
        style={styles.list}
        data={dataArray}
        onChange={onSelectListHandler}
        renderItem={({ item, index }) => renderItem(dirNames, { item, index })}
      />
      <button onClick={openDirectoryHandler} style={styles.list_load_button}>
        ...
      </button>
    </div>
  );
};

export default ListPanel;
