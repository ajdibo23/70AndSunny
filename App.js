import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, ScrollView, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import React, { useState } from 'react';
import * as Linking from 'expo-linking';
import * as Location from 'expo-location';

export default function App() {
  const [start, setStart] = useState('illinois');
  const [data, setData] = useState({});
  const [buttonClicked, setButtonClicked] = useState(false);
  const [searching, setSearching] = useState(false);
  const [SortByTotal, setSortByTotal] = useState(false);
  const [total, setTotal] = useState([]);

  const renderCard = (item) => {
    const randomKey = Math.random().toString(36).substring(7);
    return (
      <TouchableOpacity key={randomKey} style={styles.card} onPress={() =>
        Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${item.name}`)}>
        <View style={styles.center}>
          <Text style={styles.bold}>Weather Near {item.name}</Text>
        </View>
        <Text>Temperature: {item.temp}°</Text>
        <Text>Current Weather: {item.weather}</Text>
        <Text>{item.rain}</Text>
      </TouchableOpacity>
    );
  }

  const handleSearch = () => {
    setSearching(true);
    fetch(`https://weather.ajdev.pro/${start}/a`)
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        let all = [];
        Object.keys(json).forEach((key) => {
          for (let i = 0; i < json[key].length; i++) {
            all.push(json[key][i]);
          }
        });
        all.sort((a, b) => {
          if (a.temp < b.temp) {
            return -1;
          }
          if (a.temp > b.temp) {
            return 1;
          }
          return 0;
        });
        all = all.reverse();
        setTotal(all);
        setButtonClicked(true);
        setSearching(false);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>70andSunny</Text>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={start}
        onValueChange={(itemValue) => setStart(itemValue)}>
        <Picker.Item label="Alabama" value="alabama" />
        <Picker.Item label="Alaska" value="alaska" />
        <Picker.Item label="Arizona" value="arizona" />
        <Picker.Item label="Arkansas" value="arkansas" />
        <Picker.Item label="California" value="california" />
        <Picker.Item label="Colorado" value="colorado" />
        <Picker.Item label="Connecticut" value="connecticut" />
        <Picker.Item label="Delaware" value="delaware" />
        <Picker.Item label="Florida" value="florida" />
        <Picker.Item label="Georgia" value="georgia" />
        <Picker.Item label="Hawaii" value="hawaii" />
        <Picker.Item label="Idaho" value="idaho" />
        <Picker.Item label="Illinois" value="illinois" />
        <Picker.Item label="Indiana" value="indiana" />
        <Picker.Item label="Iowa" value="iowa" />
        <Picker.Item label="Kansas" value="kansas" />
        <Picker.Item label="Kentucky" value="kentucky" />
        <Picker.Item label="Louisiana" value="louisiana" />
        <Picker.Item label="Maine" value="maine" />
        <Picker.Item label="Maryland" value="maryland" />
        <Picker.Item label="Massachusetts" value="massachusetts" />
        <Picker.Item label="Michigan" value="michigan" />
        <Picker.Item label="Minnesota" value="minnesota" />
        <Picker.Item label="Mississippi" value="mississippi" />
        <Picker.Item label="Missouri" value="missouri" />
        <Picker.Item label="Montana" value="montana" />
        <Picker.Item label="Nebraska" value="nebraska" />
        <Picker.Item label="Nevada" value="nevada" />
        <Picker.Item label="New Hampshire" value="new hampshire" />
        <Picker.Item label="New Jersey" value="new jersey" />
        <Picker.Item label="New Mexico" value="new mexico" />
        <Picker.Item label="New York" value="new york" />
        <Picker.Item label="North Carolina" value="north carolina" />
        <Picker.Item label="North Dakota" value="north dakota" />
        <Picker.Item label="Ohio" value="ohio" />
        <Picker.Item label="Oklahoma" value="oklahoma" />
        <Picker.Item label="Oregon" value="oregon" />
        <Picker.Item label="Pennsylvania" value="pennsylvania" />
        <Picker.Item label="Rhode Island" value="rhode island" />
        <Picker.Item label="South Carolina" value="south carolina" />
        <Picker.Item label="South Dakota" value="south dakota" />
        <Picker.Item label="Tennessee" value="tennessee" />
        <Picker.Item label="Texas" value="texas" />
        <Picker.Item label="Utah" value="utah" />
        <Picker.Item label="Vermont" value="vermont" />
        <Picker.Item label="Virginia" value="virginia" />
        <Picker.Item label="Washington" value="washington" />
        <Picker.Item label="West Virginia" value="west virginia" />
        <Picker.Item label="Wisconsin" value="wisconsin" />
        <Picker.Item label="Wyoming" value="wyoming" />
      </Picker>
      <Pressable style={styles.button} onPress={handleSearch}>
        <Text style={{ color: 'white' }}>Search</Text>
      </Pressable>
      {searching ? (
        <Text style={styles.noDataText}>Loading...</Text>
      ) : (
        <Text style={styles.noDataText}></Text>
      )}
      {!SortByTotal && buttonClicked && !searching ? (
        <View style={{ top: 50 }}>
          <View style={styles.card} key="aa">
            <View style={styles.center} key="aa">
              <Text style={styles.text2}>Searching Weather In {start[0].toUpperCase() + start.slice(1)}</Text>
            </View>
            <Pressable style={styles.button2} onPress={() => {
              setButtonClicked(false)
              setData({})
            }}>
              <Text style={{ color: 'white' }}>Clear</Text>
            </Pressable>
            <Pressable style={styles.button2} onPress={() => {
              setSortByTotal(true)
            }}>
              <Text style={{ color: 'white' }}>Sort By Temperature</Text>
            </Pressable>
          </View>
          <ScrollView>
            {data['Sunny'].map((item) => renderCard(item))}
            {data['Mostly Clear'].map((item) => renderCard(item))}
            {data['Partly Cloudy'].map((item) => renderCard(item))}
            {data['Cloudy'].map((item) => renderCard(item))}
            {data['Mostly Cloudy'].map((item) => renderCard(item))}
            <View style={{height: 120}}>
              <Text></Text>
            </View>
          </ScrollView>
        </View>
      ) : (
        <Text></Text>
      )}
      {SortByTotal && buttonClicked && !searching ? (
        <View style={{ top: 50 }}>
          <View style={styles.card} key="aa">
            <View style={styles.center} key="aa">
              <Text style={styles.text2}>Searching Weather In {start[0].toUpperCase() + start.slice(1)}</Text>
            </View>
            <Pressable style={styles.button2} onPress={() => {
              setButtonClicked(false)
              setData({})
              setSortByTotal(false)
            }}>
              <Text style={{ color: 'white' }}>Clear</Text>
            </Pressable>
            <Pressable style={styles.button2} onPress={() => {
              setSortByTotal(false)
            }}>
              <Text style={{ color: 'white' }}>Sort by Group</Text>
            </Pressable>
          </View>
          <ScrollView>
            {total.map((item) => renderCard(item))}
            <View style={{height: 120}}>
              <Text></Text>
            </View>
          </ScrollView>
        </View>
      ) : (
        <Text></Text>
      )}
      {!buttonClicked ? (
        <Text style={styles.noDataText}>Select Your State To Start!</Text>
      ) : (
        <Text></Text>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#F28C38',
    justifyContent: 'center',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 30,
    color: '#fff',
  },
  picker: {
    width: '100%',
    height: 30,
    backgroundColor: '#fff',
    borderColor: '#F28C38',
    borderWidth: 2,
    top: -300,
  },
  pickerItem: {
    color: '#F28C38',
  },
  button: {
    top: -125,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  button2: {
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
  },
  text: {
    fontSize: 30,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  text2: {
    fontSize: 20,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'black',
  },
  card: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
});