import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ToastProvider, useToast } from 'tostadin-rn';
import {
  CheckCircle2,
  XCircle,
  Info as InfoIcon,
  CloudUpload,
  Loader2,
  Zap,
  Sun,
  Moon,
  ArrowUpToLine,
  ArrowDownToLine,
} from 'lucide-react-native';

type StatusBarStyle = 'dark-content' | 'light-content';

interface ThemeColors {
  bg: string;
  surface: string;
  text: string;
  textSecondary: string;
  textTertiary: string;
  tabBg: string;
  tabActiveBg: string;
  tabActiveText: string;
  border: string;
  infoBg: string;
  infoBorder: string;
  infoText: string;
  success: string;
  error: string;
  warning: string;
  info: string;
  statusBar: StatusBarStyle;
}

const COLORS: Record<'light' | 'dark', ThemeColors> = {
  light: {
    bg: '#f8fafc',
    surface: '#ffffff',
    text: '#0f172a',
    textSecondary: '#64748b',
    textTertiary: '#94a3b8',
    tabBg: '#f1f5f9',
    tabActiveBg: '#0f172a',
    tabActiveText: '#ffffff',
    border: '#e2e8f0',
    infoBg: '#eff6ff',
    infoBorder: '#bfdbfe',
    infoText: '#1e40af',
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6',
    statusBar: 'dark-content' as const,
  },
  dark: {
    bg: '#0f172a',
    surface: '#1e293b',
    text: '#f1f5f9',
    textSecondary: '#94a3b8',
    textTertiary: '#64748b',
    tabBg: '#1e293b',
    tabActiveBg: '#f1f5f9',
    tabActiveText: '#0f172a',
    border: '#334155',
    infoBg: '#1e293b',
    infoBorder: '#334155',
    infoText: '#93c5fd',
    success: '#34d399',
    error: '#f87171',
    warning: '#fbbf24',
    info: '#60a5fa',
    statusBar: 'light-content' as const,
  },
};

const TABS = ['Basics', 'Themes', 'Actions', 'Promise'] as const;
type Tab = (typeof TABS)[number];

const BasicsTab = ({
  c,
  isDark,
}: {
  c: typeof COLORS.light;
  isDark: boolean;
}) => {
  const { success, error, warning, info } = useToast();
  const theme = isDark ? 'dark' : 'light';

  const items = [
    {
      label: 'Success',
      color: c.success,
      icon: '✓',
      onPress: () => success('Operation Successful', undefined, { theme }),
    },
    {
      label: 'Error',
      color: c.error,
      icon: '✕',
      onPress: () => error('Something went wrong', undefined, { theme }),
    },
    {
      label: 'Warning',
      color: c.warning,
      icon: '⚠',
      onPress: () => warning('Low battery', undefined, { theme }),
    },
    {
      label: 'Info',
      color: c.info,
      icon: 'ℹ',
      onPress: () => info('New update available', undefined, { theme }),
    },
  ];

  return (
    <View style={s.tabContent}>
      <Text style={[s.tabDescription, { color: c.textSecondary }]}>
        Simple pill-shaped toasts for quick notifications.
      </Text>

      <View style={s.grid}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.label}
            style={[
              s.gridCard,
              { backgroundColor: c.surface, borderColor: `${item.color}30` },
            ]}
            onPress={item.onPress}
            activeOpacity={0.7}
          >
            <View style={[s.gridIcon, { backgroundColor: `${item.color}15` }]}>
              <Text style={{ fontSize: 18, color: item.color }}>
                {item.icon}
              </Text>
            </View>
            <Text style={[s.gridLabel, { color: c.text }]}>{item.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <SectionTitle title="With Description" c={c} />
      <DemoButton
        label="Card Layout"
        subtitle="Expands automatically"
        color="#6366f1"
        onPress={() =>
          success(
            'Changes Saved',
            'Your profile has been updated successfully.',
            {
              theme,
              icon: (
                <CheckCircle2 size={18} color="#10b981" strokeWidth={2.5} />
              ),
            }
          )
        }
      />

      <SectionTitle title="Positioning" c={c} />
      <View style={s.row}>
        <DemoButton
          label="↑ Top"
          color="#0ea5e9"
          flex
          onPress={() =>
            info('Top Toast', 'Default position', {
              position: 'top',
              theme,
              style: {
                backgroundColor: '#1477a5ff',
              },
              messageStyle: {
                color: '#ffffff',
              },
              descriptionStyle: {
                color: '#ffffff',
              },
              icon: (
                <ArrowUpToLine size={18} color="#ffffff" strokeWidth={2.5} />
              ),
            })
          }
        />
        <DemoButton
          label="↓ Bottom"
          color="#8b5cf6"
          flex
          onPress={() =>
            info('Bottom Toast', 'Swipe down to dismiss', {
              position: 'bottom',
              theme,
              style: {
                backgroundColor: '#452E7B',
              },
              messageStyle: {
                color: '#ffffff',
              },
              descriptionStyle: {
                color: '#ffffff',
              },
              icon: (
                <ArrowDownToLine size={18} color="#ffffff" strokeWidth={2.5} />
              ),
            })
          }
        />
      </View>
    </View>
  );
};

