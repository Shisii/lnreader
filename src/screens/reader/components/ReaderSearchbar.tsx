import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';

import { IconButtonV2 } from '@components';
import { ThemeColors } from '@theme/types';

interface ReaderSearchbarProps {
  theme: ThemeColors;
  onClose: () => void;
}

const ReaderSearchbar = ({ theme, onClose }: ReaderSearchbarProps) => {
  const inputRef = useRef<TextInput>(null);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const frame = requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      cancelAnimationFrame(frame);
      Keyboard.dismiss();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.searchbar,
          { backgroundColor: theme.surface2 || theme.surface },
        ]}
      >
        <IconButtonV2
          name="magnify"
          color={theme.onSurfaceVariant}
          onPress={() => inputRef.current?.focus()}
          padding={6}
          theme={theme}
          style={styles.searchIcon}
        />
        <TextInput
          ref={inputRef}
          autoCapitalize="none"
          autoCorrect={false}
          onChangeText={setSearchText}
          placeholder="Search chapter"
          placeholderTextColor={theme.onSurfaceVariant}
          returnKeyType="search"
          selectionColor={theme.primary}
          style={[styles.input, { color: theme.onSurface }]}
          submitBehavior="submit"
          value={searchText}
        />
      </View>
    </View>
  );
};

export default ReaderSearchbar;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
    minHeight: 44,
    paddingVertical: 0,
  },
  searchIcon: {
    marginLeft: 8,
  },
  searchbar: {
    alignItems: 'center',
    borderRadius: 24,
    flexDirection: 'row',
    minHeight: 48,
    overflow: 'hidden',
  },
});
