import { useState } from "react";
import React, { View, Text, SafeAreaView, FlatList, TextInput, StyleSheet } from "react-native";
import PlatoListItem, { ItemProps } from "../components/PlatoListItem";
import { getPlatos } from "../utils/axiosClient";

export default function Platos({ navigation }: any) {
    const [platos, setPlatos] = useState<ItemProps[] | null>(null);

    const onChange = async (text: string) => {
        if (text.length < 2) return;
        const data = await getPlatos(text);
        setPlatos(data.results);
    }

    return (
        <View>
            <View style={styles.header}>
                <Text style={styles.title}>Platos</Text>
                <Text onPress={() => navigation.navigate("MisPlatos")}>Mis Platos</Text>
            </View>
            <TextInput
                onChangeText={onChange}
                style={styles.input}
            />
            <SafeAreaView>
                <FlatList
                    data={platos}
                    renderItem={(data) => <PlatoListItem {...data.item} navigation={navigation} />}
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
    title: {
      fontSize: 22,
    },
    header: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    }
});
