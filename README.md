# react-native-relatives-tree

React Native component for rendering family/relatives trees, powered by [`relatives-tree`](https://github.com/SanichKotikov/relatives-tree).

A React Native-compatible port of [`react-family-tree`](https://github.com/SanichKotikov/react-family-tree).

## Install

```bash
yarn add react-native-relatives-tree
# or
npm i react-native-relatives-tree
```

## Usage

```tsx
import ReactNativeRelativesTree from 'react-native-relatives-tree';
import FamilyNode from './FamilyNode';

const NODE_WIDTH = 100;
const NODE_HEIGHT = 110;

<ReactNativeRelativesTree
  nodes={familyData}
  rootId={rootId}
  width={NODE_WIDTH}
  height={NODE_HEIGHT}
  renderNode={(node) => (
    <FamilyNode
      key={node.id}
      node={node}
      style={{
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
        position: 'absolute',
        left: node.left * (NODE_WIDTH / 2),
        top: node.top * (NODE_HEIGHT / 2),
      }}
    />
  )}
/>
```

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `nodes` | `ReadonlyArray<Node>` | ✅ | Array of family tree nodes |
| `rootId` | `string` | ✅ | ID of the root node |
| `width` | `number` | ✅ | Width of each node cell |
| `height` | `number` | ✅ | Height of each node cell |
| `placeholders` | `boolean` | ❌ | Show placeholder nodes |
| `renderNode` | `(node: ExtNode) => ReactNode` | ✅ | Custom node renderer |
| `renderConnector` | `(connector, index) => ReactNode` | ❌ | Custom connector renderer |
| `style` | `ViewStyle` | ❌ | Styles for the container |

## Node Data Structure

```typescript
interface Node {
  id: string;
  gender: 'male' | 'female';
  parents: Relation[];
  children: Relation[];
  siblings: Relation[];
  spouses: Relation[];
}

interface Relation {
  id: string;
  type: 'blood' | 'married' | 'divorced' | 'adopted' | 'half';
}
```

## Node Positioning

Use `left`/`top` for node positioning (recommended for cross-platform compatibility):

```tsx
style={{
  position: 'absolute',
  left: node.left * (NODE_WIDTH / 2),
  top: node.top * (NODE_HEIGHT / 2),
}}
```

## Examples

### Web Example (`example-web/`)

Uses Vite + `react-native-web` to emulate React Native in the browser:

```bash
cd example-web
yarn install
yarn dev
```

### Mobile Example (`example-mobile/`)

Uses Expo + NativeWind (based on [expo-rapid-boilerplate](https://github.com/monokaijs/expo-rapid-boilerplate)):

```bash
cd example-mobile
yarn install
yarn start
```

## License

MIT
