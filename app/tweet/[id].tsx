import Tweet from "@/components/Tweet";
import { TweetType } from "@/types/explore";
import axios from "axios";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { useEffect, useState } from "react";
import { ActivityIndicator, View, Text } from "react-native";

export default function TweetScreen() {
  const { id } = useLocalSearchParams();
  const searchParams = useLocalSearchParams();

  const [tweets, setTweets] = useState<TweetType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  console.log("Search Params:", searchParams);
  useEffect(() => {
    const fetchTweets = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://4541-92-253-123-200.ngrok-free.app/api/Tweets"
        );
        setTweets(response.data);
        console.log("i have received the data ", response.data);
        console.log("URL id:", id);
      } catch (error) {
        setError("Failed to fetch tweets.");
        console.error("API error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTweets();
  }, []);
  console.log(id, "id");

  const tweet = tweets.find((t) => t.id === Number(id));
  console.log(
    tweets.find((t) => t.id === 0),
    "dsadadasdasdadasdsadsada"
  );

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

  if (!tweet) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Tweet not found.</Text>
      </View>
    );
  }

  return <Tweet tweet={tweet} />;
}
