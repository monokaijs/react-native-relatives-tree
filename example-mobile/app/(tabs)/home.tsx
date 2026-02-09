import React, { useState, useCallback, useMemo } from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import calcTree from 'relatives-tree';
import type { ExtNode, Connector as ConnectorType } from 'relatives-tree/lib/types';
import sampleNodes, { nodeNames } from '@/data/sampleData';
import FamilyNode from '@/components/tree/FamilyNode';

const NODE_WIDTH = 90;
const NODE_HEIGHT = 100;

export default function HomeScreen() {
  const [rootId, setRootId] = useState('me');
  const [selectedId, setSelectedId] = useState<string | null>('me');

  const data = useMemo(
    () => calcTree(sampleNodes, { rootId, placeholders: false }),
    [rootId],
  );

  const halfWidth = NODE_WIDTH / 2;
  const halfHeight = NODE_HEIGHT / 2;

  const handleNodePress = useCallback((id: string) => {
    setSelectedId(id);
  }, []);

  const handleSubPress = useCallback((id: string) => {
    setRootId(id);
    setSelectedId(id);
  }, []);

  const handleReset = useCallback(() => {
    setRootId('me');
    setSelectedId('me');
  }, []);

  const selectedNode = useMemo(() => {
    if (!selectedId) return null;
    return sampleNodes.find(n => n.id === selectedId) ?? null;
  }, [selectedId]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-2 pb-3 border-b border-neutrals700">
        <View className="flex-row items-center gap-3">
          <Text className="text-[28px]">🌳</Text>
          <View>
            <Text className="text-foreground text-xl font-bold tracking-tight">
              Family Tree
            </Text>
            <Text className="text-neutrals400 text-[11px] font-medium mt-0.5">
              react-native-relatives-tree
            </Text>
          </View>
        </View>
        <View className="flex-row gap-3">
          <View className="bg-primary/10 rounded-xl px-3 py-1.5 items-center border border-primary/15">
            <Text className="text-primary text-base font-extrabold">
              {sampleNodes.length}
            </Text>
            <Text className="text-neutrals400 text-[9px] font-medium uppercase tracking-wider mt-0.5">
              Members
            </Text>
          </View>
          <View className="bg-primary/10 rounded-xl px-3 py-1.5 items-center border border-primary/15">
            <Text className="text-primary text-base font-extrabold">4</Text>
            <Text className="text-neutrals400 text-[9px] font-medium uppercase tracking-wider mt-0.5">
              Generations
            </Text>
          </View>
        </View>
      </View>

      {/* Tree View */}
      <View className="flex-1">
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ flexGrow: 1 }}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              alignItems: 'center',
              justifyContent: 'center',
              padding: 20,
            }}>
            <View
              style={{
                position: 'relative',
                width: data.canvas.width * halfWidth,
                height: data.canvas.height * halfHeight,
              }}>
              {/* Connectors */}
              {data.connectors.map(
                (connector: ConnectorType, idx: number) => {
                  const [x1, y1, x2, y2] = connector;
                  return (
                    <View
                      key={`c-${idx}`}
                      pointerEvents="none"
                      className="absolute bg-primary/40 rounded-[1px]"
                      style={{
                        width: Math.max(1.5, (x2 - x1) * halfWidth + 1.5),
                        height: Math.max(
                          1.5,
                          (y2 - y1) * halfHeight + 1.5,
                        ),
                        left: x1 * halfWidth,
                        top: y1 * halfHeight,
                      }}
                    />
                  );
                },
              )}

              {/* Nodes */}
              {data.nodes.map((node: ExtNode) => (
                <FamilyNode
                  key={node.id}
                  node={node}
                  isRoot={node.id === rootId}
                  isSelected={node.id === selectedId}
                  onPress={handleNodePress}
                  onSubPress={handleSubPress}
                  style={{
                    width: NODE_WIDTH,
                    height: NODE_HEIGHT,
                    left: node.left * halfWidth,
                    top: node.top * halfHeight,
                  }}
                />
              ))}
            </View>
          </ScrollView>
        </ScrollView>

        {/* Reset button */}
        {rootId !== 'me' && (
          <Pressable
            onPress={handleReset}
            className="absolute bottom-5 right-5 bg-neutrals800/90 rounded-2xl px-4 py-3 border border-neutrals700">
            <Text className="text-primary text-sm font-bold">⟲ Reset</Text>
          </Pressable>
        )}
      </View>

      {/* Bottom Detail Panel */}
      {selectedNode && (
        <View className="bg-neutrals900/95 border-t border-neutrals700 px-5 pt-4 pb-5">
          {/* Header */}
          <View className="flex-row items-center gap-3.5 mb-3.5">
            <View
              className={`w-12 h-12 rounded-full items-center justify-center
                ${selectedNode.gender === 'male' ? 'bg-blue-500/25' : 'bg-pink-500/25'}
              `}>
              <Text className="text-foreground text-lg font-bold">
                {(nodeNames[selectedNode.id] || selectedNode.id)
                  .split(' ')
                  .map(n => n[0])
                  .join('')}
              </Text>
            </View>
            <View className="flex-1">
              <Text className="text-foreground text-lg font-bold tracking-tight">
                {nodeNames[selectedNode.id] || selectedNode.id}
              </Text>
              <View className="flex-row gap-1.5 mt-1">
                <View
                  className={`px-2 py-0.5 rounded-md
                    ${selectedNode.gender === 'male' ? 'bg-blue-500/15' : 'bg-pink-500/15'}
                  `}>
                  <Text className="text-neutrals200 text-[11px] font-semibold">
                    {selectedNode.gender === 'male' ? '♂ Male' : '♀ Female'}
                  </Text>
                </View>
                {selectedNode.id === rootId && (
                  <View className="bg-yellow-400/15 px-2 py-0.5 rounded-md">
                    <Text className="text-yellow-400 text-[11px] font-semibold">
                      ★ Root
                    </Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          {/* Stats */}
          <View className="flex-row bg-neutrals800/60 rounded-xl p-3 border border-neutrals700/40 mb-3">
            <View className="flex-1 items-center">
              <Text className="text-foreground text-xl font-extrabold">
                {selectedNode.parents.length}
              </Text>
              <Text className="text-neutrals400 text-[10px] font-medium uppercase tracking-wider mt-0.5">
                Parents
              </Text>
            </View>
            <View className="w-[1px] bg-neutrals700/60 my-0.5" />
            <View className="flex-1 items-center">
              <Text className="text-foreground text-xl font-extrabold">
                {selectedNode.siblings.length}
              </Text>
              <Text className="text-neutrals400 text-[10px] font-medium uppercase tracking-wider mt-0.5">
                Siblings
              </Text>
            </View>
            <View className="w-[1px] bg-neutrals700/60 my-0.5" />
            <View className="flex-1 items-center">
              <Text className="text-foreground text-xl font-extrabold">
                {selectedNode.spouses.length}
              </Text>
              <Text className="text-neutrals400 text-[10px] font-medium uppercase tracking-wider mt-0.5">
                Spouses
              </Text>
            </View>
            <View className="w-[1px] bg-neutrals700/60 my-0.5" />
            <View className="flex-1 items-center">
              <Text className="text-foreground text-xl font-extrabold">
                {selectedNode.children.length}
              </Text>
              <Text className="text-neutrals400 text-[10px] font-medium uppercase tracking-wider mt-0.5">
                Children
              </Text>
            </View>
          </View>

          {/* Family chips */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8, paddingRight: 12 }}
            className="mb-3">
            {[
              ...selectedNode.parents,
              ...selectedNode.spouses,
              ...selectedNode.children,
            ].map(rel => (
              <Pressable
                key={rel.id}
                onPress={() => setSelectedId(rel.id)}
                className={`flex-row items-center gap-1.5 rounded-full px-3 py-1.5 border
                  ${rel.type === 'married' ? 'bg-pink-500/10 border-pink-500/15' : 'bg-primary/10 border-primary/15'}
                `}>
                <Text className="text-neutrals200 text-xs font-semibold">
                  {nodeNames[rel.id] || rel.id}
                </Text>
                <Text className="text-xs">
                  {rel.type === 'married'
                    ? '💍'
                    : selectedNode.parents.find(p => p.id === rel.id)
                      ? '👆'
                      : '👶'}
                </Text>
              </Pressable>
            ))}
          </ScrollView>

          {/* Set as root */}
          {selectedNode.id !== rootId && (
            <Pressable
              onPress={() => handleSubPress(selectedNode.id)}
              className="bg-primary/15 rounded-xl py-2.5 items-center border border-primary/25">
              <Text className="text-primary text-[13px] font-bold">
                View{' '}
                {
                  (nodeNames[selectedNode.id] || selectedNode.id).split(
                    ' ',
                  )[0]
                }
                's Tree
              </Text>
            </Pressable>
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
