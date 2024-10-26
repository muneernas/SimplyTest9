import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";

import ImageView from "react-native-image-viewing";
import { SafeAreaView } from "react-native-safe-area-context";

const PhotoGallery = () => {
  const [visible, setIsVisible] = useState(false);
  const [data, setData] = useState([]);
  const [imageIndex, setImageIndex] = useState(0);

  const getImage = () => {
    fetch(
      "https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=TPsQj35RNAFycqJA4VyLox5tpO6nbnK7mQZ0pyb1"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data.photos);
      });
  };

  useEffect(() => {
    getImage();
  }, []);

  const onImagePress = (index) => {
    setImageIndex(index);
    setIsVisible(true);
  };

  const getRandomSize = () => {
    return Math.random() > 0.5 ? styles.largeImage : styles.smallImage;
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={[styles.Header]}>Nasa</Text>
          <Text style={styles.Header2}>Gallery</Text>
        </View>

        <ScrollView>
          <View>
            <View style={styles.container}>
              {data?.slice(0, 15)?.map((item, index) => {
                const imageStyle = getRandomSize();
                return (
                  <View style={{ width: "48%", marginBottom: 10 }}>
                    <TouchableOpacity
                      style={{ width: "100%", marginBottom: 10 }}
                      key={item?.id}
                      onPress={() => onImagePress(index)}
                    >
                      <Image
                        style={imageStyle}
                        source={{
                          uri: item.img_src,
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
          <ImageView
            key={imageIndex}
            images={data?.map((i) => ({ uri: i.img_src }))}
            imageIndex={imageIndex}
            visible={visible}
            onRequestClose={() => setIsVisible(false)}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PhotoGallery;

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    alignSelf: "center",
    justifyContent: "space-between",
    gap: 10,
  },
  largeImage: {
    height: 200,
    width: "100%",
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "grey",
  },
  smallImage: {
    height: 100,
    width: "100%",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "grey",
  },
  Header: {
    fontSize: 32,
    fontStyle: "italic",
    color: "#fc3d21",
    justifyContent: "center",
    textAlign: "center",
    padding: 10,
  },
  Header2: {
    fontSize: 32,
    fontStyle: "italic",
    color: "#0b3d91",
    justifyContent: "center",
    textAlign: "center",
    padding: 10,
  },
});
