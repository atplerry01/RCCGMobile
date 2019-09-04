import { AsyncStorage } from 'react-native';

export function authHeader() {
    let token = JSON.parse(AsyncStorage.getItem('@userToken'));

    // TODO: redirect if unautenticated

    if (token) {
        // TODO: Better implementation
        return {
            'Authorization': 'Bearer ' + token 
        };
    } else {
        return {};
    }
}