import React, { FC, useEffect } from 'react';
import Helper from '../../utils/helper';

import styles from './styles';

const OptionItem = props => {
  return <>{props.children}</>;
};

type Props = {
  listPath: string,
  onSelectPath: (selectedPath: string) => void,
  subTitles: Array<string>,
  mp4Files: Array<string>
};

const ListPanel: FC<Props> = props => {
  const { ipcRenderer } = require('electron');

  const onSelectListPathHandler = () => {
    const app = require('electron').remote.app;
    const orgListPath = props.orgListPath || app.getPath('documents');
    const dialog = require('electron').remote.dialog;
    const listPath = dialog.showOpenDialogSync(null, {
      properties: ['openDirectory'],
      defaultPath: orgListPath
    });

    if (listPath) {
      props.onSelectListPath && props.onSelectListPath(listPath[0]);
    }
  };

  const onSelectItemHandler = event => {
    props.onSelectVideo && props.onSelectVideo(event.target.value);
  };

  const componentDidMount = () => {
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {};
  useEffect(componentDidMount, []);

  let temp_subtitle_dir = '';
  const dirNames = [];
  return (
    <div style={styles.list_panel}>
      <select style={styles.list} onChange={onSelectItemHandler}>
        {props.subTitles && props.subTitles.length > 0 && (
          <option>Select a tutorial</option>
        )}
        {props.subTitles &&
          props.subTitles.map((subTitle, index) => {
            const subTitlePathArr = subTitle.split(/\//gi);
            const dirName = Helper.getHumanTitle(subTitlePathArr[0]);
            const fileName = Helper.getHumanTitle(subTitlePathArr[1]);
            const isNewDir = dirNames.indexOf(dirName) === -1;
            isNewDir && dirNames.push(dirName);
            return (
              <OptionItem key={String(index)}>
                {isNewDir ? <optgroup label={dirName} /> : null}
                <option value={index}>
                  &nbsp;&nbsp;
                  {fileName}
                </option>
              </OptionItem>
            );
          })}
      </select>
      <button onClick={onSelectListPathHandler} style={styles.list_load_button}>
        ...
      </button>
    </div>
  );
};

export default ListPanel;
