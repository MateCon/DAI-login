import { useContext, useEffect, useState } from "react";
import React, { View, Text, SafeAreaView, FlatList } from "react-native";
import UserContext from "../helpers/UserContext";
import { getAllPlatos } from "../utils/axiosClient";

export default function Platos() {
    const [user] = useContext(UserContext);
    const [platos, setPlatos] = useState<any>(null);

    useEffect(() => {
        (async () => {
            const data = await getAllPlatos();
            console.log(data);
            setPlatos(data);
        })()
    }, []);

    return (
        <View>
            <Text>Platos</Text>
            <SafeAreaView>
                <FlatList
                    data={platos}
                    renderItem={(item: any) => <View>a</View>}
                />
            </SafeAreaView>
        </View>
    )
}