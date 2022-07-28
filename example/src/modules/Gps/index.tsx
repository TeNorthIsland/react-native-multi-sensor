import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, ToastAndroid } from 'react-native';
import { Button, Dialog } from '@rneui/base';

// 请求定位权限
import { PermissionManager, Geolocation } from 'react-native-rn-android-lib';
const { check, PERMISSIONS, RESULTS, request, openSettings } =
  PermissionManager;

// 获取位置方法

const GPS = () => {
  const [loading, setLoading] = useState(false);
  const [position, setPosition] = useState({
    coords: {
      accuracy: null,
      altitude: null,
      heading: null,
      latitude: 0,
      longitude: 0,
      speed: null,
    },
  });

  // 获取定位权限
  const getPosition = async () => {
    const value = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);

    if (value === RESULTS.GRANTED) {
      ToastAndroid.show('权限已经获取', 800);

      return true;
    }

    if (value === RESULTS.UNAVAILABLE) {
      Alert.alert(
        '权限请求',
        '你的设备没有开启权限请去设置开启',
        [
          {
            text: '取消',
            style: 'cancel',
          },
          {
            text: '前往',
            onPress: () => {
              openSettings().catch(() => {
                console.warn('自动开启失败请手动前往设置页面');
              });
            },
            style: 'default',
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {},
        }
      );
      return false;
    }

    if (value === RESULTS.DENIED) {
      const value2 = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      if (value2 === RESULTS.GRANTED) {
        ToastAndroid.show('权限已经获取', 800);
        return true;
      }

      Alert.alert(
        '权限请求',
        '你的设备没有开启权限请去设置开启',
        [
          {
            text: '取消',
            style: 'cancel',
          },
          {
            text: '前往',
            onPress: () => {
              openSettings().catch(() => {
                console.warn('自动开启失败请手动前往设置页面');
              });
            },
            style: 'default',
          },
        ],
        {
          cancelable: true,
          onDismiss: () => {},
        }
      );
      return false;
    }
  };

  // 开始获取GPS定位
  const getPositionWithGPS = async () => {
    // 权限判断
    const value = await getPosition();
    if (!value) return;

    // 开始获取位置
    setLoading(true);
    Geolocation.getCurrentPosition(
      (info: any) => {
        setPosition(info);
        setLoading(false);
      },
      (error: any) => {
        console.log(error);
        setLoading(false);
      }
    );

    //@ts-ignore
  };

  return (
    <View style={styles.container}>
      <View style={styles.item}>
        <Button onPress={getPositionWithGPS}>获取当前位置</Button>
      </View>

      <View style={{ ...styles.item, ...styles.details }}>
        <Text style={styles.titleText}>当前位置详情: </Text>
        {loading ? (
          <Dialog.Loading />
        ) : (
          <View style={styles.detailsContainer}>
            <View style={styles.detailsContainerItem}>
              <Text style={styles.itemText}>准确度:</Text>
              <Text style={styles.itemText}>{position.coords.accuracy}</Text>
            </View>
            <View style={styles.detailsContainerItem}>
              <Text style={styles.itemText}>海拔:</Text>
              <Text style={styles.itemText}>{position.coords.altitude}</Text>
            </View>
            <View style={styles.detailsContainerItem}>
              <Text style={styles.itemText}>纬度:</Text>
              <Text style={styles.itemText}>
                {position.coords.latitude.toFixed(6)}
              </Text>
            </View>
            <View style={styles.detailsContainerItem}>
              <Text style={styles.itemText}>经度:</Text>
              <Text style={styles.itemText}>
                {position.coords.longitude.toFixed(6)}
              </Text>
            </View>
            <View style={styles.detailsContainerItem}>
              <Text style={styles.itemText}>速度:</Text>
              <Text style={styles.itemText}>{position.coords.speed}</Text>
            </View>
          </View>
        )}
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
  item: {
    height: 50,
    width: '100%',
    marginBottom: 20,
  },
  itemButton: {
    width: 20,
  },
  details: {
    backgroundColor: '#40a9ff',
    height: 300,
    padding: 8,
  },
  titleText: {
    fontSize: 24,
  },
  detailsContainer: {
    padding: 8,
    marginLeft: 24,
    marginTop: 18,
  },
  itemText: {
    fontSize: 18,
    marginBottom: 8,
  },
  detailsContainerItem: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 200,
  },
});

export default GPS;
