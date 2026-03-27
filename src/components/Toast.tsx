import React, { useEffect, useRef } from 'react';
import {
  Text,
  View,
  Animated,
  Easing,
  TouchableOpacity,
  useColorScheme,
  PanResponder,
} from 'react-native';

import type { ToastProps } from '../types';
import { ANIMATION } from '../constants';
import {
  resolveTheme,
  getThemeColors,
  getPositionConfig,
  shouldDismiss,
} from '../utils';
import { DefaultStatusDot, LoadingIndicator } from './ToastIcon';
import {
  COLOR_ACTION_DARK,
  COLOR_ACTION_LIGHT,
  toastStyles as styles,
} from './Toast.styles';

export const Toast: React.FC<ToastProps> = ({
  id,
  message,
  description,
  type = 'info',
  duration = 3000,
  theme = 'system',
  position = 'top',
  action,
  icon,
  style: customStyle,
  messageStyle,
  descriptionStyle,
  onHide,
  offset = 0,
  onHeightChange,
}) => {
  const isTop = position === 'top';
  const posConfig = React.useMemo(
    () => getPositionConfig(position),
    [position]
  );

  const targetEnd = isTop ? posConfig.endY + offset : posConfig.endY - offset;
  const targetEndRef = useRef(targetEnd);
  targetEndRef.current = targetEnd;

  const translateY = useRef(new Animated.Value(posConfig.startY)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const systemColorScheme = useColorScheme();
  const activeTheme = resolveTheme(theme, systemColorScheme);
  const isDark = activeTheme === 'dark';
  const { backgroundColor, textColor, descColor, borderColor, typeColor } =
    getThemeColors(isDark, type);

  // ** Animations
  const hide = React.useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    Animated.parallel([
      Animated.timing(translateY, {
        toValue: posConfig.hideY,
        duration: ANIMATION.HIDE_DURATION,
        useNativeDriver: true,
        easing: Easing.in(Easing.ease),
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: ANIMATION.FADE_DURATION,
        useNativeDriver: true,
      }),
    ]).start(() => onHide(id));
  }, [id, onHide, opacity, posConfig.hideY, translateY]);

  const startTimer = React.useCallback(() => {
    if (duration > 0 && type !== 'loading') {
      timerRef.current = setTimeout(hide, duration);
    }
  }, [duration, hide, type]);

  const clearTimer = React.useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);

      timerRef.current = null;
    }
  }, []);

  // ** Gestures
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => clearTimer(),
      onPanResponderMove: (_, gestureState) => {
        const newY = targetEndRef.current + gestureState.dy;

        if (isTop ? newY < 80 : newY > -100) {
          translateY.setValue(newY);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (
          shouldDismiss(position, gestureState.dy, posConfig.swipeThreshold)
        ) {
          hide();
        } else {
          Animated.spring(translateY, {
            toValue: targetEndRef.current,
            useNativeDriver: true,
            friction: ANIMATION.FRICTION,
            tension: ANIMATION.TENSION,
          }).start();

          startTimer();
        }
      },
      onPanResponderTerminate: () => {
        Animated.spring(translateY, {
          toValue: targetEndRef.current,
          useNativeDriver: true,
        }).start();

        startTimer();
      },
    })
  ).current;

  useEffect(() => {
    clearTimer();
    startTimer();
    return () => clearTimer();
  }, [clearTimer, startTimer]);

  useEffect(() => {
    Animated.parallel([
      Animated.spring(translateY, {
        toValue: targetEnd,
        friction: ANIMATION.FRICTION,
        tension: ANIMATION.TENSION,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: ANIMATION.FADE_DURATION,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacity, targetEnd, translateY]);

  const hasExtra = !!description || !!action;

  const renderIcon = () => {
    if (icon) return icon;
    if (type === 'loading') return <LoadingIndicator color={typeColor} />;
    return <DefaultStatusDot color={typeColor} />;
  };

  const handleLayout = React.useCallback(
    (e: any) => {
      const h = e.nativeEvent.layout.height;
      onHeightChange?.(id, h);
    },
    [id, onHeightChange]
  );

  return (
    <Animated.View
      {...panResponder.panHandlers}
      style={[
        styles.container,
        isTop ? { top: 0 } : { bottom: 0 },
        { transform: [{ translateY }], opacity },
      ]}
    >
      <View
        onLayout={handleLayout}
        style={[
          styles.card,
          { backgroundColor, borderColor, borderWidth: 1 },
          hasExtra ? styles.cardExpanded : styles.cardPill,
          customStyle,
        ]}
      >
        <View style={styles.header}>
          <View
            style={[styles.iconWrapper, { backgroundColor: `${typeColor}15` }]}
          >
            {renderIcon()}
          </View>
          <View style={styles.textContainer}>
            <Text
              style={[styles.message, { color: textColor }, messageStyle]}
              numberOfLines={1}
            >
              {message}
            </Text>

            {description && (
              <Text
                style={[
                  styles.description,
                  { color: descColor },
                  descriptionStyle,
                ]}
              >
                {description}
              </Text>
            )}
          </View>
        </View>

        {action ? (
          <TouchableOpacity
            style={[
              styles.actionButton,
              {
                backgroundColor: isDark
                  ? COLOR_ACTION_DARK
                  : COLOR_ACTION_LIGHT,
              },
              action.style,
            ]}
            onPress={() => {
              action.onPress();
              hide();
            }}
          >
            <Text
              style={[
                styles.actionLabel,
                { color: typeColor },
                action.labelStyle,
              ]}
            >
              {action.label}
            </Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </Animated.View>
  );
};
