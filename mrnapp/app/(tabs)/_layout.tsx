import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { colors, components, fontSize, fontWeight, spacing } from '../../src/theme';

type IoniconName = keyof typeof Ionicons.glyphMap;

type IconProps = { focused: boolean; color: string; name: IoniconName };

function TabIcon({ focused, color, name }: IconProps) {
  return (
    <View style={[styles.iconPill, focused && styles.iconPillActive]}>
      <Ionicons name={name} size={20} color={color} />
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarActiveTintColor: colors.accentDark,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabBarItem,
        tabBarLabelStyle: styles.tabBarLabel,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: (p) => <TabIcon {...p} name="home-outline" />,
        }}
      />
      <Tabs.Screen
        name="nutrition"
        options={{
          title: 'Nutrition',
          tabBarIcon: (p) => <TabIcon {...p} name="nutrition-outline" />,
        }}
      />
      <Tabs.Screen
        name="lab"
        options={{
          title: 'Lab',
          tabBarIcon: (p) => <TabIcon {...p} name="flask-outline" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: (p) => <TabIcon {...p} name="person-outline" />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.backgroundPrimary,
    borderTopWidth: spacing.divider,
    borderTopColor: colors.borderTertiary,
    paddingTop: spacing.bottomNavPadTop,
    paddingBottom: spacing.bottomNavPadBottom,
    paddingHorizontal: 12,
    height: 80,
  },
  tabBarItem: {
    paddingVertical: spacing.bottomNavItemPadV,
    gap: spacing.bottomNavItemGap,
  },
  tabBarLabel: {
    fontSize: fontSize.sectionLabel,
    fontWeight: fontWeight.medium as '500',
    letterSpacing: 0.2,
    marginTop: 2,
  },
  iconPill: {
    width: components.bottomNavIcon.width,
    height: components.bottomNavIcon.height,
    borderRadius: 9999,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconPillActive: {
    backgroundColor: colors.accentLight,
  },
});
