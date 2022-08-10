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
            {plato.vegano ? "Es vegano" : "No es vegano"}
            {!user.platos.find(p => p.id === route.params.id)
                ? <Button
                    onPress={() => {
                        let count = 0;
                        for (let { vegan } of user.platos) {
                            console.log(vegan, plato.vegan)
                            if (vegan === plato.vegan) count++;
                        }
                        if (count >= 2)
                            setError(plato.vegan ? "Ya hay dos platos veganos" : "Ya hay dos platos no veganos");
                        else 
                            setUser({ ...user, platos: [ ...user?.platos, plato ]})
                    }}
                    color="green"
                    title="Agregar a mis platos"
                />
                : <Button onPress={() => setUser({ ...user, platos: user.platos.filter(p => p.id !== route.params.id)}) } color="red" title="Sacar de mis platos" />}
            <Text style={styles.error}>{error}</Text>
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
    error: {
        color: "red"
    }
});