const ThemesTab = ({
  c,
  isDark,
}: {
  c: typeof COLORS.light;
  isDark: boolean;
}) => {
  const { success, info } = useToast();
  const theme = isDark ? 'dark' : 'light';

  return (
    <View style={s.tabContent}>
      <Text style={[s.tabDescription, { color: c.textSecondary }]}>
        Force a specific theme or let the system decide.
      </Text>

      <DemoButton
        label="🌙  Dark Mode"
        color="#1e293b"
        onPress={() =>
          success('Dark Toast', 'Forced dark theme regardless of system.', {
            theme: 'dark',
            icon: <CheckCircle2 size={18} color="#10b981" strokeWidth={2.5} />,
          })
        }
      />
      <DemoButton
        label="☀️  Light Mode"
        color="#e2e8f0"
        textColor="#1e293b"
        onPress={() =>
          info('Light Toast', 'Forced light theme regardless of system.', {
            theme: 'light',
            icon: <InfoIcon size={18} color="#3b82f6" strokeWidth={2.5} />,
          })
        }
      />
      <DemoButton
        label="🖥  System (Auto)"
        color="#64748b"
        onPress={() =>
          info(
            'System Toast',
            'Automatically adapts to your device settings.',
            { theme }
          )
        }
      />

      <SectionTitle title="Custom Icons" c={c} />
      <View style={s.row}>
        <DemoButton
          label="Emoji 🚀"
          color="#f97316"
          flex
          onPress={() =>
            success('Launched!', undefined, {
              theme,
              icon: <Text style={{ fontSize: 18 }}>🚀</Text>,
            })
          }
        />
        <DemoButton
          label="Lucide ⚡"
          color="#eab308"
          flex
          onPress={() =>
            info('Turbo Mode', undefined, {
              theme,
              icon: <Zap size={18} color="#eab308" fill="#eab308" />,
            })
          }
        />
      </View>
    </View>
  );
};

const ActionsTab = ({
  c,
  isDark,
}: {
  c: typeof COLORS.light;
  isDark: boolean;
}) => {
  const { info, warning, showToast, success } = useToast();
  const theme = isDark ? 'dark' : 'light';

  return (
    <View style={s.tabContent}>
      <Text style={[s.tabDescription, { color: c.textSecondary }]}>
        Add interactive buttons inside toast notifications.
      </Text>

      <DemoButton
        label="Simple Action"
        subtitle="Share button"
        color="#3b82f6"
        onPress={() =>
          info('File Uploaded', 'Your file is ready to be shared.', {
            duration: 6000,
            theme,
            icon: <CloudUpload size={18} color="#3b82f6" strokeWidth={2.5} />,
            action: {
              label: 'Share Now',
              onPress: () => info('Sharing...', '', { duration: 500, theme }),
            },
          })
        }
      />

      <DemoButton
        label="Custom Styled Action"
        subtitle="Branded button style"
        color="#f59e0b"
        onPress={() =>
          warning('Booking Confirmed', 'PNR: EC2QW4 · Check-in in 2h.', {
            icon: <CheckCircle2 size={18} color="#f59e0b" strokeWidth={2.5} />,
            theme,
            action: {
              label: 'View Boarding Pass',
              onPress: () => info('Opening pass...', undefined, { theme }),
              style: { backgroundColor: 'rgba(245, 158, 11, 0.15)' },
              labelStyle: { color: '#b45309', fontWeight: '700' },
            },
          })
        }
      />

      <DemoButton
        label="Bottom + Action"
        subtitle="Combined features"
        color="#8b5cf6"
        onPress={() =>
          showToast({
            message: 'Item Removed',
            description: 'The item was deleted from your list.',
            type: 'error',
            position: 'bottom',
            duration: 5000,
            icon: <XCircle size={18} color="#ef4444" strokeWidth={2.5} />,
            action: {
              label: 'Undo',
              onPress: () =>
                success('Undo action triggered', '', {
                  position: 'bottom',
                  theme,
                }),
            },
          })
        }
      />
    </View>
  );
};

