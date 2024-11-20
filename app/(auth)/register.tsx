import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Keyboard,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../(auth)/authcontext";
import { useNavigation } from "expo-router";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { onRegister } = useAuth();
  
  const nav = useNavigation();

  const register = async () => {
    const result = await onRegister!(username, password);
    if (result && result.error) {
      alert(result.msg);
    } else {
      
      alert("Registration successful!");
        //@ts-ignore
      nav.navigate("(auth)/login");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        onScrollBeginDrag={Keyboard.dismiss}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.container}>
          <Image
            source={require("@/assets/images/v997-05.png")}
            style={styles.Image}
          />

          <View style={styles.InputBorder}>
            <Text style={styles.label}>Username:</Text>
            <TextInput
              style={styles.TextInf}
              placeholder="Enter username"
              value={username}
              onChangeText={setUsername}
            />
            <Text style={styles.label}>Password:</Text>
            <TextInput
              style={styles.TextInf}
              placeholder="Enter password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={true}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TouchableOpacity style={styles.button} onPress={register}>
                <Text>Register</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
               
              >
                <Text>Back to Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    display: "flex",
    flexDirection: "column",
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
    backgroundColor: "white",
    width: "90%",
  },
  Image: {
    height: 300,
    width: 220,
    borderColor: "grey",
  },
  TextInf: {
    borderWidth: 1,
    borderColor: "black",
    height: 40,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
    marginBottom: 15,
    width: "100%",
  },
  label: {
    fontSize: 18,
    marginBottom: 5,
  },
  InputBorder: {
    width: "90%",
    borderWidth: 2,
    borderColor: "blue",
    borderRadius: 8,
    padding: 20,
    marginBottom: 20,
    backgroundColor: "white",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#1DA1F2",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "45%",
  },
});

export default SignUp;
