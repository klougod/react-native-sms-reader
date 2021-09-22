import { NativeEventEmitter, NativeModules, PermissionsAndroid } from "react-native";

import {
  IS_ANDROID,
  PERMISSION_GRANTED,
  PLATFORM_VERSION,
  READ_SMS_PERMISSION,
  RECEIVE_SMS_PERMISSION,
} from "src/constants";
import type { StartReadSMS } from "./SmsReader.types";

const hasSmsPermissions = async () => {
  if (IS_ANDROID && PLATFORM_VERSION < 23) return true;

  const currentPermissions = await Promise.all([
    PermissionsAndroid.check(RECEIVE_SMS_PERMISSION),
    PermissionsAndroid.check(READ_SMS_PERMISSION),
  ]);

  return currentPermissions.every(permission => permission === true);
};

export const startReadSMS: StartReadSMS = async (callback) => {
  if (!callback) return;

  if (!IS_ANDROID) return callback("error", "", "ReadSms Plugin is only for android platform");

  const hasPermission = await hasSmsPermissions();

  if (!hasPermission) return callback("error", "", "Required RECEIVE_SMS and READ_SMS permission");

  NativeModules.ReadSms.startReadSMS(() => {
      new NativeEventEmitter(NativeModules.ReadSms).addListener(
        "received_sms",
        (sms: string) => callback("success", sms, '')
      );
    },
    (error: string) => callback("error", "", error)
  );
}

export const requestReadSMSPermission = async () =>  {
  const hasPermission = await hasSmsPermissions();

  if (!IS_ANDROID || hasPermission) return true;

  const status = Object.values(
    await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      PermissionsAndroid.PERMISSIONS.READ_SMS,
    ])
  );

  return status.every((status) => status === PERMISSION_GRANTED);
}

export const stopReadSMS = () =>{
  if (!IS_ANDROID) return;

  NativeModules.ReadSms.stopReadSMS();
}
