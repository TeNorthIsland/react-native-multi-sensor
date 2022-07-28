package com.reactnativernandroidlib;
import android.widget.Toast;

import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.module.annotations.ReactModule;
import com.facebook.react.bridge.Callback;
import com.facebook.react.uimanager.IllegalViewOperationException;
import com.facebook.react.uimanager.PixelUtil;
import com.facebook.react.bridge.Promise;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.Arguments;

import java.util.Map;
import java.util.HashMap;

@ReactModule(name = ToastModule.NAME)
public class ToastModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  public static final String NAME = "ToastExample";
  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";

  public ToastModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

//  按照要求实现
  @Override
  public String getName() {
    return NAME;
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
    constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
    return constants;
  }

  //  show 功能
  @ReactMethod
  public void show(String message, int duration) {
    Toast.makeText(getReactApplicationContext(), message, duration).show();
  }

  //  传值给RN  rn => callback 方式
  @ReactMethod
  public void measureLayout(
    int tag,
    int ancestorTag,
    Callback errorCallback,
    Callback successCallback) {
    try {
      successCallback.invoke(tag, ancestorTag, 2, 3);
    } catch (IllegalViewOperationException e) {
      errorCallback.invoke(e.getMessage());
    }
  }

  //  传值给RN 通过 promises 方式
  @ReactMethod
  public void measureLayoutPromise(
    int tag,
    int ancestorTag,
    Promise promise){
    try {
      WritableMap map = Arguments.createMap();

      map.putDouble("relativeX", tag);
      map.putDouble("relativeY", ancestorTag);
      map.putDouble("width", 3);
      map.putDouble("height", 4);

      promise.resolve(map);
    } catch (IllegalViewOperationException e) {
      promise.reject("333", e);
    }
  }

  // 事件发送值 给RN
  private void sendEvent(ReactContext reactContext,
                         String eventName,
                         @Nullable WritableMap params) {
    reactContext
      .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
      .emit(eventName, params);
  }

  @ReactMethod
  public void addListener(String eventName) {
    // Set up any upstream listeners or background tasks as necessary
  }

  @ReactMethod
  public void removeListeners(Integer count) {
    // Remove upstream listeners, stop unnecessary background tasks
  }

  @ReactMethod
  public void getEvnet() {
    // 手动触发
    WritableMap params = Arguments.createMap();
    params.putString("eventProperty", "someValue");
    sendEvent(reactContext, "EventReminder", params);
  }

}
