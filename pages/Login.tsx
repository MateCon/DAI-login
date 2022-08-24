import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet, Button } from "react-native";
import { ActionType, useContextState } from "../helpers/contextState";
import { login } from "../utils/axiosClient";

export default function Login({ navigation }: any) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState<{[key: string]: string}>({});
    const [loading, setLoading] = useState(false);
    const [unauthorized, setUnauthorized] = useState("");
    const { contextState: user, setContextState } = useContextState();
  
    const onSubmit = async() => {
      setLoading(true);
      const newErrors: {[key: string]: string} = {};
      if (!email) newErrors[email] = "This field is required";
      if (!password) newErrors[password] = "This field is required";
      setErrors(newErrors);
  
      if (Object.keys(newErrors).length === 0) {
        const response = await login(email, password);
        if (response) {
          setContextState({ type: ActionType.SetToken, payload: response.token });
          navigation.navigate("Platos");
        } else {
          setUnauthorized("User not found");
        }
      }
  
      setLoading(false);
    }
  
    return (
      <View>
        <Text style={styles.title}>Login</Text>
        <Text style={styles.label}>Name</Text>
        <TextInput
          onChangeText={setEmail}
          value={email}
          style={styles.input}
        />
        <Text style={styles.error}>{errors[email]}</Text>
        <Text style={styles.label}>Password</Text>
        <TextInput
          onChangeText={setPassword}
          value={password}
          secureTextEntry
          style={styles.input}
        />
        <Text style={styles.error}>{errors[password]}</Text>
        <Button
          title="Submit"
          onPress={onSubmit}
          color={loading ? "gray" : "blue"}
          disabled={loading}
        />
        <Text style={styles.error}>{unauthorized}</Text>
      </View>
    )
}

const styles = StyleSheet.create({
    title: {
      fontSize: 22,
    },
    label: {
      fontWeight: "600",
      marginTop: 10
    },
    input: {
      borderColor: "#ccc",
      borderBottomWidth: 2,
      padding: 2
    },
    error: {
      color: "red"
    },
});
