import React, { useContext } from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import PlatoListItem from "../components/PlatoListItem";
import UserContext from "../helpers/UserContext";

export default function MisPlatos({ navigation }: any) {
    const [user] = useContext(UserContext);

    return (
        <View>
            <Text onPress={() => navigation.goBack()}>Mis Platos</Text>
            <SafeAreaView>
                <FlatList
                    data={user.platos}
                    renderItem={(data) => <PlatoListItem {...data.item} navigation={navigation} />}
                    keyExtractor={item => item.id.toString()}
                />
            </SafeAreaView>
            <View>
                <Text>Precio: {user.platos.reduce((acc, val) => acc + val.pricePerServing, 0)}</Text>
                <Text>Tiempo de preparación promedio: {Math.ceil(user.platos.reduce((acc, val) => acc + val.readyInMinutes, 0) / user.platos.length)} minutos</Text>
                <Text>{((): string => {
                    let v = 0, n = 0;
                    for (let { vegan } of user.platos) {
                        if (vegan) v++;
                        else n++;
                    }
                    return `${v}/2 platos veganos y ${n}/2 no veganos`;
                })()}</Text>
            </View>
        </View>
    )
}