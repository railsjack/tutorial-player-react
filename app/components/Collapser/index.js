// @flow
import React, { Component } from 'react';
import styles from './styles';

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

  makeOver = () => {
    this.setState({ isOver: true })
  }

  makeNormal = () => {
    this.setState({ isOver: false })
  }

  render() {
    const {
      isOver
    } = this.state;
    return (
      <button
        style={
          {
            ...this.props.style,
            ...styles.default,
            ...(isOver ? styles.over : {})
          }
        }
        onMouseEnter={() => this.makeOver()} onMouseLeave={() => this.makeNormal()}
        onClick={this.props.onClick}
      ><i className='fa fa-bars' style={{fontSize: '14pt'}}/>
      </button>
    );
  }
}
