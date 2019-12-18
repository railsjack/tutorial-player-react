import React, { FC } from 'react';

type Props = {
  onClick?: any,
  renderItem?: any,
  style?: any,
  data?: Array<any>
};

const LI: FC<Props> = props => {
  return (
    <li
      onClick={props.onClick}
      title={props.title}
      className={props.className}
      style={props.style}
    >
      {props.children}
    </li>
  );
};

const UL: FC<Props> = props => {
  return (
    <ul onChange={props.onChange} style={props.style}>
      {props.data.map((item, index) => props.renderItem({ item, index }))}
    </ul>
  );
};

export default UL;
export { LI };
