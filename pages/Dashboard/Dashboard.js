import React, { Component } from 'react';
import { Pressable, StyleSheet, Text, View, SafeAreaView, ScrollView, Alert, Modal } from 'react-native';
import * as Font from "expo-font";
import {createGameLetters, getPremadeGames} from "../../utils";
import ReactTimer from '@xendora/react-timer';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const myIcon = <Icon name="bars" size={20} color="white" />;

class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            foo: 'bar',
            fontsLoaded: false,
            wordEntry: '',
            loading: true,
            answers: [],
            message: '',
            points: 0,
            isOpen: false,
            showInstructions: false,
            showFeatureBacklog: false,
            level: 'beginner',
            gameLetters: '',
            gameIndex: 0,
            loadedGames: [],
            modalVisible: false
        }
    }

    setModalVisible = (visible) => {
        this.setState({ modalVisible: visible });
    }

    async loadFonts() {
        await Font.loadAsync({
            BasicHandwriting: require('../../assets/fonts/Basic_handwriting-Regular.otf'),
        });
        this.setState({ fontsLoaded: true });
    }

    componentDidMount() {
        this.loadFonts();
        const games = getPremadeGames();
        this.setState({
            loadedGames: games,
            game: games[this.state.gameIndex],
            gameLetters: games[this.state.gameIndex].gameLetters,
            loading: false,
            wordEntry: '',
            answers: [],
            message: '',
            points: 0,
            isOpen: false,
            showInstructions: false,
            showFeatureBacklog: false,
            level: 'beginner'
        });
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    createGame() {
        this.setState({
            loading: true,
            isOpen: false,
            showInstructions: false,
            showFeatureBacklog: false,
        }, () => {
            let { loadedGames, gameIndex } = this.state;
            if (gameIndex >= loadedGames.length -1) {
                gameIndex = -1;
            }
            ++ gameIndex;
            this.setState({
                game: loadedGames[gameIndex],
                gameIndex: gameIndex,
                gameLetters: loadedGames[gameIndex].gameLetters,
                loading: false,
                wordEntry: '',
                answers: [],
                message: '',
                points: 0,
                isOpen: false,
                showInstructions: false,
                showFeatureBacklog: false,
                level: 'beginner',
                modalVisible: false
            })
        });
    }

    onEntryChange(letter) {
        let currentWordEntry = this.state.wordEntry;
        let me = this;
        currentWordEntry += letter;
        this.setState({
            wordEntry: currentWordEntry,
            message: ''
        }, () => {
            me.getWordEntry();
        });
    }

    onBackClick() {
        let currentWordEntry = this.state.wordEntry;
        currentWordEntry = currentWordEntry.slice(0, -1);
        this.setState({
            wordEntry: currentWordEntry,
            message: ''
        });
    }

    onShuffleLetters() {
        let { gameLetters } = this.state;
        let arr = gameLetters.split('');
        arr.sort(() => {
            return 0.5 - Math.random();
        });
        gameLetters = arr.join('');
        this.setState({
            gameLetters: gameLetters
        });
    }

    onSubmit() {
        let {wordEntry, game, answers, points, message } = this.state;
        if (!wordEntry.includes(game.magicLetter)) {
            this.setState({
                message: `Must use the magic letter.`,
                wordEntry: ''
            })
        } else if (wordEntry.length < 4) {
            this.setState({
                message: `Four letter minimum.`,
                wordEntry: ''
            })
        } else if (game.words.indexOf(wordEntry) >= 0) {
            if (answers.indexOf(wordEntry) === -1) {
                answers.push(wordEntry);
                if (game.pangram.indexOf(wordEntry) >= 0) {
                    points = points + 20;
                    message = 'PANGRAM! +20 Points'
                } else {
                    points = points + wordEntry.length;
                    message = `Great! +${wordEntry.length} Points`
                }
                let me = this;
                this.setState({
                    message: message,
                    answers: answers,
                    points: points,
                    wordEntry: ''
                }, function() {
                    me.updateLevel();
                })
            } else {
                this.setState({
                    message: `Already found.`,
                    wordEntry: ''
                })
            }
        } else {
            this.setState({
                message: `Not in our list.`,
                wordEntry: ''
            })
        }
        setTimeout(() => {
            this.setState({
                message: ''
            })
        }, 2000);
    }

    convertSecondsToTime(time) {
        let date = new Date(0);
        date.setSeconds(time);
        return date.toISOString().substr(11, 8);
    }

    updateLevel() {
        const { game, points } = this.state;
        switch(true) {
            case game.levels[1] > points && points >= game.levels[0]:
                this.setState({
                    level: 'intermediate'
                });
                break;
            case game.levels[2] > points && points >= game.levels[1]:
                this.setState({
                    level: 'awesome'
                });
                break;
            case game.levels[3] > points && points >= game.levels[2]:
                this.setState({
                    level: 'advanced'
                });
                break;
            case game.levels[4] > points && points >= game.levels[3]:
                this.setState({
                    level: 'incredible'
                });
                break;
            case game.levels[5] > points && points >= game.levels[4]:
                this.setState({
                    level: 'genius'
                });
                break;
            case points > game.levels[4]:
                this.setState({
                    level: 'complete!'
                });
                break;
            default:
                this.setState({
                    level: 'beginner'
                });
                break;
        }
    }

    getWordEntry() {
        let { wordEntry, game } = this.state;
        wordEntry = wordEntry.toUpperCase();
        let arr = wordEntry.split('');
        return arr.map((letter, index) => {
            if (letter === game.magicLetter.toUpperCase()) {
                return (
                    <Text style={styles.entryMagicLetter} key={`${letter}-${index}`}>{letter}</Text>
                )
            } else {
                return (
                    <Text key={`${letter}-${index}`}>{letter}</Text>
                )
            }
        });
    }

    changeFoo = () => {
        let newValue;
        if (this.state.foo === 'bar') {
            newValue = 'notBar';
        } else {
            newValue = 'bar';
        }
        this.setState({
            foo: newValue
        })
    }
    render() {
        const { modalVisible } = this.state;
        return (
            <View style={styles.app}>
                {this.state.loading || !this.state.fontsLoaded ? <Text style={styles.loadingText}>...Loading</Text> :
                    <View style={styles.outerContainer}>
                        <View style={styles.toolbar}>
                            <Pressable onPress={() => this.setModalVisible(true)}>
                                <Text style={styles.main}>{myIcon}</Text>
                            </Pressable>
                            <Text style={styles.title}>PANGRAM</Text>
                            <View style={styles.spacerBetweenButtonsToolbar} />
                        </View>
                        <View style={styles.statsContainer}>
                            <ReactTimer
                                start={0}
                                end={() => false}
                                onEnd={value => console.log('ENDED WITH VALUE', value)}
                                onTick={value => value + 1}
                            >
                                {time => <Text style={styles.stats}>{this.convertSecondsToTime(time)}</Text>}
                            </ReactTimer>
                            <Text style={styles.stats}>{this.state.level}</Text>
                            <View style={styles.spacerBetweenButtons} />
                            <Text style={styles.stats}>{this.state.points} Points</Text>
                        </View>
                        <SafeAreaView style={styles.responseContainerSafeArea}>
                            <ScrollView style={styles.responsesContainer} contentContainerStyle={styles.responseContainerSafeArea}>
                                <Text style={styles.responseText}>
                                    <Text>Words found:  </Text>
                                    {this.state.answers.map((answer, index) => {
                                        return (
                                            <Text key={answer}>
                                                {answer}
                                                {this.state.game.pangram.indexOf(answer) >= 0 ?
                                                    <Text>(pangram!)</Text> : null
                                                }
                                                {this.state.answers.length > (index + 1) ? <Text>, </Text> : null}
                                            </Text>
                                        )})}
                                </Text>
                            </ScrollView>
                        </SafeAreaView>
                        <Text style={styles.entryLetters}>{this.getWordEntry()}</Text>
                        <View>

                            <View style={styles.row}>
                                <Pressable onPress={() => this.onEntryChange(this.state.gameLetters[0])}>
                                    <Text style={styles.letterButton}>{this.state.gameLetters[0].toUpperCase()}</Text>
                                </Pressable>
                            </View>
                            <View style={styles.row}>
                                <Pressable onPress={() => this.onEntryChange(this.state.gameLetters[1])}>
                                    <Text style={styles.letterButton}>{this.state.gameLetters[1].toUpperCase()}</Text>
                                </Pressable>
                                <View style={styles.spacerBetweenButtons} />
                                <Pressable onPress={() => this.onEntryChange(this.state.gameLetters[2])}>
                                    <Text style={styles.letterButton}>{this.state.gameLetters[2].toUpperCase()}</Text>
                                </Pressable>
                            </View>
                            <View style={styles.row}>
                                <Pressable onPress={() => this.onEntryChange(this.state.game.magicLetter)}>
                                    <Text style={styles.magicLetterButton}>{this.state.game.magicLetter.toUpperCase()}</Text>
                                </Pressable>
                            </View>
                            <View style={styles.row}>
                                <Pressable onPress={() => this.onEntryChange(this.state.gameLetters[3])}>
                                    <Text style={styles.letterButton}>{this.state.gameLetters[3].toUpperCase()}</Text>
                                </Pressable>
                                <View style={styles.spacerBetweenButtons} />
                                <Pressable onPress={() => this.onEntryChange(this.state.gameLetters[4])}>
                                    <Text style={styles.letterButton}>{this.state.gameLetters[4].toUpperCase()}</Text>
                                </Pressable>
                            </View>
                            <View style={styles.row}>
                                <Pressable onPress={() => this.onEntryChange(this.state.gameLetters[5])}>
                                    <Text style={styles.letterButton}>{this.state.gameLetters[5].toUpperCase()}</Text>
                                </Pressable>
                            </View>
                            <View style={styles.actionButtonRow}>
                                <Pressable onPress={() => this.onBackClick()}>
                                    <Text style={styles.main}>DELETE</Text>
                                </Pressable>
                                <Pressable onPress={() => this.onShuffleLetters()}>
                                    <Text style={styles.main}>SHUFFLE</Text>
                                </Pressable>
                                <Pressable onPress={() => this.onSubmit()}>
                                    <Text style={styles.main}>SUBMIT</Text>
                                </Pressable>
                            </View>
                            <View style={styles.messageContainer}>
                                {this.state.message === '' ? null :
                                    <Text style={styles.messageText}>{this.state.message}</Text>
                                }
                            </View>
                        </View>
                    </View>
                }
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        this.setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Pressable
                                onPress={() => this.createGame()}
                            >
                                <Text style={styles.modalButton}>New Game</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => this.createGame()}
                            >
                                <Text style={styles.modalButton}>Instructions</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => this.createGame()}
                            >
                                <Text style={styles.modalButton}>Upcoming Features</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => this.setModalVisible(!modalVisible)}
                            >
                                <Text style={styles.modalButton}>Close</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

