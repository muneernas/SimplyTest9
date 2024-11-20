import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native";
import { TweetType } from "@/types/explore";
import { Entypo } from "@expo/vector-icons/";
import dayjs from "dayjs";
import Iconbutton from "./IconButton";
import ImageView from "react-native-image-viewing";
import { Link } from "expo-router";

type TweetProps = {
  tweet: TweetType;
};

const Tweet = ({ tweet }: TweetProps) => {
  const [timeSinceTweet, setTimeSinceTweet] = useState("");
  const [isLiked, setIsLiked] = useState(!!tweet.isLiked); 
  const [likeCount, setLikeCount] = useState(tweet.numberOfLikes || 0);
  const [isImageViewerVisible, setImageViewerVisible] = useState(false);
  const [isPostViewerVisible, setPostViewerVisible] = useState(false);

  const findtime = () => {
    const currentDate = dayjs().add(3, "hour");
    const datestring = tweet?.createdAt;
    const dateobject = dayjs(datestring);
    const datedif = currentDate.diff(tweet?.createdAt, "day");
    const formatteddate = dateobject.format("DD-MM-YYYY");
    const hourdif = currentDate.diff(tweet?.createdAt, "hour");
    const mindif = currentDate.diff(tweet?.createdAt, "minute");

    if (datedif > 1) {
      return formatteddate;
    } else if (hourdif > 1) {
      return `${hourdif} h`;
    } else {
      if (mindif > 60) return `${hourdif} h`;
      else {
        return `${mindif} m`;
      }
    }
    
  };

  useEffect(() => {
    setTimeSinceTweet(findtime());

    const intervalId = setInterval(() => {
      setTimeSinceTweet(findtime());
    }, 60000);
    return () => clearInterval(intervalId);
  }, [tweet.createdAt]);

  const handleLikePress = () => {
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked((prev) => !prev);

    
    updateLikeStatus(tweet.id, !isLiked);
  };

  const updateLikeStatus = async (tweetId: string, like: boolean) => {
    try {
      const response = await fetch(
        `https://4541-92-253-123-200.ngrok-free.app/api/tweets/${tweetId}/like`,
        {
          method: like ? "POST" : "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      console.log("Updated like status:", data);
    } catch (error) {
      console.error("Error updating like status:", error);
    }
    console.log("Tweet ID:", tweet.id, typeof tweet.id);
console.log("IsLiked:", tweet.isLiked, typeof tweet.isLiked);

  };

  return (
    <SafeAreaView style={styles.container}>
      <Link href={`/tweet/${tweet?.id}`} asChild>
        <Pressable style={styles.container}>
          <Pressable>
            <Link href={`/tweet/uspf/${tweet.user?.id}`}>
              <Image src={tweet.user.image} style={styles.userImage} />
            </Link>
          </Pressable>
          <View style={styles.mainContainer}>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Text style={styles.name}>{tweet.user.name}</Text>
              <Text style={styles.username}>
                {"@"}
                {tweet.user.username}
              </Text>
              <View style={{ marginLeft: "auto" }}>
                <Text style={styles.username}>
                  {"."}
                  {findtime()}
                  <Entypo
                    name="dots-three-horizontal"
                    size={16}
                    color="gray"
                    style={{ marginLeft: "auto" }}
                  />
                </Text>
              </View>
            </View>

            <Text style={styles.content}>{tweet.content}</Text>
            <Pressable onPress={() => setPostViewerVisible(true)}>
              {tweet.image && <Image src={tweet.image} style={styles.image} />}
            </Pressable>
            <View style={styles.footer}>
              <Iconbutton icon="comment" text={tweet.numberOfComments} />
              <Iconbutton icon="retweet" text={tweet.numberOfRetweets} />
              <Iconbutton
                icon="heart"
                text={likeCount}
                color={isLiked ? "red" : "gray"}
                onPress={handleLikePress}
              />
              <Iconbutton icon="chart" text={tweet.impressions || 0} />
              <Iconbutton icon="share-apple" />
            </View>

            <ImageView
              images={[{ uri: tweet.user.image }]}
              imageIndex={0}
              visible={isImageViewerVisible}
              onRequestClose={() => setImageViewerVisible(false)}
            />
            <ImageView
              images={[{ uri: tweet.image }]}
              imageIndex={0}
              visible={isPostViewerVisible}
              onRequestClose={() => setPostViewerVisible(false)}
            />
          </View>
        </Pressable>
      </Link>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: "#808080",
    justifyContent: "center",
    marginHorizontal: "auto",
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "lightgray",
    backgroundColor: "white",
  },
  text: {
    alignContent: "center",
    justifyContent: "center",
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  mainContainer: {
    backgroundColor: "white",
    marginLeft: 10,
    flex: 1,
  },
  name: {
    fontWeight: "600",
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
    marginLeft: 5,
  },
  footer: {
    flexDirection: "row",
    marginVertical: 10,
    justifyContent: "space-between",
  },
  time: {
    marginLeft: 2,
  },
});

export default Tweet;
