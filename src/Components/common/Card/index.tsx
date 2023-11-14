import React from 'react';
import CardBody from './CardBody';
import CardHeader from './CardHeader';

const Card = ({
  title,
  children,
  showHeader,
  borderRadius = '10px',
  padding,
  height,
}: {
  title?: React.ReactNode;
  children: React.ReactNode;
  showHeader?: boolean;
  borderRadius?: string;
  padding?: number;
  height?: string;
}) => {
  return (
    <div
      style={{
        backgroundColor: 'white',
        borderRadius: borderRadius,
        height: height || '100%',
      }}
    >
      {showHeader && <CardHeader title={title || ''} />}
      <CardBody padding={padding}>{children}</CardBody>
    </div>
  );
};

export default Card;
