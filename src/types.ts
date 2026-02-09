import { Node, ExtNode, Connector as ConnectorType, RelData, Size } from 'relatives-tree/lib/types';
import type { ViewStyle } from 'react-native';

/** Gender enum matching relatives-tree */
export type Gender = 'male' | 'female';

/** Relation type matching relatives-tree */
export type RelType = 'blood' | 'married' | 'divorced' | 'adopted' | 'half';

/** A relation reference to another node */
export interface Relation {
  readonly id: string;
  readonly type: RelType;
}

/** Re-export core types from relatives-tree */
export type { Node, ExtNode, ConnectorType, RelData, Size };

/** Props for the main ReactNativeRelativesTree component */
export interface ReactNativeRelativesTreeProps {
  /** Array of family tree nodes */
  nodes: ReadonlyArray<Node>;
  /** ID of the root node to start the tree from */
  rootId: string;
  /** Width of each node cell (in pixels) */
  width: number;
  /** Height of each node cell (in pixels) */
  height: number;
  /** Whether to show placeholder nodes for missing family members */
  placeholders?: boolean;
  /**
   * Custom render function for each node.
   *
   * Position nodes using `left`/`top` for best cross-platform results:
   * ```tsx
   * renderNode={(node) => (
   *   <View key={node.id} style={{
   *     position: 'absolute',
   *     width: NODE_WIDTH,
   *     height: NODE_HEIGHT,
   *     left: node.left * (NODE_WIDTH / 2),
   *     top: node.top * (NODE_HEIGHT / 2),
   *   }}>
   *     ...
   *   </View>
   * )}
   * ```
   */
  renderNode: (node: ExtNode) => React.ReactNode;
  /** Custom render function for connectors; if not provided, default lines are rendered */
  renderConnector?: (connector: ConnectorType, index: number) => React.ReactNode;
  /** Style applied to the tree container */
  style?: ViewStyle;
}

/** Props for the default Connector component */
export interface ConnectorProps {
  /** Connector data [x1, y1, x2, y2] */
  connector: ConnectorType;
  /** Half-width of a node cell */
  width: number;
  /** Half-height of a node cell */
  height: number;
  /** Color of the connector line */
  color?: string;
}
