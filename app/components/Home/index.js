// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import styles from './Home.css';

import Collapser from '../Collapser';
import PlayList from '../PlayList';


type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props)
    this.state = {
      shownPlayList: false
    }
  }

  togglePlayList() {
    const {shownPlayList} = this.state
    this.setState({shownPlayList: !shownPlayList})
  }

  render() {
    const {shownPlayList} = this.state
    return (
      <>
        <Collapser onClick={()=>this.togglePlayList()}
          style={{position: 'fixed', zIndex: 1, top: 2, left: 2}}
        />
        {shownPlayList &&
          <PlayList
          items={[
            {title: 'Tutorial 1', url: 'blabla'},
            {title: 'Tutorial 2', url: 'blabla2'}
          ]}
          onSelectItem={(item)=>alert(JSON.stringify(item))}
          style={
            {width: 200, height: '100%', backgroundColor: 'rgba(0,0,0,0.2)'}
          } />
        }
      </>
    );
  }
}
