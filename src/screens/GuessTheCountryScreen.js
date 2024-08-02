import React, { useState, useEffect } from "react";
import { View, Text, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native'
import { countryList, objectImageList, objectNameList } from "../../data/Data";

const GuessTheCountryScreen = (props) => {
    const [answer, setAnswer] = useState('');
    const [index, setIndex] = useState()

    // state check the Answer
    const [result, setResult] = useState('')

    // state for scoring
    const [score, setScore] = useState(0)

    // navigation as parameter
    const { navigation } = props;

    const randomIndex = () => {
        const pickRandomIndex = Math.floor(Math.random()*countryList.length);
        setIndex(pickRandomIndex);
    }

    // Check Answer
    const checkAnswer = () => {
        if(answer.toLowerCase() === countryList[index]){
            setResult('true')
            setScore(score + 10)
        } else {
            setResult('false')
        }

        setTimeout(() => {
            setResult('');
            setAnswer('');
            randomIndex();
        }, 1500)
    }

    useEffect(() => {
        if(score === 50){
            navigation.navigate('Win')
        }
    }, [score])

    // useEffect(() => {
    //     randomIndex();
    // }, [])

    // Reset the score when we play again
    useEffect(() => {
        const homePage = navigation.addListener('focus', () => {
            randomIndex();
            setScore(0)
        })
        return homePage;
    }, [])

    // Check if index is valid and objectImageList has data
    const imageSource = index >= 0 && objectImageList[index] ? { uri: objectImageList[index]} : null;

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1}}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Text style={{ textDecorationLine: 'underline', fontSize: 28, fontFamily:'serif', marginBottom: 16}}>
                    Guess The Country
                </Text>
                {/* Use this structure when error "ReactImageView: Image source "null" doesn't exist" appear */}
                {
                    imageSource ?
                    (<Image 
                        style={{width: 250, height: 250, borderRadius: 10}}
                        source={imageSource}
                    />) :
                    <Text>Loading image ...</Text>
                }
                {/* <Image 
                    style={{width: 250, height: 250, borderRadius: 10}}
                    source={{uri: objectImageList[index]}}
                /> */}
                <View style={{ margin: 8, backgroundColor: 'lavender', padding: 4, borderWidth: 1}}>
                    <Text style={{ fontSize: 18}}>
                        {objectNameList[index]}
                    </Text>
                </View>
                <View style={{ flexDirection: 'row', margin: 8}}>
                    <TextInput 
                        style={{ borderWidth: 1, width: '50%'}} 
                        placeholder="Write your answer" 
                        onChangeText={(text) => setAnswer(text)}
                        value={answer}
                    />
                    <TouchableOpacity
                        style={{
                            borderWidth: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 10,
                            padding: 8,
                            marginLeft: 8,
                            marginBottom: 8,
                            marginTop: 8,
                            backgroundColor: 'skyblue'
                        }}
                        onPress={() => checkAnswer()}
                    >
                        <Text style={{ fontSize: 18 }}>
                            Submit
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Component that shows result */}
                <Text>{result}</Text>

                {/* Component that shows score */}
                <View style={{ justifyContent: 'center', alignItems: 'center', padding: 16}}>
                    <View style={{ borderWidth: 1, padding: 8, alignItems: 'center', backgroundColor: 'mistyrose', borderRadius: 20}}>
                        <Text>Score : {score}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
};

export default GuessTheCountryScreen;