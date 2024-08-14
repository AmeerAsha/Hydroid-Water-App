import { View, Text, StyleSheet, ScrollView, TouchableOpacity,TouchableHighlight, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useContext, useEffect, useState, useRef } from 'react';
import {VictoryChart,VictoryGroup,VictoryBar, VictoryLegend,VictoryAxis,VictoryTheme,VictoryLabel} from 'victory-native'
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import styles from './styles';
import config from '../../Configurations/APIConfig';

const Dashboard = ({navigation}) => {
    const scrollRef = useRef();
  const dateFrom0 = new Date(Date.now());
  const dateTo0 = new Date(Date.now());
  const dateweek = dateTo0.getDate();
  const dateFrom3 = new Date(dateTo0).setDate(dateweek-7);
  const dateFromWeekly = moment(dateFrom3).format('DD-MM-YYYY');
  const dateFromWeekly1 = moment(dateFrom3).format('YYYY-MM-DD');
  const dateFromToday = moment(dateFrom0).format('DD-MM-YYYY');
  const dateFromToday1 = moment(dateFrom0).format('YYYY-MM-DD');
  console.log(dateFromToday);
  const [details, setDetails] = useState([]);
  const [leak, setLeak] = useState(0);
  const [barData, setBarData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [series1, setSeries1] = useState([]);
  const [series2, setSeries2] = useState([]);
  const [name1, setName1] = useState("")
  const [name2, setName2] = useState("")
  const [seriesList, setSeriesList] = useState([])
  const [selectedDevice, setSelectedDevice] = useState('')
  const [devices, setDevices] = useState([]);
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [dateFrom, setDateFrom] = useState(new Date(Date.now()));
  const [dateTo, setDateTo] = useState(new Date(Date.now())); 
  
  
  useEffect(()=>{
    GetDashboardData();
    GetBarGraphDataWeekly();
  },
  []);

  const {userInfo} = useContext(AuthContext);
  const UserId = userInfo.userId

  const GetDashboardData = () => {
    axios.get(config.APIACTIVATEURL + config.GETDASHBOARDCOUNT+"?UserId="+`${UserId}`).then
       ((res)=>
       {
        const response = (res.data.data);
        setDetails(response);
        
      }
       );
  };

  const GetleaksDetails = () => {
    axios.post(config.APIACTIVATEURL + config.GETLEAKDATA+"?UserId="+`${UserId}`).then
       ((res)=>
       {
        setLeak(res.data.data.length);
        console.log(res.data.data.length)
      }
       ).catch((err)=>{ console.log(err)});
  };

  const GetBarGraphDataWeekly = () => {
    
    axios.get(config.APIACTIVATEURL + config.GETUSERBARGRAPHDATA+"?DateFrom="+`${dateFromWeekly1}`+"&DateTo="+`${dateFromToday1}`+"&UserId="+`${UserId}`).then
       ((res)=>
       {
        setBarData(res.data.data);
        setLabels(res.data.data.categories)
        setSeriesList(res.data.data.seriesList)
          var [array1, array2] = res.data.data.seriesList
          setSeries1(array1.data)
          setName1(array1.name)
          setSeries2(array2.data)
          setName2(array2.name)
        console.log(series1)
      }
       ).catch((err)=>{ console.log(err)});
    
  };
  
  
  const data1 = {
    b1:[
      {x:labels[0] ,y:series1[0]},
      {x:labels[1] ,y:series1[1]},
      {x:labels[2] ,y:series1[2]},
      {x:labels[3] ,y:series1[3]},
      {x:labels[4] ,y:series1[4]},
      {x:labels[5] ,y:series1[5]},
      {x:labels[6] ,y:series1[6]},
    ],
    b2:[
      {x:labels[0] ,y:series2[0]},
      {x:labels[1] ,y:series2[1]},
      {x:labels[2] ,y:series2[2]},
      {x:labels[3] ,y:series2[3]},
      {x:labels[4] ,y:series2[4]},
      {x:labels[5] ,y:series2[5]},
      {x:labels[6] ,y:series2[6]},
    ]
    
  };
  const data2 = {
    b1:[
      {x:"4-jul-2024" ,y:0},
      {x:"5-jul-2024" ,y:0},
      {x:"6-jul-2024" ,y:30},
      {x:"7-jul-2024" ,y:10},
      {x:"8-jul-2024" ,y:30},
      {x:"9-jul-2024" ,y:0},
      {x:"10-jul-2024" ,y:20},
    ],
    b2:[
      {x:"4-jul-2024" ,y:0},
      {x:"5-jul-2024" ,y:0},
      {x:"6-jul-2024" ,y:220},
      {x:"7-jul-2024" ,y:290},
      {x:"8-jul-2024" ,y:140},
      {x:"9-jul-2024" ,y:240},
      {x:"10-jul-2024" ,y:260},
    ]
    
  };

  
      const data4 = series1.map((v1,index)=>
      ({
        x:labels[index],y:v1
      }))
      const data5 = series2.map((v1,index)=>
        ({
          x:labels[index],y:v1
        }))
  
  
  
  const dateFromHandle = (event, selectedDate) => {
    setDateFrom(selectedDate);
    setShowFrom(false);
  };
  const dateToHandle = (event, selectedDate) => {
    setDateTo(selectedDate);
    setShowTo(false);
  };

  const showDatepicker = (type) => {
    if (type === 'from') {
      setShowFrom(true);
      setShowTo(false);
    }

    if (type === 'to') {
      setShowTo(true);
      setShowFrom(false);
    }
  };
  const handleButtonClick = () => {
    GetBarGraphDataWeekly();
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
    
  };
 
  return (
    
      
    <ScrollView style={styles.page} ref={scrollRef}>
    
      <View style={styles.statList}>
        <View style={styles.statItem}>
          <Icon name="hours-24" size={65} color="white"></Icon>
          <Text style={styles.statItemTitle}>Last 24-hours</Text>
          <Text style={styles.statItemData}>{details.todayCountData} litres</Text>
        </View>
        <View style={styles.statItem1}>
          <Icon name="calendar-week" size={65} color="white"></Icon>
          <Text style={styles.statItemTitle}>Current week</Text>
          <Text style={styles.statItemData}>{details.weeklyCount} litres</Text>
        </View>
        <View style={styles.statItem2}>
          <Icon name="calendar-month" size={65} color="white"></Icon>
          <Text style={styles.statItemTitle}>Current month</Text>
          <Text style={styles.statItemData}>{details.monthlyCount} litres</Text>
        </View>
        <View style={styles.statItem3}>
          <Icon name="pipe-leak" size={65} color="white"></Icon>
          <Text style={styles.statItemTitle}>No. of leaks</Text>
          <Text style={styles.statItemData}>{leak}</Text>
        </View>
      </View>
      <TouchableHighlight style={styles.raiseticketButton} underlayColor="white">
            <Text 
            style = {styles.raiseticketText}
            onPress={() => navigation.navigate('New Ticket')}
            >Raise Ticket</Text>
            </TouchableHighlight>
            <View style={{margin:20}}>
        <Text style={styles.greeting}>Hello, {userInfo.name}!</Text>
        <Text style={styles.details}>Here's water consumption details .</Text>
      </View>  
      <View>
          <TouchableOpacity
            style={styles.dateBox}
            onPress={showDatepicker.bind(null, 'from')}
          >
            <Text style={styles.dateText}>{dateFromWeekly}</Text>
            <Icon name="calendar-month" size={30} color="#088675" />
          </TouchableOpacity>
          {showFrom && (
            <DateTimePicker
              value={dateFrom}
              mode={'date'}
              is24Hour={true}
              onChange={dateFromHandle}
            />
          )}
  
          <TouchableOpacity
            style={styles.dateBox}
            onPress={showDatepicker.bind(null, 'to')}
          >
            <Text style={styles.dateText}>{dateFromToday}</Text>
            <Icon name="calendar-month" size={30} color="#088675" />
          </TouchableOpacity>
          {showTo && (
            <DateTimePicker
              value={dateTo}
              mode={'date'}
              is24Hour={true}
              onChange={dateToHandle}
            />
          )}
          
         <TouchableOpacity style={styles.raiseticketButton}>
            <Text 
            style = {styles.raiseticketText}
           onPress={handleButtonClick}
            >Search</Text>
            </TouchableOpacity>    
        </View>   
      <View style={styles.bottom}>
      <Text style={styles.graphDetails}>Water Consumption - Last Updated {moment(details.lastUpdated).format('MMM Do YYYY, h:mm a')}</Text>
        <View style={{marginTop:30,marginBottom:30}}>
        <VictoryChart
        domainPadding={{ x: 1 }}
        theme={VictoryTheme.material}
        animate={{
          duration: 2000,
          onLoad: { duration: 1000 },
        }}
        >
        <VictoryLegend
          x={Dimensions.get('screen').width / 2 -100}
          y={Dimensions.get('screen').width /2 - 185}
          data={
            [
              {
                name:name1,
                symbol:{
                  fill:"#3577f1"
                }
              },
              {
                name:name2,
                symbol:{
                  fill:"#0ab39c"
                }
              }
            ]
          }
          />
          <VictoryAxis
          
          style={{
            ticks: { stroke: "#000" },
            tickLabels: {
              angle: -27, // Rotate labels on x-axis
              textAnchor: 'end', // Align text to the end
              fontSize: 12,
              color:"gray"
            }
          }}
        />
         <VictoryAxis
          dependentAxis
          
          style={{
            ticks: { stroke: "#000" },
            tickLabels: {
              fontSize: 14
            }
          }}
        />
          <VictoryGroup offset={8}  >
          <VictoryBar data={data4} style={{data:{fill:"#3577f1"}, labels: { fill: 'black', fontSize: 12, fontWeight: 'bold' },}} animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
            
          }}
          labelComponent={
            <VictoryLabel dy={-30} />
          }
          />
          <VictoryBar data={data5} style={{data:{fill:"#0ab39c"},labels: { fill: 'black', fontSize: 12, fontWeight: 'bold' },}} animate={{
            duration: 2000,
            onLoad: { duration: 1000 },
          }}
          labelComponent={
            <VictoryLabel dy={-90} />
          }
          /> 
          </VictoryGroup>
        </VictoryChart>
      </View>  
    </View>
    
    </ScrollView>
  );
};

export default Dashboard;