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
        </View>
    )
}