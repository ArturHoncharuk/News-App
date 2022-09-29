import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, FlatList, StyleSheet } from 'react-native';
import SafeAreaLayout from '../Layouts/SafeAreaLayout';
import axios from 'axios';
import { TextInput, Menu, Button, Divider } from 'react-native-paper';
import ItemCard from '../Components/ItemCard';
import useDeviceOrientation from '@rnhooks/device-orientation';

const Home = () => {
    const [fetchedData, setFetchedData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [visible, setVisible] = useState(false);
    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const deviceOrientation = useDeviceOrientation();

    useEffect(() => {
        axios.get('https://newsapi.org/v2/everything?q=keyword&apiKey=dc8c2e5832e04182b945937d3b373501')
            .then(response => {
                setFetchedData(response.data.articles)
                setFilteredData(response.data.articles)
            }).finally(() => setIsLoading(false))
    }, [])

    useEffect(() => {
        const filteredArray = fetchedData.filter(item => {
            if (searchQuery !== '')
                return Object.values(item.title).join('').toLowerCase().includes(searchQuery.toLowerCase());
            else
                setFilteredData(fetchedData)
        })

        if (filteredArray.length)
            setFilteredData([
                ...filteredArray
            ])
    }, [searchQuery])

    const handleSortByNameAZ = () => {
        const sortByTitle = fetchedData?.sort((a, b) => {
            return a.title > b.title ? -1 : 1
        })

        setFilteredData([
            ...fetchedData,
            sortByTitle,
        ])
    }

    const handleSortByNameZA = () => {
        const sortByTitle = fetchedData?.sort((a, b) => {
            return a.title > b.title ? 1 : -1
        })

        setFilteredData([
            ...fetchedData,
            sortByTitle,
        ])
    }

    const handleSortByDescriptionAZ = () => {
        const sortByDescription = fetchedData?.sort((a, b) => {
            return (a.description > b.description ? -1 : 1)
        })
        setFilteredData([
            ...fetchedData,
            sortByDescription
        ])
    }

    const handleSortByDescriptionZA = () => {
        const sortByDescription = fetchedData?.sort((a, b) => {
            return (a.description > b.description ? 1 : -1)
        })
        setFilteredData([
            ...fetchedData,
            sortByDescription
        ])
    }

    return (
        <SafeAreaLayout>
            <View style={s.filters}>
                <TextInput
                    style={[s.input, deviceOrientation === 'landscape' ? { marginRight: 80 } : { marginLeft: 0 }]}
                    label="Search..."
                    value={searchQuery}
                    autoCapitalize={false}
                    onChangeText={query => setSearchQuery(query)}
                />
                <Menu
                    visible={visible}
                    onDismiss={closeMenu}
                    anchor={<Button style={{ color: '#fff' }} onPress={openMenu}>Sort by</Button>}>
                    <Menu.Item onPress={handleSortByNameAZ} title="Name: A-Z" />
                    <Menu.Item onPress={handleSortByNameZA} title="Name: Z-A" />
                    <Divider />
                    <Menu.Item onPress={handleSortByDescriptionAZ} title="Description: A-Z" />
                    <Menu.Item onPress={handleSortByDescriptionZA} title="Description: Z-A" />
                </Menu>
            </View>
            {isLoading ? (
                <View style={s.loader}>
                    <ActivityIndicator
                        animating={true}
                        color='#fff' />
                </View>
            ) : <FlatList
                data={filteredData}
                renderItem={({ item }) => <ItemCard item={item} />}
                removeClippedSubviews={true}
                initialNumToRender={7} />}
        </SafeAreaLayout>
    )
}

const s = StyleSheet.create({
    loader: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        color: '#fff'
    },
    filters: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: '75%',
        backgroundColor: 'transparent',
        borderBottomWidth: 2,
        borderBottomColor: '#fff',
    },
})

export default Home