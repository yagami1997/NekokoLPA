import {Text, View} from "react-native-ui-lib";
import React from "react";
import {RemoteError} from "@/native/types";

export default function RemoteErrorView({ remoteError }: { remoteError?: RemoteError }) {

  if (!remoteError) return null;

  return (
    <View flex style={{ gap: 5 }}>
      <Text center text70>
        Status: {remoteError.status}
      </Text>
      <Text center text70>
        {remoteError.message}
      </Text>
      <Text center text80>
        Reason: {remoteError.reasonCode}
      </Text>
      <Text center text80>
        Subject: {remoteError.subjectCode}
      </Text>
    </View>
  )
}