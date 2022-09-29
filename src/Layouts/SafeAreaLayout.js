import { StyleSheet, Text, SafeAreaView } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'

const SafeAreaLayout = ({ children }) => {
    const route = useRoute()
    return (
        <SafeAreaView style={s.container}>
            {children}
        </SafeAreaView>
    )
}

const s = StyleSheet.create({
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: '#121212',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
    }
})

export default SafeAreaLayout