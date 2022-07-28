import React from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import { View, Button } from 'react-native';
import { VideoManager as Video } from 'react-native-rn-android-lib';

const VideoList = () => {
  const videoRef = useRef<any>(null);
  const [videoControl, setVideoControl] = useState({
    paused: true, // 暂停
  });

  // 播放视频
  const playerVideo = () => {
    // console.log(2333);
    setVideoControl({ paused: false });
  };

  // 缓存监听
  const onBuffer = () => {};

  // 错误监听
  const videoError = () => {};

  return (
    <View
      style={{
        height: 200,
        marginBottom: 20,
      }}
    >
      <Button onPress={playerVideo} title="播放" />
      <View
        style={{
          width: 300,
          height: 300,
        }}
      >
        <Video
          {...videoControl}
          source={{
            uri: 'http://vfx.mtime.cn/Video/2019/03/19/mp4/190319212559089721.mp4',
            // uri: '/storage/emulated/0/Download/1659019291258.mp4',
            // 绝对路径,
          }}
          onBuffer={onBuffer}
          onError={videoError}
          ref={videoRef}
          style={{
            width: 300,
            height: 300,
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        />
      </View>
    </View>
  );
};

export default VideoList;
