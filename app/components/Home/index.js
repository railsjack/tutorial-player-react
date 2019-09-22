// @flow
import React, { Component } from 'react';

import PlayList from '../PlayList';


type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  playVideo = (item) => {
    alert(JSON.stringify(item))
  }

  render() {
    return (
      <>
        <PlayList
          items={[
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 1', url: 'blabla' },
            { title: 'Tutorial 2', url: 'blabla2' }
          ]}
          onSelectItem={(item) => this.playVideo(item)}
          style={
            { width: 300, height: '100%', backgroundColor: 'rgba(0,0,0,0.2)' }
          } />

      </>
    );
  }
}
