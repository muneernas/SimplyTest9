import { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  ActivityIndicator,
  Text,
} from "react-native";
import Tweet from "@/components/Tweet";
import { TweetType } from "@/types/explore";

export default function TabTwoScreen() {
  const [tweets, setTweets] = useState([]);
  const [loading, setLoadding] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        const response = await fetch("https://192.168.1.83:5219/api/Tweets");
        console.log(response, "dsadasdas");
        if (!response.ok) {
          throw new Error("failed to fetch tweets");
        }
        const data = await response.json();
        console.log(data, "dsadasdas");

        setTweets(data);
      } catch (error: any) {
        setError(error.message);
        console.log("sad", error);
      } finally {
        setLoadding(false);
      }
    };
    fetchTweets();
  }, []);
  console.log(tweets);
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
      <View style={styles.page}>
        <FlatList
          data={tweets}
          renderItem={({ item }) => <Tweet tweet={item} />}
          keyExtractor={(item: TweetType) => item.id.toString()}
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
});
