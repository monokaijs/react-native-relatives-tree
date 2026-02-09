import React, { memo, useMemo } from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import calcTree from 'relatives-tree';
import Connector from './Connector';
import { ReactNativeRelativesTreeProps } from './types';

/**
 * ReactNativeRelativesTree - A React Native component that calculates
 * and renders a family/relatives tree using the `relatives-tree` engine.
 *
 * This component is fully compatible with React Native (iOS/Android)
 * and react-native-web. Position nodes using `left`/`top` for best
 * cross-platform results, or use transforms if needed.
 *
 * Usage:
 * ```tsx
 * <ReactNativeRelativesTree
 *   nodes={familyData}
 *   rootId="person1"
 *   width={100}
 *   height={120}
 *   renderNode={(node) => (
 *     <View
 *       key={node.id}
 *       style={{
 *         width: 100,
 *         height: 120,
 *         position: 'absolute',
 *         left: node.left * (100 / 2),
 *         top: node.top * (120 / 2),
 *       }}
 *     >
 *       <Text>{node.id}</Text>
 *     </View>
 *   )}
 * />
 * ```
 */
const ReactNativeRelativesTree = memo<ReactNativeRelativesTreeProps>(
  function ReactNativeRelativesTree(props) {
    const {
      nodes,
      rootId,
      width,
      height,
      placeholders,
      renderNode,
      renderConnector,
      style,
    } = props;

    const data = useMemo(
      () => calcTree(nodes, { rootId, placeholders }),
      [nodes, rootId, placeholders]
    );

    const halfWidth = width / 2;
    const halfHeight = height / 2;

    const containerStyle = useMemo<ViewStyle>(
      () => ({
        width: data.canvas.width * halfWidth,
        height: data.canvas.height * halfHeight,
      }),
      [data.canvas.width, data.canvas.height, halfWidth, halfHeight]
    );

    return (
      <View style={[styles.container, containerStyle, style]}>
        {data.connectors.map((connector, idx) =>
          renderConnector ? (
            renderConnector(connector, idx)
          ) : (
            <Connector
              key={idx}
              connector={connector}
              width={halfWidth}
              height={halfHeight}
            />
          )
        )}
        {data.nodes.map(renderNode)}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    // Do NOT use overflow: 'visible' — it's broken on Android.
    // Instead, the container is sized exactly to fit the canvas,
    // so no overflow should be needed.
    position: 'relative',
  },
});

export default ReactNativeRelativesTree;
