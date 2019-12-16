import React, { FC, useEffect } from 'react';
import styles from './styles';
type Props = {
  defaultPath: string,
  onSelectPath: (selectedPath: string) => void
};

const ListPanel: FC<Props> = props => {
  const { ipcRenderer } = require('electron');

  const setDir = () => {
    const app = require('electron').remote.app;
    const defaultPath = props.defaultPath || app.getPath('documents');
    const dialog = require('electron').remote.dialog;
    const selectedPath = dialog.showOpenDialogSync(null, {
      properties: ['openDirectory'],
      defaultPath
    });

    if (selectedPath) {
      props.onSelectPath && props.onSelectPath(selectedPath[0]);
    }
  };

  const componentDidMount = () => {
    return componentWillUnmount;
  };
  const componentWillUnmount = () => {};
  useEffect(componentDidMount, []);

  return (
    <div style={styles.list_panel}>
      <select style={styles.list} />
      <button onClick={setDir} style={styles.list_load_button}>
        ...
      </button>
    </div>
  );
};

export default ListPanel;
