import { StyleSheet, Pressable, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";

function ProfileImagePicker({ imageURL, newImageURL, setNewImageURL }) {
  const [image, setImage] = useState(imageURL);

  const handleEditImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setNewImageURL(result.assets[0].uri);
    }
  };
  useEffect(() => {
    // console.log("뭐야ㅏㅏㅏㅏㅏㅏㅏ", newImageURL);
  }, [image]);
  return (
    <Pressable onPress={handleEditImage}>
      <Image source={{ uri: image }} style={styles.profileImage} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 500,
    borderWidth: 2,
    borderColor: "black",
    marginRight: "auto",
    marginLeft: "auto",
  },
});

export default ProfileImagePicker;
