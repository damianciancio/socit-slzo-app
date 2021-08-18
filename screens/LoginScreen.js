import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { LinearGradient } from 'expo-linear-gradient';

import * as userActions from '../store/actions/user';

const LoginScreen = props => {
    const user = useSelector(state => state.user.currentUser);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        if (error) {
            Alert.alert('Ocurrió un error', error, [{ text: 'Ok' }])
        }
    }, [error]);

    const login = async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(userActions.login({ username: 'damian', password: 'admin' }));
            props.navigation.navigate('Status')
        } catch(error) {
            setError(error.message)
            setIsLoading(false)
        }
    }

    if (isLoading) {
        return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color="brown" /></View>;
    }

    return (
        <KeyboardAvoidingView
            behavior="padding"
            keyboardVerticalOffset={50}
            style={styles.screen}
        >
            <LinearGradient colors={['#ffedff','#ffe3ff']} style={styles.gradient}>

                <View style={styles.container}>
                    <ScrollView>
                        <Text>Login!</Text>
                        <Text>Usuario</Text>
                        <TextInput
                            onChangeText={(value) => setUsername(value)}
                            required
                            email
                            autoCapitalize="none"
                        />
                        <Text>Contraseña</Text>
                        <TextInput
                            onChangeText={(value) => setPassword(value)}
                            required
                            secureTextEntry
                            autoCapitalize="none"

                        />
                        <Button title="Login" onPress={login} />
                    </ScrollView>
                </View>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}

LoginScreen.navigationOptions = {
    headerTitle: 'Iniciar sesión'
}

const styles = StyleSheet.create({
    container: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    gradient: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },  
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})

export default LoginScreen;