import React, { FC } from 'react';

type Props = {
  onChange?: any,
  renderItem?: any,
  style?: any,
  data?: Array<any>
};

const Option: FC<Props> = props => {
  return <option onChange={props.onChange} style={props.style} />;
};

const Select: FC<Props> = props => {
  return (
    <select value={props.value} onChange={props.onChange} style={props.style}>
      {props.data.map((item, index) => props.renderItem({ item, index }))}
    </select>
  );
};

export default Select;
export { Option };
