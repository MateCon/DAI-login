import React, { useContext, useEffect, useState } from "react";
import { View, Text, Button, StyleSheet, Image } from "react-native";
import UserContext from "../helpers/UserContext";
import { getPlato } from "../utils/axiosClient";

export default function Detalle({ route, navigation }: any) {
    const [plato, setPlato] = useState<any | null>();
    const [user, setUser] = useContext(UserContext);
    const [error, setError] = useState("");

    useEffect(() => {
        (async () => {
            const data = await getPlato(route.params.id);
            console.log(data);
            setPlato(data);
        })()
    }, []);

    return (
        <View>
            <Text onPress={() => navigation.goBack()}>{plato?.title}</Text>
            <Image source={{ uri: plato?.image }} style={styles.image} />
            <Text>Tiempo de preparacion: {plato?.readyInMinutes} minutos</Text>
            <Text>Precio por porción: {plato?.pricePerServing}$</Text>
            <Text>{error}</Text>
            {!user.platos.find(p => p.id === route.params.id)
                ? <Button
                    onPress={() => {
                        console.log(user.platos)
                        console.log(user.platos?.reduce((count, p) => {
                            console.log(p)
                            return count + p.vegan ? 0 : 1
                        }, 0));
                        if (user.platos?.reduce((count, p) => count + p.vegan === plato.vegan ? 1 : 0, 0) >= 2)
                            setError(plato.vegan ? "Ya hay dos platos veganos" : "Ya hay dos platos no veganos");
                        else 
                            setUser({ ...user, platos: [ ...user?.platos, plato ]})
                    }}
                    color="green"
                    title="Agregar a mis platos"
                />
                : <Button onPress={() => setUser({ ...user, platos: user.platos.filter(p => p.id !== route.params.id)}) } color="red" title="Sacar de mis platos" />}
        </View>
    )
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },
    image: {
        width: 128,
        height: 128
    },
});
