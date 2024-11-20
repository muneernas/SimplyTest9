import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from "react-native";
import Tweet from "@/components/Tweet";
import { TweetType } from "@/types/explore";
import axios from "axios";
import React from "react";
import { useAuth } from "../(auth)/authcontext";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "expo-router";
import { UseTweetDispatch, UseTweetSelector } from "../hooks";
import { addTweet } from "../features/tweets/tweet-slice";
export default function TabTwoScreen() {
  // const [tweets, setTweets] = useState<TweetType[]>([]);
  const dispatch = UseTweetDispatch();
 
  const tweets = UseTweetSelector((state: { tweets: stateModel }) => state.tweets).tweets;

  const [loading, setLoadding] = useState(true);
  const [error, setError] = useState(null);
  const { onLogout } = useAuth();
  const navigation = useNavigation();
11q a
  useEffect(() => {});

  useEffect(() => {
    const fetchTweets = async () => {
      try {
        await axios
          .get("https://4541-92-253-123-200.ngrok-free.app/api/Tweets/")
          .then(async (response) => {
            dispatch(addTweet(response.data));
          })
          .catch((error) => {
            console.log("errorrr: ", error);
          });
      } catch (error: any) {
        setError(error.message);
        console.log("sad", error);
      } finally {
        setLoadding(false);
      }
    };
    fetchTweets();
  }, [dispatch]);
  console.log(tweets, "my tweeeeeeeeeeeeeeeeets");

  const handleLogout = async () => {
    onLogout && (await onLogout());
    //@ts-ignore
    navigation.navigate("(auth)/login");
  };
  const sendXmlHttpRequest = (url: string) => {
    const xhr = new XMLHttpRequest();
    return new Promise((resolve, reject) => {
      xhr.onreadystatechange = (e) => {
        if (xhr.readyState !== 4) {
          return;
        }

        if (xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        } else {
          reject("Request Failed");
        }
      };
      xhr.open("GET", url);
      xhr.send();
    });
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.center}>
        <Text>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.page}>
      <View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.page}>
        <FlatList
          data={tweets}
          renderItem={({ item }) => <Tweet tweet={item} />}
          keyExtractor={(item: TweetType) => item.id?.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: "white",
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoutButton: {
    padding: 10,
  },
});
