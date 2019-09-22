// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './styles';
import routes from '../../constants/routes';

type Props = {
};

export default class Collapser extends Component<Props> {
  props: Props;

  constructor(props) {
    super(props);
    this.state = {
      isOver: false
    }
  }

  makeOver() {
    this.setState({isOver: true})
  }
  makeNormal() {
    this.setState({isOver: false})
  }

  render() {
    const {
      isOver
    } = this.state;
    return (
      <i
      style={
        {
          ...this.props.style,
          ...styles.default,
          ...(isOver?styles.over: {})
        }
      }
      onMouseEnter={()=>this.makeOver()} onMouseLeave={()=>this.makeNormal()}
      className='fa fa-bars'
      onClick={this.props.onClick}
      />
    );
  }
}
