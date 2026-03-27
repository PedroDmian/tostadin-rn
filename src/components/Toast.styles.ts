import { StyleSheet, Dimensions } from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export const COLOR_ACTION_LIGHT = 'rgba(0, 0, 0, 0.05)';
export const COLOR_ACTION_DARK = 'rgba(255, 255, 255, 0.1)';

export const toastStyles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
  },
  card: {
    padding: 6,
    maxWidth: SCREEN_WIDTH * 0.9,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 10,
    overflow: 'hidden',
  },
  cardPill: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
    borderRadius: 100,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  cardExpanded: {
    borderRadius: 24,
    padding: 16,
    width: SCREEN_WIDTH * 0.85,
  },
  header: {
    flexDirection: 'row' as const,
    alignItems: 'center' as const,
  },
  iconWrapper: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center' as const,
    alignItems: 'center' as const,
    marginRight: 12,
    overflow: 'hidden' as const,
  },
  textContainer: {
    justifyContent: 'center' as const,
  },
  message: {
    fontSize: 15,
    fontWeight: '700' as const,
  },
  description: {
    fontSize: 13,
    marginTop: 2,
    lineHeight: 18,
  },
  actionButton: {
    marginTop: 12,
    paddingVertical: 10,
    borderRadius: 12,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
});
