import { COLORS } from '@/src/constants';
import { Icon } from '@/src/ui/widgets/global/components/icon';
import React, { createContext, useContext, useState, useCallback, type PropsWithChildren } from 'react';
import { View, Text, Pressable, SafeAreaView } from 'react-native';
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated';

type ToastType = 'success' | 'error' | 'warning' | 'info';

type ToastConfig = {
  id: number;
  message: string;
  type: ToastType;
  title: string;
};

type ToastContextType = {
  show: (message: string, type?: ToastType) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

const ToastComponent = ({ config }: { config: ToastConfig }) => {
  const TYPE_STYLES = {
    success: { bg: 'bg-primary-500/80', icon: 'circle-check', iconColor: 'primary' },
    error: { bg: 'bg-danger-500/20', icon: 'danger', iconColor: 'danger' },
    warning: { bg: 'bg-warning-500/20', icon: 'warning', iconColor: 'warning' },
    info: { bg: 'bg-neutral-500/20', icon: 'info', iconColor: 'neutral' },
  };

  const styles = TYPE_STYLES[config.type];

  return (
    <Animated.View entering={FadeInUp} exiting={FadeOutUp}>
      <View
        className={`m-2 p-4 rounded-xl shadow-lg flex-row items-center ${styles.bg}`}
        style={{ backgroundColor: COLORS.dark.surface }} 
      >
        <Icon name={styles.icon as any} size={24} color={styles.iconColor} />
        <View className="flex-1 ml-3">
          <Text className="font-bold text-accent-500">{config.title}</Text>
          <Text className="text-neutral-500">{config.message}</Text>
        </View>
      </View>
    </Animated.View>
  );
};

export const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<ToastConfig[]>([]);

  const show = useCallback((message: string, type: ToastType = 'error') => {
    const TITLES = { success: "Sucesso", error: "Erro", warning: "Aviso", info: "Informação" };
    const newToast = { id: Date.now() + Math.random(), message, type, title: TITLES[type] };

    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== newToast.id));
    }, 4000);
  }, []);

  return (
    <ToastContext.Provider value={{ show }}>
      {children}
      <SafeAreaView style={{ position: 'absolute', top: 20, left: 0, right: 0, zIndex: 9999 }}>
        {toasts.map((toast) => (
          <ToastComponent key={toast.id} config={toast} />
        ))}
      </SafeAreaView>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