const PromiseTab = ({
  c,
  isDark,
}: {
  c: typeof COLORS.light;
  isDark: boolean;
}) => {
  const { promise, loading, updateToast } = useToast();
  const theme = isDark ? 'dark' : 'light';

  const simulateUpload = () => {
    const task = new Promise<{ name: string }>((resolve, reject) => {
      setTimeout(() => {
        Math.random() > 0.3
          ? resolve({ name: 'photo_2024.jpg' })
          : reject(new Error('Network timeout'));
      }, 2500);
    });

    promise(task, {
      loading: {
        message: 'Uploading file...',
        description: 'Please wait a moment',
      },
      success: (data) => ({
        message: 'Upload Complete!',
        description: `${data.name} is now available.`,
        theme,
      }),
      error: (err) => ({
        message: 'Upload Failed',
        description: err.message,
        theme,
      }),
    });
  };

  const simulateManual = () => {
    const id = loading('Processing payment...', undefined, { theme });
    setTimeout(() => {
      updateToast(id, {
        type: 'success',
        message: 'Payment Received',
        description: '$42.00 confirmed.',
        duration: 3000,
        theme,
      });
    }, 2000);
  };

  return (
    <View style={s.tabContent}>
      <Text style={[s.tabDescription, { color: c.textSecondary }]}>
        Track async operations with automatic state transitions.
      </Text>

      <DemoButton
        label="Run Promise"
        subtitle="Auto loading → success/error"
        color="#6366f1"
        icon={<Loader2 size={16} color="#fff" />}
        onPress={simulateUpload}
      />

      <DemoButton
        label="Manual Loading"
        subtitle="loading() + updateToast()"
        color="#0d9488"
        onPress={simulateManual}
      />

      <View
        style={[
          s.infoBox,
          { backgroundColor: c.infoBg, borderColor: c.infoBorder },
        ]}
      >
        <Text style={[s.infoText, { color: c.infoText }]}>
          💡 The promise method handles loading, success, and error states
          automatically. The toast updates in-place without creating new
          notifications.
        </Text>
      </View>
    </View>
  );
};

const SectionTitle = ({
  title,
  c,
}: {
  title: string;
  c: typeof COLORS.light;
}) => <Text style={[s.sectionTitle, { color: c.textTertiary }]}>{title}</Text>;

interface DemoButtonProps {
  label: string;
  subtitle?: string;
  color: string;
  textColor?: string;
  icon?: React.ReactNode;
  flex?: boolean;
  onPress: () => void;
}

