import React, { FC } from "react";
import { TouchableOpacity, Text, Image, StyleSheet } from "react-native";

export interface ItemProps {
    id: number;
    image: string;
    title: string;
    navigation: any;
}

const PlatoListItem: FC<ItemProps> = ({ id, image, title, navigation }) => {
    return (
        <TouchableOpacity style={styles.item} onPress={() => {
            navigation.navigate("Detalle", { id });
        }}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text>{title}</Text>
        </TouchableOpacity>
    )
}

export default PlatoListItem;

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    image: {
        width: 64,
        height: 64
    },
});
