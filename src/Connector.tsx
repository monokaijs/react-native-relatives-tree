import React, { memo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ConnectorProps } from './types';

/**
 * Default connector component that renders a line between
 * family tree nodes using React Native Views.
 */
const Connector = memo<ConnectorProps>(function Connector({
  connector,
  width,
  height,
  color = '#999',
}) {
  const [x1, y1, x2, y2] = connector;

  const lineWidth = Math.max(1, (x2 - x1) * width + 1);
  const lineHeight = Math.max(1, (y2 - y1) * height + 1);

  return (
    <View
      style={[
        styles.connector,
        {
          width: lineWidth,
          height: lineHeight,
          backgroundColor: color,
          transform: [
            { translateX: x1 * width },
            { translateY: y1 * height },
          ],
        },
      ]}
      pointerEvents="none"
    />
  );
});

const styles = StyleSheet.create({
  connector: {
    position: 'absolute',
  },
});

export default Connector;
