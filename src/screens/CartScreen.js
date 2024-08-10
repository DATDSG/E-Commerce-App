import React from "react";
import { View, Text, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { tw } from "nativewind";
import useStore from "../store/store";

const CartScreen = () => {
  const navigation = useNavigation();
  const { cart } = useStore();

  if (cart.length === 0) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-white p-5`}>
        <Text style={tw`text-lg text-gray-700 mb-4`}>Your cart is empty!</Text>
        <Button
          title="Shop Now"
          onPress={() => navigation.navigate("ProductListScreen")}
          color="#1D4ED8"
          accessibilityLabel="Navigate to product list"
        />
      </View>
    );
  }

  return (
    <View style={tw`flex-1 bg-white p-5`}>
      <Text style={tw`text-2xl font-bold text-gray-900 mb-5`}>Your Cart</Text>
      <Button
        title="View Cart"
        onPress={() => navigation.navigate("Cart")}
        color="#1D4ED8"
      />
    </View>
  );
};

export default CartScreen;
