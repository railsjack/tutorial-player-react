import React, { useState } from 'react';
import styles from './styles';

const LeftPanel = props => {
  const [openStatus, setOpenStatus] = useState(false);
  const togglePanel = () => {
    setOpenStatus(!openStatus);
  };
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
      <div style={styles.list} />
    </div>
  );
};

export default LeftPanel;
