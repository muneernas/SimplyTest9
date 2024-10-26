import tweets from "@/assets/data/tweets";
import Tweet from "@/components/Tweet";
import { TweetType } from "@/types/explore";
import { useLocalSearchParams } from "expo-router";
export default function TweetScreen() {
  const { id } = useLocalSearchParams();
  const tweet = tweets.find((t) => t.id === id);
  return <Tweet tweet={tweet as TweetType} />;
}
