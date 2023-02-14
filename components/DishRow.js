import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { urlFor } from "../sanity";
import { useSelector, useDispatch } from "react-redux";
import CurrencyFormat from "react-currency-format";
import {
  MinusCircleIcon,
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { selectBasketItem, selectBasketItemById } from "../fetures/basketSlice";
import { addToBasket, removeFromBasket } from "../fetures/basketSlice";
import BasketIcon from "./BasketIcon";

const DishRow = ({ id, name, description, price, image }) => {
  const [isPressed, setIsPressed] = useState(false);

  const items = useSelector((state) => selectBasketItemById(state, id));
  const items2 = useSelector(selectBasketItem);

  const dispatch = useDispatch();
  const addToBaskets = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };
  const removeFromBasketById = () => {
    dispatch(removeFromBasket(id));
  };
  return (
    <>
      <View className="bottom-20">
        <TouchableOpacity
          onPress={() => setIsPressed(!isPressed)}
          className={`bg-white border p-4 border-gray-200 flex-row ${
            isPressed && "border-b-0"
          }`}
        >
          <View className="flex-1">
            <View className="pr-2">
              <Text className="text-lg mb-1">{name}</Text>
              <Text className="text-gray-400 mt-2">{description}</Text>
              <Text className="text-gray-400">
                {price.toLocaleString("vi", {
                  style: "currency",
                  currency: "VND",
                })}
              </Text>
            </View>
          </View>

          <View>
            <Image
              source={{ uri: urlFor(image).url() }}
              className="h-20 w-20 bg-gray-300 p-4"
            />
          </View>
        </TouchableOpacity>

        {isPressed && (
          <View className="bg-white px-4 ">
            <View className="flex-row items-center space-x-2 pb-3 ">
              <TouchableOpacity
                onPress={removeFromBasketById}
                disabled={!items.length}
              >
                <MinusCircleIcon
                  color={items.length == 0 ? "gray" : "#00CCBB"}
                  size={40}
                />
              </TouchableOpacity>

              <Text>{items.length}</Text>
              <TouchableOpacity onPress={addToBaskets}>
                <PlusCircleIcon color={"#00CCBB"} size={40} />
              </TouchableOpacity>
            </View>
          </View>
        )}
       
      </View>
      <BasketIcon />
    </>
  );
};

export default DishRow;
