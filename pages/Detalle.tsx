import { View, Text } from "react-native";

export default function Detalle({ route }: any) {
    return <View><Text>Detalle {route.params.id}</Text></View>
}