import React from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import PlatoListItem from "../components/PlatoListItem";
import { useContextState } from "../helpers/contextState";

export default function MisPlatos({ navigation }: any) {
    const { contextState: { platos } } = useContextState();

    return (
        <View>
            <Text onPress={() => navigation.goBack()}>Mis Platos</Text>
            <SafeAreaView>
                <FlatList
                    data={platos}
                    renderItem={(data) => <PlatoListItem {...data.item} navigation={navigation} />}
                    keyExtractor={item => item.id.toString()}
                />
            </SafeAreaView>
            <View>
                <Text>Precio: {platos.reduce((acc, val) => acc + val.pricePerServing, 0)}</Text>
                <Text>Tiempo de preparación promedio: {Math.ceil(platos.reduce((acc, val) => acc + val.readyInMinutes, 0) / platos.length) | 0} minutos</Text>
                <Text>{((): string => {
                    let v = 0, n = 0;
                    for (let { vegan } of platos) {
                        if (vegan) v++;
                        else n++;
                    }
                    return `${v}/2 platos veganos y ${n}/2 no veganos`;
                })()}</Text>
            </View>
        </View>
    )
}