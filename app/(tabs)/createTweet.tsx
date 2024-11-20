import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Text,
  ScrollView,
  TextInput,
  Button,
  Keyboard,
  TouchableOpacity,
} from "react-native";

import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import React from "react";
const TabThreeScreen = () => {
  const [user, setUser] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");
  const pickimage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };
  const handleClick = async () => {
    try {
      await axios.post(
        "https://d2b0-92-253-123-200.ngrok-free.app/api/Tweets",
        { userId: user, content: content, image: image }
      );
      setUser("");
      setImage("");
      setContent("");
    } catch (error) {
      console.error("Error posting tweet:", error);
    }
  };
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        onScrollBeginDrag={Keyboard.dismiss}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.center}>
          <Text style={styles.Title}>Add Your Tweet:</Text>
          <Text style={styles.label}> What user:</Text>
          <TextInput
            style={styles.TextInf}
            placeholder="which user are you "
            value={user}
            onChangeText={setUser}
          ></TextInput>
          <Text style={styles.label}> your content:</Text>
          <TextInput
            style={styles.TextInf}
            placeholder="write your tweet content here"
            value={content}
            onChangeText={setContent}
          ></TextInput>
          <Text style={styles.label}> image url:</Text>
          <TouchableOpacity style={styles.button} onPress={pickimage}>
            <Text>Select Image</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={handleClick}>
            <Text>Create Post</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  Title: {
    justifyContent: "center",
    fontSize: 25,
    alignContent: "center",
    color: "#1DA1F2",
    marginBottom: 30,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1DA1F2",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    marginBottom: 20,
    alignContent: "center",
    alignItems: "center",
    marginTop: 200,
  },
  TextInf: {
    borderWidth: 1,
    borderColor: "black",
    height: 35,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 15,
    width: "90%",
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
    width: 200,
    borderRadius: 5,
    marginTop: 25,
  },

  container: {
    flex: 1,
    color: "#808080",
    justifyContent: "center",
    marginHorizontal: "auto",
    flexDirection: "column",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "white",
    backgroundColor: "white",
    width: "90%",
  },
});
export default TabThreeScreen;
