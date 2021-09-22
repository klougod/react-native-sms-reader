import { PermissionsAndroid, Platform } from "react-native"

export const PLATFORM_OS = Platform.OS;
export const PLATFORM_VERSION = Platform.Version;
export const READ_SMS_PERMISSION = PermissionsAndroid.PERMISSIONS.READ_SMS;
export const RECEIVE_SMS_PERMISSION = PermissionsAndroid.PERMISSIONS.RECEIVE_SMS;
export const PERMISSION_GRANTED = PermissionsAndroid.RESULTS.GRANTED;
export const IS_ANDROID = PLATFORM_OS === 'android';