import { View, Text, TouchableOpacity, ScrollView, Image } from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { ExternalLinkIcon, XCircleIcon } from "react-native-heroicons/outline";
import { useSelector, useDispatch } from "react-redux";
import {
  removeFromBasket,
  selectBasketItem,
  selectGroupedBasket,
  selectTotal,
} from "../fetures/basketSlice";
import { selectRestaurant } from "../fetures/restaurantSlice";
import { SafeAreaView } from "react-native-safe-area-context";
import { urlFor } from "../sanity";
const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const subtotal = useSelector(selectTotal);
  const items = useSelector(selectBasketItem);
  const dispatch = useDispatch();
  const [groupedItemInBasket, setGroupItemInBasket] = useState([]);

  useMemo(() => {
    const grouped = items.reduce((group, item) => {
      const { id } = item;
      group[id] = group[id] ?? [];
      group[id].push(item);
      return group;
    }, {});
    const result = Object.keys(grouped).map((key) => [key, grouped[key]]);
    setGroupItemInBasket(result);
  }, [items]);


  const orderTotal = subtotal + 6;
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00CCBB] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-50 absolute top-3 right-4"
          >
            <XCircleIcon color={"#00CCBB"} height={50} width={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: "https:/links.papareact.com/wru",
            }}
            className="h7 w-7 bg-gray-300 p-4 rounded-full"
          />
          <Text className="flex-1">Deliver in 15-20 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00CCBB]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {groupedItemInBasket.map((item, key) => (
            <View
              key={key}
              className="flex-row items-center bg-white space-x-3 py-2 px-5"
            >
              <Text className="text-[#00CCBB]">{item[1].length} x</Text>
              <Image
                source={{
                  uri: urlFor(item[1][0]?.image).url(),
                }}
                className="h-12 w-12 rounded-full"
              />
              <Image className="h-12 w-12 rounded-full" />
              <Text className="flex-1">{item[1][0]?.name}</Text>
              <Text>
                {item[1][0]?.price.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </Text>
              <TouchableOpacity>
                <Text
                  className="text-[#00CCBB] text-xs"
                  onPress={() => dispatch(removeFromBasket(item[0]))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              {subtotal.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              {(6).toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Order Total</Text>
            <Text className="font-extrabold">
              {orderTotal.toLocaleString("vi", {
                style: "currency",
                currency: "VND",
              })}
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("preparingOrderScreen")}
            className="rounded-lg bg-[#00CCBB] p-4"
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
