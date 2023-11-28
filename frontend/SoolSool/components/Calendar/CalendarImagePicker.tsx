import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Image,
  Text,
  Pressable,
  Platform,
} from "react-native";
import { Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { postImage } from "../../api/drinkRecordApi";
import { showErrorAndRetry } from "../../utils/showErrorUtils";

const CalendarImagePicker = ({ image, setImage }) => {
  const [initialImage, setInitialImage] = useState(null);
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
      return;
    }
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled) {
      return null;
    }
    console.log("첨부할 이미지를 선택");
    console.log(result.assets[0]);

    const uriParts = result.assets[0].uri.split("/");
    const fileName = uriParts[uriParts.length - 1];
    const uri =
      Platform.OS === "android"
        ? result.assets[0].uri
        : result.assets[0].uri.replace("file://", "");
    const type = `${result.assets[0].type}/${result.assets[0].uri
      .split(".")
      .pop()}`;
    const body: any = new FormData();

    console.log("uri", uri);
    console.log("type", type);
    console.log("name", fileName);
    const file = {
      type: type,
      name: fileName,
      uri: uri,
    };
    body.append("file", file);

    setImage(file);
    setInitialImage(uri);

    // await postImage(day.day, file, token)
    //   .then(() => {
    //     console.log("이미지 업데이트 성공");

    //     setImage(result.assets[0].uri);
    //   })
    //   .catch(() => {
    //     showErrorAndRetry("알림", "잠시 후 다시 시도해주세요");
    //   });
  };

  return (
    <View>
      <Pressable onPress={pickImage} style={styles.imageAttach}>
        <Ionicons name="images-outline" size={24} color="gray" />
        <Text>사진 첨부</Text>
      </Pressable>
      {image && (
        <Image
          source={{ uri: initialImage }}
          style={{
            width: "100%",
            height: 200,
            borderRadius: 5,
            marginBottom: "5%",
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  imageAttach: {
    display: "flex",
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});

export default CalendarImagePicker;
