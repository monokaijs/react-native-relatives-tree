import React, { memo, useCallback } from 'react';
import { View, Text, Pressable } from 'react-native';
import type { ExtNode } from 'relatives-tree/lib/types';
import { nodeNames } from '@/data/sampleData';

interface FamilyNodeProps {
  node: ExtNode;
  isRoot: boolean;
  isSelected: boolean;
  onPress: (id: string) => void;
  onSubPress: (id: string) => void;
  style?: any;
}

const FamilyNode = memo<FamilyNodeProps>(function FamilyNode({
  node,
  isRoot,
  isSelected,
  onPress,
  onSubPress,
  style,
}) {
  const handlePress = useCallback(() => onPress(node.id), [node.id, onPress]);
  const handleSubPress = useCallback(
    () => onSubPress(node.id),
    [node.id, onSubPress],
  );

  const isMale = node.gender === 'male';
  const name = nodeNames[node.id] || node.id;
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <View style={style} className="absolute p-1">
      <Pressable
        onPress={handlePress}
        className={`flex-1 items-center justify-center rounded-2xl border-[1.5px] overflow-hidden py-2 px-1
          ${isMale ? 'bg-blue-500/10 border-blue-500/30' : 'bg-pink-500/10 border-pink-500/30'}
          ${isRoot ? 'border-2 border-primary/60' : ''}
          ${isSelected ? 'border-2 border-primary/90' : ''}
        `}>
        {/* Avatar */}
        <View
          className={`w-9 h-9 rounded-full items-center justify-center mb-1
            ${isMale ? 'bg-blue-500/30' : 'bg-pink-500/30'}
          `}>
          <Text className="text-foreground text-[13px] font-bold">
            {initials}
          </Text>
        </View>

        {/* Name */}
        <Text
          className="text-foreground text-[10px] font-semibold text-center"
          numberOfLines={1}>
          {name.split(' ')[0]}
        </Text>

        {/* Gender dot */}
        <View
          className={`absolute top-2 right-2 w-[6px] h-[6px] rounded-full
            ${isMale ? 'bg-blue-500' : 'bg-pink-500'}
          `}
        />

        {/* Root badge */}
        {isRoot && (
          <View className="absolute top-1 left-1.5">
            <Text className="text-yellow-400 text-[10px]">★</Text>
          </View>
        )}
      </Pressable>

      {/* Sub-tree button */}
      {node.hasSubTree && (
        <Pressable
          onPress={handleSubPress}
          className={`absolute top-0.5 right-2.5 w-5 h-4 rounded-md items-center justify-center border
            ${isMale ? 'bg-pink-500/30 border-pink-500/40' : 'bg-blue-500/30 border-blue-500/40'}
          `}>
          <Text className="text-foreground text-[10px] font-bold">↻</Text>
        </Pressable>
      )}
    </View>
  );
});

export default FamilyNode;
