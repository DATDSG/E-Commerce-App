import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {
  CartStackNavigator,
  DetailStackNavigator,
  MainStackNavigator,
} from "./StackNavigator";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#1D4ED8",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#FFFFFF",
          borderTopColor: "transparent",
        },
        tabBarIconStyle: {
          marginBottom: 5,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={MainStackNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
          tabBarAccessibilityLabel: "Home screen",
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartStackNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="shopping-cart" size={size} color={color} />
          ),
          tabBarAccessibilityLabel: "Cart screen",
        }}
      />
      <Tab.Screen
        name="Details"
        component={DetailStackNavigator}
        options={{
          tabBarIcon: ({ size, color }) => (
            <MaterialIcons name="info" size={size} color={color} />
          ),
          tabBarAccessibilityLabel: "Product details screen",
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
