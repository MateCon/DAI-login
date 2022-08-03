import { useEffect, useState } from "react";
import { View, Text } from "react-native";
import { getPlato } from "../utils/axiosClient";

// interface Plato {
//     id: number;
//     image: string;
//     title: string;

// }

export default function Detalle({ route }: any) {
    const [plato, setPlato] = useState<any | null>();

    useEffect(() => {
        (async () => {
            const data = await getPlato(route.params.id);
            console.log(data);
            setPlato(data.result);
        })()
    }, []);

    return (
        <View>
            <Text>Detalle {route.params.id}</Text>
        </View>
    )
}