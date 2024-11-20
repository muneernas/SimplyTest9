import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Provider } from "react-redux";
import Stoore from "../store";
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Provider store={Stoore}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
          headerShown: false,
        }}
      >
        <Tabs.Screen
          name="photo"
          options={{
            title: "photos",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "people" : "people-circle-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="index"
          options={{
            title: "ID Data",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "card" : "card-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            headerShown: false,
            title: "twitter",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "people" : "people-circle-outline"}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="createTweet"
          options={{
            headerShown: false,
            title: "New Tweet",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon
                name={focused ? "add-circle-outline" : "add-circle-outline"}
                color={color}
              />
            ),
          }}
        />
      </Tabs>
    </Provider>
  );
}
