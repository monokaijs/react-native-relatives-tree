import React, { memo, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import type { ExtNode } from 'relatives-tree/lib/types';
import { nodeNames } from '../data/sampleData';

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
  const handleSubPress = useCallback(() => onSubPress(node.id), [node.id, onSubPress]);

  const isMale = node.gender === 'male';
  const name = nodeNames[node.id] || node.id;
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <View style={[styles.root, style]}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.8}
        style={[
          styles.card,
          isMale ? styles.maleCard : styles.femaleCard,
          isRoot && styles.rootCard,
          isSelected && styles.selectedCard,
        ]}
      >
        {/* Glow effect */}
        <View
          style={[
            styles.glowOverlay,
            isMale ? styles.maleGlow : styles.femaleGlow,
            isSelected && styles.selectedGlow,
          ]}
        />

        {/* Avatar circle */}
        <View
          style={[
            styles.avatar,
            isMale ? styles.maleAvatar : styles.femaleAvatar,
          ]}
        >
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        {/* Name */}
        <Text style={styles.name} numberOfLines={1}>
          {name.split(' ')[0]}
        </Text>

        {/* Gender indicator */}
        <View style={[styles.genderDot, isMale ? styles.maleDot : styles.femaleDot]} />

        {/* Root badge */}
        {isRoot && (
          <View style={styles.rootBadge}>
            <Text style={styles.rootBadgeText}>★</Text>
          </View>
        )}
      </TouchableOpacity>

      {/* Sub-tree button */}
      {node.hasSubTree && (
        <TouchableOpacity
          onPress={handleSubPress}
          activeOpacity={0.7}
          style={[
            styles.subButton,
            isMale ? styles.femaleSubButton : styles.maleSubButton,
          ]}
        >
          <Text style={styles.subButtonText}>↻</Text>
        </TouchableOpacity>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  root: {
    position: 'absolute',
    padding: 6,
  },
  card: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: 1.5,
    overflow: 'hidden',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  maleCard: {
    backgroundColor: 'rgba(59, 130, 246, 0.12)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
  },
  femaleCard: {
    backgroundColor: 'rgba(236, 72, 153, 0.12)',
    borderColor: 'rgba(236, 72, 153, 0.3)',
  },
  rootCard: {
    borderWidth: 2,
    borderColor: 'rgba(108, 99, 255, 0.6)',
  },
  selectedCard: {
    borderColor: 'rgba(108, 99, 255, 0.9)',
    borderWidth: 2,
  },
  glowOverlay: {
    position: 'absolute',
    top: -20,
    left: -20,
    right: -20,
    bottom: -20,
    borderRadius: 30,
    opacity: 0.15,
  },
  maleGlow: {
    backgroundColor: '#3b82f6',
  },
  femaleGlow: {
    backgroundColor: '#ec4899',
  },
  selectedGlow: {
    opacity: 0.3,
    backgroundColor: '#6c63ff',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 4,
  },
  maleAvatar: {
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
  },
  femaleAvatar: {
    backgroundColor: 'rgba(236, 72, 153, 0.3)',
  },
  avatarText: {
    color: '#f1f1f3',
    fontSize: 13,
    fontWeight: '700',
  },
  name: {
    color: '#f1f1f3',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
    maxWidth: 70,
  },
  genderDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  maleDot: {
    backgroundColor: '#3b82f6',
  },
  femaleDot: {
    backgroundColor: '#ec4899',
  },
  rootBadge: {
    position: 'absolute',
    top: 4,
    left: 6,
  },
  rootBadgeText: {
    color: '#fbbf24',
    fontSize: 10,
  },
  subButton: {
    position: 'absolute',
    top: 2,
    right: 10,
    width: 20,
    height: 16,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  maleSubButton: {
    backgroundColor: 'rgba(59, 130, 246, 0.3)',
    borderColor: 'rgba(59, 130, 246, 0.4)',
  },
  femaleSubButton: {
    backgroundColor: 'rgba(236, 72, 153, 0.3)',
    borderColor: 'rgba(236, 72, 153, 0.4)',
  },
  subButtonText: {
    color: '#f1f1f3',
    fontSize: 10,
    fontWeight: '700',
  },
});

export default FamilyNode;
