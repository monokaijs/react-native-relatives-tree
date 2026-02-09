import React, { useState, useCallback, useRef, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import calcTree from 'relatives-tree';
import type { ExtNode, Connector as ConnectorType } from 'relatives-tree/lib/types';
import sampleNodes, { nodeNames } from './data/sampleData';
import FamilyNode from './components/FamilyNode';

const NODE_WIDTH = 100;
const NODE_HEIGHT = 110;

export default function App() {
  const [rootId, setRootId] = useState('me');
  const [selectedId, setSelectedId] = useState<string | null>('me');
  const [scale, setScale] = useState(1);

  const data = useMemo(
    () => calcTree(sampleNodes, { rootId, placeholders: false }),
    [rootId]
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
    setScale(1);
  }, []);

  const handleZoomIn = useCallback(() => {
    setScale((s) => Math.min(s + 0.2, 2.5));
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale((s) => Math.max(s - 0.2, 0.3));
  }, []);

  const selectedNode = useMemo(() => {
    if (!selectedId) return null;
    return sampleNodes.find((n) => n.id === selectedId) ?? null;
  }, [selectedId]);

  return (
    <View style={styles.container}>
      {/* Background gradient overlay */}
      <View style={styles.bgGradient} />
      <View style={styles.bgGradient2} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.headerIcon}>🌳</Text>
          <View>
            <Text style={styles.headerTitle}>Family Tree</Text>
            <Text style={styles.headerSubtitle}>react-native-relatives-tree</Text>
          </View>
        </View>
        <View style={styles.headerRight}>
          <View style={styles.statBadge}>
            <Text style={styles.statNumber}>{sampleNodes.length}</Text>
            <Text style={styles.statLabel}>Members</Text>
          </View>
          <View style={styles.statBadge}>
            <Text style={styles.statNumber}>4</Text>
            <Text style={styles.statLabel}>Generations</Text>
          </View>
        </View>
      </View>

      {/* Main content area */}
      <View style={styles.mainContent}>
        {/* Tree canvas */}
        <ScrollView
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          horizontal
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          directionalLockEnabled={false}
        >
          <ScrollView
            contentContainerStyle={styles.scrollContentInner}
            showsVerticalScrollIndicator={false}
          >
            <View
              style={[
                styles.treeContainer,
                {
                  width: data.canvas.width * halfWidth * scale,
                  height: data.canvas.height * halfHeight * scale,
                  transform: [{ scale }],
                },
              ]}
            >
              {/* Connectors */}
              {data.connectors.map((connector: ConnectorType, idx: number) => {
                const [x1, y1, x2, y2] = connector;
                return (
                  <View
                    key={`c-${idx}`}
                    style={[
                      styles.connector,
                      {
                        width: Math.max(1.5, (x2 - x1) * halfWidth + 1.5),
                        height: Math.max(1.5, (y2 - y1) * halfHeight + 1.5),
                        left: x1 * halfWidth,
                        top: y1 * halfHeight,
                      },
                    ]}
                  />
                );
              })}

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

        {/* Zoom controls */}
        <View style={styles.zoomControls}>
          <TouchableOpacity
            onPress={handleZoomIn}
            style={styles.zoomButton}
            activeOpacity={0.7}
          >
            <Text style={styles.zoomButtonText}>＋</Text>
          </TouchableOpacity>
          <View style={styles.zoomDivider} />
          <TouchableOpacity
            onPress={handleZoomOut}
            style={styles.zoomButton}
            activeOpacity={0.7}
          >
            <Text style={styles.zoomButtonText}>－</Text>
          </TouchableOpacity>
          <View style={styles.zoomDivider} />
          <TouchableOpacity
            onPress={handleReset}
            style={styles.zoomButton}
            activeOpacity={0.7}
          >
            <Text style={styles.zoomResetText}>⟲</Text>
          </TouchableOpacity>
        </View>

        {/* Scale indicator */}
        <View style={styles.scaleIndicator}>
          <Text style={styles.scaleText}>{Math.round(scale * 100)}%</Text>
        </View>
      </View>

      {/* Bottom detail panel */}
      {selectedNode && (
        <View style={styles.detailPanel}>
          <View style={styles.detailHeader}>
            <View
              style={[
                styles.detailAvatar,
                selectedNode.gender === 'male'
                  ? styles.detailAvatarMale
                  : styles.detailAvatarFemale,
              ]}
            >
              <Text style={styles.detailAvatarText}>
                {(nodeNames[selectedNode.id] || selectedNode.id)
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </Text>
            </View>
            <View style={styles.detailInfo}>
              <Text style={styles.detailName}>
                {nodeNames[selectedNode.id] || selectedNode.id}
              </Text>
              <View style={styles.detailTags}>
                <View
                  style={[
                    styles.genderTag,
                    selectedNode.gender === 'male'
                      ? styles.genderTagMale
                      : styles.genderTagFemale,
                  ]}
                >
                  <Text style={styles.genderTagText}>
                    {selectedNode.gender === 'male' ? '♂ Male' : '♀ Female'}
                  </Text>
                </View>
                {selectedNode.id === rootId && (
                  <View style={styles.rootTag}>
                    <Text style={styles.rootTagText}>★ Root</Text>
                  </View>
                )}
              </View>
            </View>
          </View>

          <View style={styles.detailStats}>
            <View style={styles.detailStatItem}>
              <Text style={styles.detailStatValue}>
                {selectedNode.parents.length}
              </Text>
              <Text style={styles.detailStatLabel}>Parents</Text>
            </View>
            <View style={styles.detailStatDivider} />
            <View style={styles.detailStatItem}>
              <Text style={styles.detailStatValue}>
                {selectedNode.siblings.length}
              </Text>
              <Text style={styles.detailStatLabel}>Siblings</Text>
            </View>
            <View style={styles.detailStatDivider} />
            <View style={styles.detailStatItem}>
              <Text style={styles.detailStatValue}>
                {selectedNode.spouses.length}
              </Text>
              <Text style={styles.detailStatLabel}>Spouses</Text>
            </View>
            <View style={styles.detailStatDivider} />
            <View style={styles.detailStatItem}>
              <Text style={styles.detailStatValue}>
                {selectedNode.children.length}
              </Text>
              <Text style={styles.detailStatLabel}>Children</Text>
            </View>
          </View>

          {/* Quick navigate family */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.familyScroll}
            contentContainerStyle={styles.familyScrollContent}
          >
            {[...selectedNode.parents, ...selectedNode.spouses, ...selectedNode.children].map(
              (rel) => (
                <TouchableOpacity
                  key={rel.id}
                  style={[
                    styles.familyChip,
                    rel.type === 'married' && styles.familyChipMarried,
                  ]}
                  onPress={() => {
                    setSelectedId(rel.id);
                  }}
                  activeOpacity={0.7}
                >
                  <Text style={styles.familyChipText}>
                    {nodeNames[rel.id] || rel.id}
                  </Text>
                  <Text style={styles.familyChipType}>
                    {rel.type === 'married'
                      ? '💍'
                      : selectedNode.parents.find((p) => p.id === rel.id)
                        ? '👆'
                        : '👶'}
                  </Text>
                </TouchableOpacity>
              )
            )}
          </ScrollView>

          {/* Set as root button */}
          {selectedNode.id !== rootId && (
            <TouchableOpacity
              style={styles.setRootButton}
              onPress={() => handleSubPress(selectedNode.id)}
              activeOpacity={0.7}
            >
              <Text style={styles.setRootButtonText}>
                View {(nodeNames[selectedNode.id] || selectedNode.id).split(' ')[0]}'s Tree
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0f',
  },
  bgGradient: {
    position: 'absolute',
    top: -200,
    right: -200,
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: 'rgba(108, 99, 255, 0.06)',
  },
  bgGradient2: {
    position: 'absolute',
    bottom: -150,
    left: -150,
    width: 400,
    height: 400,
    borderRadius: 200,
    backgroundColor: 'rgba(236, 72, 153, 0.04)',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.06)',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    fontSize: 28,
  },
  headerTitle: {
    color: '#f1f1f3',
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    color: '#6b7280',
    fontSize: 11,
    fontWeight: '500',
    marginTop: 1,
  },
  headerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  statBadge: {
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.15)',
  },
  statNumber: {
    color: '#a78bfa',
    fontSize: 16,
    fontWeight: '800',
  },
  statLabel: {
    color: '#6b7280',
    fontSize: 9,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 1,
  },
  mainContent: {
    flex: 1,
    position: 'relative',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 30,
  },
  scrollContentInner: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  treeContainer: {
    position: 'relative',
  },
  connector: {
    position: 'absolute',
    backgroundColor: 'rgba(108, 99, 255, 0.4)',
    borderRadius: 1,
  },
  zoomControls: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(26, 26, 46, 0.9)',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
    overflow: 'hidden',
    // @ts-ignore - web shadow
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 20,
    shadowOffset: { width: 0, height: 10 },
  },
  zoomButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  zoomButtonText: {
    color: '#f1f1f3',
    fontSize: 18,
    fontWeight: '600',
  },
  zoomResetText: {
    color: '#a78bfa',
    fontSize: 20,
    fontWeight: '600',
  },
  zoomDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
  },
  scaleIndicator: {
    position: 'absolute',
    bottom: 24,
    right: 76,
    backgroundColor: 'rgba(26, 26, 46, 0.7)',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  scaleText: {
    color: '#9ca3af',
    fontSize: 11,
    fontWeight: '600',
  },
  detailPanel: {
    backgroundColor: 'rgba(18, 18, 26, 0.95)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.06)',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 20,
    // @ts-ignore
    backdropFilter: 'blur(20px)',
  },
  detailHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 14,
  },
  detailAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  detailAvatarMale: {
    backgroundColor: 'rgba(59, 130, 246, 0.25)',
  },
  detailAvatarFemale: {
    backgroundColor: 'rgba(236, 72, 153, 0.25)',
  },
  detailAvatarText: {
    color: '#f1f1f3',
    fontSize: 18,
    fontWeight: '700',
  },
  detailInfo: {
    flex: 1,
  },
  detailName: {
    color: '#f1f1f3',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: -0.3,
  },
  detailTags: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 4,
  },
  genderTag: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  genderTagMale: {
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
  },
  genderTagFemale: {
    backgroundColor: 'rgba(236, 72, 153, 0.15)',
  },
  genderTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#9ca3af',
  },
  rootTag: {
    backgroundColor: 'rgba(251, 191, 36, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
  },
  rootTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fbbf24',
  },
  detailStats: {
    flexDirection: 'row',
    backgroundColor: 'rgba(26, 26, 46, 0.6)',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
    marginBottom: 12,
  },
  detailStatItem: {
    flex: 1,
    alignItems: 'center',
  },
  detailStatValue: {
    color: '#f1f1f3',
    fontSize: 20,
    fontWeight: '800',
  },
  detailStatLabel: {
    color: '#6b7280',
    fontSize: 10,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginTop: 2,
  },
  detailStatDivider: {
    width: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    marginVertical: 2,
  },
  familyScroll: {
    marginBottom: 12,
  },
  familyScrollContent: {
    gap: 8,
    paddingRight: 12,
  },
  familyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(108, 99, 255, 0.1)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.15)',
  },
  familyChipMarried: {
    backgroundColor: 'rgba(236, 72, 153, 0.1)',
    borderColor: 'rgba(236, 72, 153, 0.15)',
  },
  familyChipText: {
    color: '#d1d5db',
    fontSize: 12,
    fontWeight: '600',
  },
  familyChipType: {
    fontSize: 12,
  },
  setRootButton: {
    backgroundColor: 'rgba(108, 99, 255, 0.15)',
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.25)',
  },
  setRootButtonText: {
    color: '#a78bfa',
    fontSize: 13,
    fontWeight: '700',
  },
});
