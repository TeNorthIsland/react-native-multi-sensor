/* eslint-disable react-native/no-inline-styles */
// @ts-ignore
import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { CameraManager as RNCamera } from 'react-native-rn-android-lib';
// import { RNCamera } from 'react-native-camera';

const Camera = () => {
  const cameraRef = useRef<any>(null);
  const [showList, setShowList] = useState('camer');
  // 实现录像
  const recordVideo = async () => {
    const options = {
      quality: 0.5,
      path: `/storage/emulated/0/Download/${new Date().getTime()}.mp4`,
    };

    // 直接存本地文件中去了 /storage/emulated/0/  为 Android 设备的实际路径
    const data = await cameraRef.current.recordAsync(options);
    console.log(data.uri);
  };

  // 结束录像
  const stopRecord = () => {
    cameraRef.current.stopRecording();
    console.log('camer');
  };

  //  查看指定目录下的视频
  const changeView = (value: 'camer' | 'list') => {
    if (value === 'camer' && showList === 'list') {
      setShowList(value);
      return;
    }
    setShowList(value);
  };

  return (
    <View style={styles.container}>
      <RNCamera ref={cameraRef} style={styles.rnCamera} />
      {/* {showList === 'camer' ? (
        <RNCamera ref={cameraRef} style={styles.rnCamera} />
      ) : (
        <VideoList />
      )} */}

      <Button onPress={recordVideo} title="开始录制" />
      <Button onPress={stopRecord} title="结束录制" />
      <Button onPress={() => changeView('list')} title="查看视频列表" />
      <Button onPress={() => changeView('camer')} title="查看录制功能" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  rnCamera: {
    width: 400,
    height: 400,
  },
});

export default Camera;
