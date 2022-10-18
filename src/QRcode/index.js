import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Button,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Camera } from "expo-camera";
import * as Clipboard from "expo-clipboard";
import styles from "./style";
export default function QRCodeReaderScreen() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("Not yet scanned");
  const [urlIsValid, setUrlIsValid] = useState(false);

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
    console.log("Type: " + type + "\nData: " + data);
  };

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(text);
    Alert.alert("Text copied to Clipboard!", text);
  };

  function validURL(str) {
    var pattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
        "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    ); // fragment locator
    return !!pattern.test(str);
  }

  console.log(validURL(text));

  const handleValidUrl = () => {
    if (validURL(text)) {
      Alert.alert("Exit App and open external link?", text, [

        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => Linking.openURL(text),
        },
        
      ]);
    } else {
      Alert.alert("Oh no!", "This is not a valid URL!");
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting for camera permission</Text>
      </View>
    );
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  // Return the View
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: 300,
          width: 300,
          overflow: "hidden",
          borderRadius: 30,
          display: scanned ? "none" : "flex",
        }}
      >
        <Camera
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={{ height: 400, width: 400 }}
        />
      </View>

      {scanned && (
        <View style={styles.contentBox}>
          <View style={styles.textBox}>
            <Text style={styles.maintext}>{text}</Text>
          </View>
          <TouchableOpacity style={styles.button}>
            <Button
              title={"Scan again"}
              onPress={() => setScanned(false)}
              color="tomato"
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Button
              title={"Copy to Clipboard"}
              onPress={copyToClipboard}
              color="#1fae51"
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Button
              title={"Follow url"}
              onPress={handleValidUrl}
              color="#0275d8"
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
