// @flow
import React, { Component } from 'react';

import Collapser from '../Collapser';
import styles from './styles';

type Props = {
  items: Any,
  style: Any,
  onSelectItem: Any
};

export default class PlayList extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props)
    this.state = {
      shownPlayList: false
    }
  }

  togglePlayList() {
    const { shownPlayList } = this.state
    this.setState({ shownPlayList: !shownPlayList })
  }

  render() {
    const {
      items, style, onSelectItem
    } = this.props
    const { shownPlayList } = this.state
    return (
      <div style={{
        ...{'position': 'relative'},
        ...style,
        ...(!shownPlayList ? styles.hidden : {})
      }}>
        <Collapser onClick={() => this.togglePlayList()}
          style={{ position: 'absolute', zIndex: 1, top: 5, right: (!shownPlayList ? 0:15) }}
        />
        {shownPlayList &&
          <div style={
            {...styles.default}
          }>
          <ul style={{ padding: 10, margin: 0 }}>
            {items && items.map((item, index) =>
              <li key={`id_${index.toString()}`}
                style={{lineHeight: '30px'}}
              >
                <a href="#" onClick={() => onSelectItem(item)}>
                <span>{item.title}</span>
              </a></li>
            )}
          </ul>
          </div>
        }
      </div>
    );
  }
}
