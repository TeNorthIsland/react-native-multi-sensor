import * as React from 'react';

import { StyleSheet, View, Text, Button } from 'react-native';
import { UtilsManager } from 'react-native-rn-android-lib';
const { createDir, getFilesAllName, vibrator } = UtilsManager;

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Resul </Text>
      <Button
        onPress={() => {
          createDir('/storage/emulated/0/Download/skr');
        }}
        title="创建路径"
      />
      <Button
        onPress={() => {
          getFilesAllName('/storage/emulated/0/Download')
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
        title="获取路径下的文件"
      />
      <Button
        onPress={() => {
          vibrator();
        }}
        title="震动"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
