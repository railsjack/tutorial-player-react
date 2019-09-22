// @flow
import React, { Component } from 'react';
import { View } from 'react-router-dom';
import styles from './styles';
import routes from '../../constants/routes';

type Props = {

};

export default class PlayList extends Component<Props> {
  props: Props;

  render() {
    const {
      items
    } = this.props;
    return (
      <div style={this.props.style}>
        <ul>
        {items && items.map((item, index)=>{
          return (
            <li key={`id_${index}`}><a href="javascript:;" onClick={()=>this.props.onSelectItem(item)}>
              <span>{item.title}</span>
            </a></li>
          )
        })}
        </ul>
      </div>
    );
  }
}
