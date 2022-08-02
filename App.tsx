import React, { useState } from 'react';
import { TextInput, Button, StyleSheet, Text, View, Alert } from 'react-native';
import { login } from './utils/axiosClient';
// import { QueryClient, useQuery, useQueryClient, QueryClientProvider } from 'react-query';

// const queryClient = new QueryClient();

// const DataFetchingComponent = () => {
//   const queryClient = useQueryClient();
//   const query = useQuery<any, any>('todos', getSomething);

//   if (query.isLoading) return <Text>Loading...</Text>

//   if (query.isError) return <Text>{query.error.message}</Text>
  
//   return <Text>{query.data?.message}</Text>
// }

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{[key: string]: string}>({});

  const onSubmit = async() => {
    const newErrors: {[key: string]: string} = {};
    if (!email) newErrors[email] = "This field is required";
    if (!password) newErrors[password] = "This field is required";
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const response = await login(email, password);
      console.log(response);
    }
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
        color="blue"
      />
    </View>
  )
}

export default function App() {
  return (
    // <QueryClientProvider client={queryClient}>
      <View style={styles.container}>
        <Login />
      </View>
    // </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
