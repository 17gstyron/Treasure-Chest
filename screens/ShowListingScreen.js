import * as React from 'react';
import { StyleSheet, View, TextInput, Text, Button, Image, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios'
import StaticMap from './StaticMap';
import CustomHeader from '../components/CustomHeader';

 const ShowListingScreen = ({ navigation, route }) => {
   const defaultParams = {name: 'Jordans', description: 'Gunmetal Blue\nSize 13', price: 200.00, zipcode: 70116, negotiable: true, id: 14 }
   const { idListing } = !route.params ? defaultParams  : route.params ;
   const [post, setPost] = React.useState({})
   const [image, setImage] = React.useState('');

   let url = '10.0.2.2';

  const getListing = async (id) => {
    await axios.get(`http://${url}:8080/listing/${id}`)
      .then(post => setPost(post.data))
      .catch(e => console.error(e));
  }
  const getImage = async (id) => {
    await axios.get(`http://${url}:8080/listing/${id}/images`)
      .then(post => {
        console.log(post.data);
        setImage(''  + post.data[0].image);
      })
      .catch(e => console.error(e));
  }
React.useEffect(() =>{
  getListing(idListing)
  getImage(idListing)
}, [])
const styles = StyleSheet.create({
  compartment:{
    marginVertical: 25,
  },
  image:{
    alignSelf: 'center',
    height: 200,
    width: 200,
  },
  info:{
    fontSize: 26,
    marginRight: '10%'
  },
  buttons:{
    width: 125,
    height: 35,
    borderRadius: 5,
    backgroundColor: '#3FC184',
    marginRight: 15,
  }
});
const { name, description, price, zipcode} = post;
let map = <Text></Text>;
if(zipcode){
  map = <StaticMap zip={zipcode}></StaticMap>;
}

  return (
    // <View style={styles.compartment}>
    <ScrollView style={styles.compartment}>
      {/* <CustomHeader navigation={navigation} title="Listing" /> */}
      {/* <TouchableOpacity onPress={() => navigation.goBack()}><Text>Go Back</Text></TouchableOpacity> */}
      <Image style={styles.image} source={{ uri: image }}/>
      <View style={{marginVertical: 15, marginHorizontal: 15, flexDirection: 'row'}}>
        <Text style={styles.info}>{name}</Text>
        <Text style={styles.info}>{`$${price}`}</Text>
      </View>
      <View style={{marginHorizontal: '15%', flexDirection: 'row',}}>
        <TouchableOpacity onPress={() => {console.log('clicked')}} style={styles.buttons}>
          <Text style={{alignSelf:'center', marginTop:6 }}>Favorite</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttons}>
          <Text style={{alignSelf:'center', marginTop:6 }}>Message</Text>
        </TouchableOpacity>
      </View>
        <Text style={{marginHorizontal: 30, marginVertical: 30, fontSize: 17}}>{description}</Text>
        <View style={{alignItems: 'center'}}>
          {map}
        </View>
    </ScrollView>
  );
}

export default ShowListingScreen; 
