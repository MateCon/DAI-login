import { FC, useContext, useState } from "react";
import React, { Image, View, Text, SafeAreaView, FlatList, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import UserContext from "../helpers/UserContext";
import { getPlatos } from "../utils/axiosClient";

interface ItemProps {
    id: number;
    image: string;
    title: string;
    navigation: any;
}

const Item: FC<ItemProps> = ({ id, image, title, navigation }) => {
    return (
        <TouchableOpacity style={styles.item} onPress={() => {
            navigation.navigate("Detalle", { id });
        }}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

export default function Platos({ navigation }: any) {
    const [user] = useContext(UserContext);
    const [platos, setPlatos] = useState<ItemProps[] | null>(null);

    const onChange = async (text: string) => {
        if (text.length < 2) return;
        const data = await getPlatos(text);
        console.log(data);
        setPlatos(data.results);
    }

    return (
        <View>
            <Text style={styles.title}>Platos</Text>
            <TextInput
                onChangeText={onChange}
                style={styles.input}
            />
            <SafeAreaView>
                <FlatList
                    data={platos}
                    renderItem={(data) => <Item {...data.item} navigation={navigation} />}
                    keyExtractor={item => item.id.toString()}
                />
            </SafeAreaView>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
      borderColor: "#ccc",
      borderBottomWidth: 2,
      padding: 2
    },
    item: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    image: {
        width: 64,
        height: 64
    },
    title: {
      fontSize: 22,
    },
});
