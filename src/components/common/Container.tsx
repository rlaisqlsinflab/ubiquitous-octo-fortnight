import React from 'react';

type Props = {
  children?: React.ReactNode;
};

const Container = ({ children }: Props) => <div>{children}</div>;

export default Container;