let buttonSize = 75;
let buttonRowMargin = -40;
let buttonBorderRadius = 38;
let buttonSpacerWidth = 75;
let buttonFontSize = 30;

if(windowWidth < 350) {
    buttonSize = 60;
    buttonRowMargin = -45;
    buttonBorderRadius = 30;
    buttonSpacerWidth = 40;
    buttonFontSize = 20;
}

const styles = StyleSheet.create({
    main: {
        fontFamily: "BasicHandwriting",
        fontSize: 15,
        textAlign: "center",
        margin: 10,
        padding: 10,
        borderRadius: 15,
        borderColor: 'white',
        borderWidth: 2,
        borderStyle: 'solid',
        color: 'white'
    },
    letterButton: {
        fontFamily: "BasicHandwriting",
        fontSize: buttonFontSize,
        textAlign: "center",
        margin: 10,
        borderRadius: buttonBorderRadius,
        borderColor: 'white',
        borderWidth: 2,
        borderStyle: 'solid',
        width: buttonSize,
        height: buttonSize,
        paddingTop: 18,
        color: 'white'
    },
    magicLetterButton: {
        fontFamily: "BasicHandwriting",
        fontSize: buttonFontSize,
        textAlign: "center",
        margin: 10,
        borderRadius: buttonBorderRadius,
        borderColor: 'yellow',
        borderWidth: 2,
        borderStyle: 'solid',
        color: 'yellow',
        width: buttonSize,
        height: buttonSize,
        paddingTop: 18
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        position: 'relative',
        marginTop: buttonRowMargin
    },
    app: {
        backgroundColor: 'black'
    },
    spacerBetweenButtons: {
        width: buttonSpacerWidth
    },
    spacerBetweenButtonsToolbar: {
        width: 65
    },
    entryLetters: {
        marginBottom: 40,
        marginRight: 40,
        marginLeft: 10,
        marginTop: 10,
        height: 60,
        fontFamily: "BasicHandwriting",
        fontSize: 30,
        textAlign: "center",
        padding: 10,
        color: 'white',
        width: '95%'
    },
    entryMagicLetter: {
        color: 'yellow'
    },
    actionButtonRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
        position: 'relative'
    },
    messageContainer: {
        height: 75,
        color: 'white',
        marginBottom: 20
    },
    messageText: {
        fontFamily: "BasicHandwriting",
        fontSize: 15,
        textAlign: "center",
        margin: 10,
        padding: 10,
        color: 'white'
    },
    responseContainerSafeArea: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    responsesContainer: {
        height: 100,
        color: 'white',
        margin: 10,
        borderRadius: 15,
        borderColor: 'white',
        borderWidth: 1,
        borderStyle: 'solid',
        width: '85%'
    },
    responseText: {
        fontFamily: "BasicHandwriting",
        fontSize: 15,
        textAlign: "center",
        margin: 10,
        color: 'white'
    },
    loadingText: {
        color: 'white',
        fontSize: 50
    },
    stats: {
        fontFamily: "BasicHandwriting",
        fontSize: 15,
        textAlign: "center",
        margin: 10,
        color: 'white'
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center'
    },
    toolbar: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontFamily: "BasicHandwriting",
        fontSize: 32,
        textAlign: "center",
        margin: 10,
        padding: 10,
        color: 'white'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalButton: {
        fontFamily: "BasicHandwriting",
        fontSize: 15,
        textAlign: "center",
        margin: 10,
        padding: 10,
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 2,
        borderStyle: 'solid',
        color: 'black',
        elevation: 2,
        width: 200
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        fontFamily: "BasicHandwriting",
        fontSize: 15,
        textAlign: "center",
        margin: 10,
        padding: 10,
        color: 'black'
    },
    outerContainer: {
        height: '100%',
        display: 'flex',
        justifyContent: 'space-between'
    }
});

export default Dashboard;