const DemoButton = ({
  label,
  subtitle,
  color,
  textColor,
  icon,
  flex,
  onPress,
}: DemoButtonProps) => (
  <TouchableOpacity
    style={[s.demoButton, { backgroundColor: color }, flex && { flex: 1 }]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={s.demoButtonContent}>
      {icon && <View style={{ marginRight: 8 }}>{icon}</View>}
      <View style={{ flex: 1 }}>
        <Text
          style={[s.demoButtonLabel, textColor ? { color: textColor } : null]}
        >
          {label}
        </Text>
        {subtitle ? (
          <Text
            style={[
              s.demoButtonSub,
              textColor ? { color: textColor, opacity: 0.7 } : null,
            ]}
          >
            {subtitle}
          </Text>
        ) : null}
      </View>
    </View>
  </TouchableOpacity>
);

const HomeScreen = ({
  isDark,
  setIsDark,
}: {
  isDark: boolean;
  setIsDark: (fn: (prev: boolean) => boolean) => void;
}) => {
  const [activeTab, setActiveTab] = useState<Tab>('Basics');
  const c = isDark ? COLORS.dark : COLORS.light;

  const renderTab = () => {
    switch (activeTab) {
      case 'Basics':
        return <BasicsTab c={c} isDark={isDark} />;
      case 'Themes':
        return <ThemesTab c={c} isDark={isDark} />;
      case 'Actions':
        return <ActionsTab c={c} isDark={isDark} />;
      case 'Promise':
        return <PromiseTab c={c} isDark={isDark} />;
    }
  };

  return (
    <View style={[s.screen, { backgroundColor: c.bg }]}>
      <StatusBar barStyle={c.statusBar} backgroundColor={c.bg} />

      <View style={s.header}>
        <View>
          <Text style={[s.title, { color: c.text }]}>🍞 tostadin</Text>
        </View>
        <View style={s.headerRight}>
          <Text style={[s.version, { color: c.textTertiary }]}>v0.0.1</Text>
          <TouchableOpacity
            style={[s.themeToggle, { backgroundColor: c.tabBg }]}
            onPress={() => setIsDark((prev) => !prev)}
            activeOpacity={0.7}
          >
            {isDark ? (
              <Sun size={18} color="#f59e0b" />
            ) : (
              <Moon size={18} color="#6366f1" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View style={s.tabBar}>
        {TABS.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              s.tab,
              { backgroundColor: c.tabBg },
              activeTab === tab && { backgroundColor: c.tabActiveBg },
            ]}
            onPress={() => setActiveTab(tab)}
            activeOpacity={0.7}
          >
            <Text
              style={[
                s.tabLabel,
                { color: c.textSecondary },
                activeTab === tab && { color: c.tabActiveText },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView
        contentContainerStyle={s.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {renderTab()}
      </ScrollView>
    </View>
  );
};

export default function App() {
  const systemScheme = useColorScheme();
  const [isDark, setIsDark] = useState(systemScheme === 'dark');
  const bg = isDark ? COLORS.dark.bg : COLORS.light.bg;

  return (
    <ToastProvider>
      <View style={{ flex: 1, backgroundColor: bg }}>
        <StatusBar
          barStyle={isDark ? 'light-content' : 'dark-content'}
          backgroundColor={bg}
        />
        <SafeAreaView style={{ flex: 1, backgroundColor: bg }}>
          <HomeScreen isDark={isDark} setIsDark={setIsDark} />
        </SafeAreaView>
      </View>
    </ToastProvider>
  );
}

const s = StyleSheet.create({
  screen: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  title: { fontSize: 26, fontWeight: '800' },
  version: { fontSize: 12, fontWeight: '600' },
  themeToggle: {
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 4,
    gap: 6,
  },
  tab: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20 },
  tabLabel: { fontSize: 13, fontWeight: '600' },
  scrollContent: { paddingBottom: 40 },
  tabContent: { padding: 20, gap: 12 },
  tabDescription: { fontSize: 14, lineHeight: 20, marginBottom: 8 },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginTop: 12,
    marginBottom: 4,
  },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  gridCard: {
    width: '47%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  gridIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  gridLabel: { fontSize: 14, fontWeight: '600' },
  row: { flexDirection: 'row', gap: 10 },
  demoButton: {
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  demoButtonContent: { flexDirection: 'row', alignItems: 'center' },
  demoButtonLabel: { color: '#fff', fontSize: 15, fontWeight: '600' },
  demoButtonSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 },
  infoBox: { marginTop: 8, padding: 14, borderRadius: 12, borderWidth: 1 },
  infoText: { fontSize: 13, lineHeight: 19 },
});
