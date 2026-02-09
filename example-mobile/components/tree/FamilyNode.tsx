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

const AVATAR_SIZE = 48;

const FamilyNode = memo<FamilyNodeProps>(function FamilyNode({
  node,
  isRoot,
  isSelected,
  onPress,
  onSubPress,
  style,
}) {
  const handlePress = useCallback(() => onPress(node.id), [node.id, onPress]);

  const isMale = node.gender === 'male';
  const name = nodeNames[node.id] || node.id;
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase();

  return (
    <View style={style} className="absolute">
      <Pressable onPress={handlePress} className="flex-1 items-center justify-center">
        {/* Circle Avatar — centered at the cell midpoint */}
        <View
          className={`items-center justify-center rounded-full
            ${isMale ? 'bg-[#1a2744]' : 'bg-[#2e1a2a]'}
            ${isSelected ? 'border-2 border-primary' : 'border-[1.5px] border-neutrals600'}
            ${isRoot ? 'border-2 border-yellow-400' : ''}
          `}
          style={{ width: AVATAR_SIZE, height: AVATAR_SIZE }}>
          <Text className="text-foreground text-[14px] font-bold">
            {initials}
          </Text>
        </View>

        {/* Name Badge — absolute, below avatar */}
        <View
          className={`absolute self-center px-2 py-0.5 rounded-full
            ${isSelected ? 'bg-primary/20' : 'bg-neutrals800/80'}
          `}
          style={{ top: '50%', marginTop: AVATAR_SIZE / 2 + 2 }}>
          <Text
            className="text-foreground text-[10px] font-semibold text-center"
            numberOfLines={1}>
            {name.split(' ')[0]}
          </Text>
        </View>
      </Pressable>
    </View>
  );
});

export default FamilyNode;
