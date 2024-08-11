import React from "react";
import { View, Text, Button, ScrollView, Alert } from "react-native";
import useStore from "../store/store";

const Cart = () => {
  const { cart, removeFromCart } = useStore();

  const handleRemove = (itemId) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Remove",
          onPress: () => removeFromCart(itemId),
          style: "destructive",
        },
      ]
    );
  };

  return (
    <View className="flex-1 bg-gray-100 p-5">
      {cart.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-xl text-gray-700">Your cart is empty</Text>
        </View>
      ) : (
        <ScrollView className="bg-white p-4 rounded-lg shadow">
          {cart.map((item) => (
            <View
              key={item.id}
              className="flex-row justify-between items-center p-4 mb-3 border-b border-gray-300"
            >
              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-900">
                  {item.name}
                </Text>
                <Text className="text-lg text-gray-700">
                  £{item.price.amount}
                </Text>
              </View>
              <Button
                title="Remove"
                onPress={() => handleRemove(item.id)}
                color="#DC2626"
                accessibilityLabel={`Remove ${item.name} from cart`}
              />
            </View>
          ))}
          <View className="mt-5">
            <Text className="text-2xl font-bold text-gray-900">
              Total: £
              {cart
                .reduce(
                  (total, item) => total + parseFloat(item.price.amount),
                  0
                )
                .toFixed(2)}
            </Text>
            <Button
              title="Proceed to Checkout"
              onPress={() =>
                Alert.alert("Checkout", "Proceeding to checkout...")
              }
              color="#1D4ED8"
              className="mt-4"
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Cart;
