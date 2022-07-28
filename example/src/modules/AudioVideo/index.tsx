import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from '@rneui/base';

// 测试一下如何使用

const AudioVideo: React.FC<any> = () => {
  // 请求权限 视频

  // 请求权限 音频

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.btn1}>
          <Button>录制音频</Button>
        </View>

        <View style={styles.btn2}>
          <Button>录制视频</Button>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.contentItem}>
          <View style={styles.fristP}>
            <Text>视频第一帧</Text>
          </View>
          <View style={styles.log}>
            <Text>视频长度</Text>
          </View>
          <View style={styles.paly}>
            <Text>播放</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
    padding: 20,
  },
  headerContainer: {},
  btn1: {},
  btn2: {},
  content: {},
  contentItem: {},
  fristP: {},
  log: {},
  paly: {},
});

export default AudioVideo;
