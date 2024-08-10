import React from "react";
import { View, Text, Button, ScrollView, Alert } from "react-native";
import useStore from "../store/store";
import { tw } from "nativewind";

const Cart = () => {
  const { cart, removeFromCart } = useStore();

  const handleRemove = (itemId) => {
    Alert.alert(
      "Remove Item",
      "Are you sure you want to remove this item from your cart?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Remove",
          onPress: () => removeFromCart(itemId),
          style: "destructive",
        },
      ]
    );
  };

  const totalAmount = cart
    .reduce((total, item) => total + parseFloat(item.price.amount), 0)
    .toFixed(2);

  if (cart.length === 0) {
    return (
      <View style={tw`flex-1 justify-center items-center p-5`}>
        <Text style={tw`text-xl text-gray-700`}>Your cart is empty</Text>
      </View>
    );
  }

  return (
    <ScrollView style={tw`p-5 bg-white`}>
      {cart.map((item) => (
        <View
          key={item.id}
          style={tw`flex-row justify-between items-center p-4 mb-3 border-b border-gray-300`}
        >
          <View style={tw`flex-1`}>
            <Text style={tw`text-lg font-bold text-gray-900`}>{item.name}</Text>
            <Text style={tw`text-lg text-gray-700`}>£{item.price.amount}</Text>
          </View>
          <Button
            title="Remove"
            onPress={() => handleRemove(item.id)}
            color="#DC2626"
            accessibilityLabel={`Remove ${item.name} from cart`}
          />
        </View>
      ))}
      <View style={tw`mt-5`}>
        <Text style={tw`text-2xl font-bold text-gray-900`}>
          Total: £{totalAmount}
        </Text>
        <Button
          title="Proceed to Checkout"
          onPress={() => Alert.alert("Checkout", "Proceeding to checkout...")}
          color="#1D4ED8"
          style={tw`mt-4`}
        />
      </View>
    </ScrollView>
  );
};

export default Cart;
