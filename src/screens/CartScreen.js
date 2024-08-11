import React from "react";
import { View, Text, Button, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import useStore from "../store/store";

const CartScreen = () => {
  const navigation = useNavigation();
  const { cart, removeFromCart } = useStore();

  return (
    <View className="flex-1 bg-gray-100 p-5">
      {cart.length === 0 ? (
        <View className="flex-1 justify-center items-center">
          <Text className="text-lg text-gray-700 mb-4">
            Your cart is empty!
          </Text>
          <Button
            title="Shop Now"
            onPress={() => navigation.navigate("Home")}
            color="#1D4ED8"
            accessibilityLabel="Navigate to product list"
          />
        </View>
      ) : (
        <ScrollView>
          <Text className="text-2xl font-bold text-gray-900 mb-5">
            Your Cart
          </Text>
          <View className="bg-white p-4 rounded-lg shadow">
            <Text className="text-xl font-semibold text-gray-900 mb-4">
              Cart Items
            </Text>
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
                  onPress={() => removeFromCart(item.id)}
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
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default CartScreen;
