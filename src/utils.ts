import { NativeModules } from 'react-native';

if (!NativeModules.RnAndroidLib) {
  throw new Error('native模块加载失败');
}

// 震动
const vibrator = async (): Promise<void> => {
  return NativeModules.RnAndroidLib.vibrator();
};

// 创建路径
const createDir = async (filePath: string): Promise<string> => {
  return NativeModules.RnAndroidLib.createDir(filePath);
};

// 返回路径下的文件list
const getFilesAllName = async (filePath: string): Promise<Array<string>> => {
  return NativeModules.RnAndroidLib.getFilesAllName(filePath);
};

const UtilsManager = {
  vibrator,
  createDir,
  getFilesAllName,
};

export default UtilsManager;
