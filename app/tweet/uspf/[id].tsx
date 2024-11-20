import Tweet from "@/components/Tweet";
import { TweetType, User } from "@/types/explore";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
export default function UserProfile() {
  const { id: userid } = useLocalSearchParams();
  const searchParams = useLocalSearchParams();
  const [user, setUser] = useState<User>();
  const [tweets, setTweets] = useState<TweetType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log(userid, "12312");

  useEffect(() => {
    const fetchUserDetailsAndTweets = async () => {
      try {
        setLoading(true);
        const userResponse = await axios.get(
          `https://4541-92-253-123-200.ngrok-free.app/api/User/${userid}`
        );
        setUser(userResponse.data);
        console.log("i have received the user data ", userResponse.data);
        console.log("URL id:", userid);
        const tweetsResponse = await axios.get(
          `https://4541-92-253-123-200.ngrok-free.app/api/Tweets/user/${userid}`
        );
        setTweets(tweetsResponse.data);
        console.log(tweetsResponse.data, "users tweets");
      } catch (error) {
        setError("Failed to fetch user details.");
        console.error("API error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserDetailsAndTweets();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: "red" }}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.mainContainer}>
          <Image src={user?.image} style={styles.userImage} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{user?.name}</Text>
            <Text style={styles.username}>@{user?.username}</Text>
          </View>
        </View>
        <View style={styles.horizontalLine} />
        <View style={styles.page}>
          <FlatList
            data={tweets}
            renderItem={({ item }) => <Tweet tweet={item} />}
            keyExtractor={(item: TweetType) => ""}
            scrollEnabled={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#808080",
    justifyContent: "center",
    marginHorizontal: "auto",
    flexDirection: "column",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "white",
    backgroundColor: "white",
    width: "100%",
  },
  text: {
    alignContent: "center",
    justifyContent: "center",
  },
  userImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginLeft: 5,
  },
  mainContainer: {
    backgroundColor: "white",
    flex: 1,
    flexDirection: "row",
    width: "100%",
  },
  name: {
    marginTop: 25,
    fontWeight: "600",
    fontSize: 30,
    marginLeft: 8,
  },
  content: {
    lineHeight: 20,
    marginTop: 5,
  },
  image: {
    width: "100%",
    aspectRatio: 16 / 9,
    marginVertical: 10,
    borderRadius: 15,
  },
  username: {
    fontWeight: "500",
    color: "lightgray",
    marginLeft: 8,
    fontSize: 25,
  },
  footer: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
  },
  time: {
    marginLeft: 2,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: "#ccc",
    marginVertical: 20,
    width: "100%",
  },
  page: {
    backgroundColor: "white",
    flex: 1,
  },
});
