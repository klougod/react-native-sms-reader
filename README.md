# React native plugin to read SMS messages

    This plugin is a fork from [react-native-read-sms](https://github.com/KetanDhopeshwarkar/react-native-read-sms) which is  used to read any new upcoming SMS.
    Supported and tested up to React Native V0.63.3

## Getting started 

`$ npm install react-native-sms-reader --save`

### Mostly automatic installation

To enable `Read SMS` feature you have to add the following code to the `AndroidManifest.xml`:

```java
  <uses-permission android:name="android.permission.RECEIVE_SMS" />
  <uses-permission android:name="android.permission.READ_SMS" />
```

For react-native < V0.59.0
`$ react-native link react-native-sms-reader`

## Basic Function usage example:

```javascript
import React from "react";
import SmsReader from "react-native-sms-reader";

export const ReadSMSComponent: FC = () => {
  const startReadSMS = async () => {
    const hasPermission = await SmsReader.requestReadSMSPermission();
    if (hasPermission) {
      SmsReader.startReadSMS((status, sms, error) => {
        if (status == "success") {
          console.log("Great!! you have received new sms:", sms);
        }
      });
    }
  };

  useEffect(() => {
    startReadSMS();

    return () => SmsReader.stopReadSMS();
  }, []);
};
```

## Basic class component usage example:

```javascript
import React, { Component } from "react";
import SmsReader from "react-native-read-sms";

export default class ReadSMSComponent extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount = () => {
    this.startReadSMS();
  };

  startReadSMS = async () => {
    const hasPermission = await SmsReader.requestReadSMSPermission();
    if (hasPermission) {
      SmsReader.startReadSMS((status, sms, error) => {
        if (status == "success") {
          console.log("Great!! you have received new sms:", sms);
        }
      });
    }
  };

  componentWillUnmount = () => {
    SmsReader.stopReadSMS();
  };
}
```
