//exercise 4



// App.js

import React, { useState } from 'react';

import {

    SafeAreaView,

    View,

    Text,

    StyleSheet,

    SectionList,

    TouchableOpacity,

    Image,

    ActivityIndicator,

    Alert,

} from 'react-native';



const cafe = [

    {

        title: 'Chocolate cake',

        color: '#6f4e37',

        icon: '☕',

        data: [

            {

                id: 'chocolate_cake',

                name: 'Chocolate Cake',

                img: 'https://unsplash.com/photos/oreo-cookie-sandwiches-dessert-in-short-stem-glass-cLpdEA23Z44',

            },

            {

                id: 'tiramisu',

                name: 'Tiramisu Cake',

                img: 'https://unsplash.com/photos/a-person-holding-a-piece-of-cake-on-a-plate-lGIXXpeERSM',

            },

        ],

    },

    {

        title: 'Hot Drinks',

        color: '#2a9d8f',

        icon: '🧊',

        data: [

            {

                id: 'hot_chocolate',

                name: 'Hot Chocolate',

                img: 'https://myeverydaytable.com/wp-content/uploads/ICEDLATTE_0_4.jpg',

            },

            {

                id: 'cappucino',

                name: 'Hot Cappucino',

                img: 'https://unsplash.com/photos/a-cappuccino-with-a-heart-drawn-on-it-UJjgRJAbDkc',

            },

        ],

    },

];



/**

 * ImageWithFallback

 * - shows an ActivityIndicator while loading

 * - on error, shows a simple fallback box

 */

function ImageWithFallback({ uri, style }) {

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(false);



    if (error) {

        return (

            <View style={[style, styles.imageFallback]}>

                <Text style={styles.fallbackText}>Image unavailable</Text>

            </View>

        );

    }



    return (

        <View style={style}>

            <Image

                source={{ uri }}

                style={[StyleSheet.absoluteFill, { width: undefined, height: undefined }]}

                resizeMode="cover"

                onLoadEnd={() => setLoading(false)}

                onError={() => {

                    setLoading(false);

                    setError(true);

                }}

            />

            {loading && (

                <View style={[StyleSheet.absoluteFill, styles.loaderContainer]}>

                    <ActivityIndicator size="small" />

                </View>

            )}

        </View>

    );

}



export default function App() {

    const onPressItem = (item) => {

        Alert.alert(item.name, `You tapped ${item.name}`);

    };



    const renderItem = ({ item }) => (

        <TouchableOpacity style={styles.itemRow} onPress={() => onPressItem(item)}>

            <View style={styles.itemText}>

                <Text style={styles.itemTitle}>{item.name}</Text>

                <Text style={styles.itemSubtitle}>Coffee description here</Text>

            </View>



            <ImageWithFallback uri={item.img} style={styles.itemImage} />

        </TouchableOpacity>

    );



    const renderSectionHeader = ({ section }) => (

        <View style={[styles.sectionHeader, { backgroundColor: section.color }]}>

            <Text style={styles.sectionIcon}>{section.icon}</Text>

            <Text style={styles.sectionTitle}>{section.title}</Text>

        </View>

    );



    return (

        <SafeAreaView style={styles.safe}>

            <View style={styles.container}>

                <Text style={styles.appTitle}>Coffee Drinks</Text>



                <SectionList

                    sections={COFFEE_SECTIONS}

                    keyExtractor={(item) => item.id}

                    renderItem={renderItem}

                    renderSectionHeader={renderSectionHeader}

                    contentContainerStyle={styles.listContent}

                    ItemSeparatorComponent={() => <View style={styles.separator} />}

                />

            </View>

        </SafeAreaView>

    );

}



const styles = StyleSheet.create({

    safe: { flex: 1, backgroundColor: '#ffffff' },

    container: { flex: 1, paddingHorizontal: 12, backgroundColor: '#fff8f3' },



    appTitle: {

        fontSize: 26,

        fontWeight: '800',

        color: '#3b2f2f',

        textAlign: 'center',

        marginTop: 18,

        marginBottom: 8,

    },



    listContent: { paddingBottom: 28, paddingTop: 6 },



    sectionHeader: {

        flexDirection: 'row',

        alignItems: 'center',

        paddingVertical: 10,

        paddingHorizontal: 10,

        borderRadius: 6,

        marginTop: 14,

        marginBottom: 6,

    },

    sectionIcon: { fontSize: 18, marginRight: 8 },

    sectionTitle: { fontSize: 16, fontWeight: '700', color: '#ffffff' },



    itemRow: {

        flexDirection: 'row',

        backgroundColor: '#ffffff',

        padding: 12,

        borderRadius: 8,

        elevation: 1,

    },



    itemText: { flex: 1, paddingRight: 10 },

    itemTitle: { fontSize: 18, fontWeight: '700', color: '#2b2b2b' },

    itemSubtitle: { fontSize: 12, color: '#757575', marginTop: 4 },



    itemImage: {

        width: 120,

        height: 80,

        borderRadius: 8,

        overflow: 'hidden', // important so Image respects borderRadius on Android

        backgroundColor: '#eee',

    },



    imageFallback: {

        justifyContent: 'center',

        alignItems: 'center',

        backgroundColor: '#ddd',

    },

    fallbackText: {

        color: '#666',

        fontSize: 12,

    },

    loaderContainer: {

        justifyContent: 'center',

        alignItems: 'center',

    },



    separator: { height: 8 },

});