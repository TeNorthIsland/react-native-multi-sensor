/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  Platform,
  Button,
} from 'react-native';

import { AudioManager as AudioRecorderManagerObject } from 'react-native-rn-android-lib';
import { SoundManager as Sound } from 'react-native-rn-android-lib';
const { AudioRecorder, AudioUtils } = AudioRecorderManagerObject;

class AudioExample extends Component<any, any> {
  state = {
    currentTime: 0.0,
    recording: false,
    paused: false,
    stoppedRecording: false,
    finished: false,
    // @ts-ignore 控制收录路径
    audioPath: `/storage/emulated/0/Download/skr/${new Date().getTime()}.mp3`,
    hasPermission: undefined,
  };
  // @ts-ignore
  prepareRecordingPath(audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: 'Low',
      AudioEncoding: 'aac',
      AudioEncodingBitRate: 32000,
    });
  }

  componentDidMount() {
    // @ts-ignore
    AudioRecorder.requestAuthorization().then((isAuthorised) => {
      this.setState({ hasPermission: isAuthorised });

      if (!isAuthorised) return;

      this.prepareRecordingPath(this.state.audioPath);

      // @ts-ignore
      AudioRecorder.onProgress = (data) => {
        this.setState({ currentTime: Math.floor(data.currentTime) });
      };

      // @ts-ignore
      AudioRecorder.onFinished = (data) => {
        // Android callback comes in the form of a promise instead.
        if (Platform.OS === 'ios') {
          this._finishRecording(
            data.status === 'OK',
            data.audioFileURL,
            data.audioFileSize
          );
        }
      };
    });
  }

  // @ts-ignore
  _renderButton(title, onPress?, active?) {
    var style = active ? styles.activeButtonText : styles.buttonText;

    return (
      <TouchableHighlight style={styles.button} onPress={onPress}>
        <Text style={style}>{title}</Text>
      </TouchableHighlight>
    );
  }

  // @ts-ignore
  _renderPauseButton(onPress, active?) {
    var style = active ? styles.activeButtonText : styles.buttonText;
    var title = this.state.paused ? 'RESUME' : 'PAUSE';
    return (
      <TouchableHighlight style={styles.button} onPress={onPress}>
        <Text style={style}>{title}</Text>
      </TouchableHighlight>
    );
  }

  async _pause() {
    if (!this.state.recording) {
      console.warn("Can't pause, not recording!");
      return;
    }

    try {
      const filePath = await AudioRecorder.pauseRecording();
      this.setState({ paused: true });
    } catch (error) {
      console.error(error);
    }
  }

  async _resume() {
    if (!this.state.paused) {
      console.warn("Can't resume, not paused!");
      return;
    }

    try {
      await AudioRecorder.resumeRecording();
      this.setState({ paused: false });
    } catch (error) {
      console.error(error);
    }
  }

  async _stop() {
    if (!this.state.recording) {
      console.warn("Can't stop, not recording!");
      return;
    }

    this.setState({ stoppedRecording: true, recording: false, paused: false });

    try {
      const filePath = await AudioRecorder.stopRecording();

      // 直接存储入库 到指定文件夹
      console.log('filePath', filePath);

      if (Platform.OS === 'android') {
        // @ts-ignore
        this._finishRecording(true, filePath);
      }
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }

  async _play() {
    if (this.state.recording) {
      await this._stop();
    }

    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      // @ts-ignore
      var sound = new Sound(this.state.audioPath, '', (error) => {
        if (error) {
          console.log('failed to load the sound', error);
        }
      });

      setTimeout(() => {
        // @ts-ignore
        sound.play((success) => {
          if (success) {
            console.log('successfully finished playing');
          } else {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }, 100);
    }, 100);
  }

  async _record() {
    if (this.state.recording) {
      console.warn('Already recording!');
      return;
    }

    if (!this.state.hasPermission) {
      console.warn("Can't record, no permission granted!");
      return;
    }

    if (this.state.stoppedRecording) {
      this.prepareRecordingPath(this.state.audioPath);
    }

    this.setState({ recording: true, paused: false });

    try {
      const filePath = await AudioRecorder.startRecording();
    } catch (error) {
      console.error(error);
    }
  }

  // @ts-ignore
  _finishRecording(didSucceed, filePath, fileSize) {
    this.setState({ finished: didSucceed });
    console.log(
      `Finished recording of duration ${
        this.state.currentTime
      } seconds at path: ${filePath} and size of ${fileSize || 0} bytes`
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.controls}>
          {this._renderButton(
            'RECORD',
            () => {
              this._record();
            },
            this.state.recording
          )}
          {this._renderButton('PLAY', () => {
            this._play();
          })}
          {this._renderButton('STOP', () => {
            this._stop();
          })}
          {this._renderPauseButton(() => {
            this.state.paused ? this._resume() : this._pause();
          })}
          <Text style={styles.progressText}>{this.state.currentTime}</Text>
        </View>
        <Button onPress={() => this.props.changeView('list')} title="返回" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#bae7ff',
    width: '100%',
  },
  controls: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  progressText: {
    paddingTop: 50,
    fontSize: 50,
    color: '#fff',
  },
  button: {
    padding: 20,
  },
  disabledButtonText: {
    color: '#eee',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  activeButtonText: {
    fontSize: 20,
    color: '#B81F00',
  },
});

export default AudioExample;
