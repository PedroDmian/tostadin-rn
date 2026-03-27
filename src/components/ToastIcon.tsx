import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { toastIconStyles } from './ToastIcon.styles';

interface DefaultStatusDotProps {
  color: string;
}

/**
 * Fallback icon: a stylized dot.
 * ! Used when the user does not provide a custom icon.
 */
export const DefaultStatusDot: React.FC<DefaultStatusDotProps> = ({
  color,
}) => (
  <View style={[toastIconStyles.dot, { backgroundColor: color }]}>
    <View style={toastIconStyles.dotInner} />
  </View>
);

/**
 * ! Loading indicator for the "loading" state.
 */
export const LoadingIndicator: React.FC<{ color: string }> = ({ color }) => (
  <ActivityIndicator size="small" color={color} />
);
