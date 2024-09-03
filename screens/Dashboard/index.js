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
import Spinner from 'react-native-loading-spinner-overlay';

const Dashboard = ({navigation}) => {
  const scrollRef = useRef();
  const oneWeekBack = new Date();
  oneWeekBack.setDate(oneWeekBack.getDate() - 7);
  const [dateFrom, setDateFrom] = useState(oneWeekBack);
  const dateFromWeekly = moment(dateFrom).format('DD-MM-YYYY');
  const dateFromWeekly1 = moment(dateFrom).format('YYYY-MM-DD');
  const [dateTo, setDateTo] = useState(new Date());
  const dateFromToday = moment(dateTo).format('DD-MM-YYYY');
  const dateFromToday1 = moment(dateTo).format('YYYY-MM-DD');
  const [details, setDetails] = useState([]);
  const [leak, setLeak] = useState(0);
  const [barData, setBarData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [series1, setSeries1] = useState([]);
  const [series2, setSeries2] = useState([]);
  const [series3, setSeries3] = useState([]);
  const [name1, setName1] = useState("")
  const [name2, setName2] = useState("")
  const [name3, setName3] = useState("")
  const [seriesList, setSeriesList] = useState([])
  const [selectedDevice, setSelectedDevice] = useState('')
  const [devices, setDevices] = useState([]);
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  
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
    
    axios.get(config.APIACTIVATEURL + config.GETUSERBARGRAPHDATA + "?DateFrom="+`${dateFromWeekly1}`+"&DateTo="+`${dateFromToday1}`+"&UserId="+`${UserId}`).then
       ((res)=>
       {
        setBarData(res.data.data);
        setLabels(res.data.data.categories)
        setSeriesList(res.data.data.seriesList)
        setIsLoading(false)
          var [array1, array2,array3] = res.data.data.seriesList
          setSeries1(array1.data)
          setName1(array1.name)
          setSeries2(array2.data)
          setName2(array2.name)
          
          setSeries3(array3.data)
          setName3(array3.name)
          
       // console.log(res.data)
       
       
      }
       ).catch((err)=>{ console.log(err)});
       
    
  };
  
  
 
  
  
      const data4 = series1.map((v1,index)=>
      ({
        x:labels[index],y:v1
      }))
      const data5 = series2.map((v1,index)=>
        ({
          x:labels[index],y:v1
        }))
        const data6 = series3.map((v1,index)=>
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
    
    if (scrollRef.current) {
      scrollRef.current.scrollToEnd({ animated: true });
    }
    setIsLoading(true);
    
      GetBarGraphDataWeekly();
   
     // setIsLoading(false)
  };
 
  return (
    
      
    <ScrollView style={styles.page} ref={scrollRef}>
    
      <View style={styles.statList}>
        <View style={styles.statItem}>
          <Icon name="hours-24" size={65} color="white"></Icon>
          <Text style={styles.statItemTitle}>TODAY'S USAGE</Text>
          <Text style={styles.statItemData}>{details.todayCountData} litres</Text>
        </View>
        <View style={styles.statItem1}>
          <Icon name="calendar-week" size={65} color="white"></Icon>
          <Text style={styles.statItemTitle}>LAST 7 DAYS USAGE</Text>
          <Text style={styles.statItemData}>{details.weeklyCount} litres</Text>
        </View>
        <View style={styles.statItem2}>
          <Icon name="calendar-month" size={65} color="white"></Icon>
          <Text style={styles.statItemTitle}>CURRENT MONTH USAGE</Text>
          <Text style={styles.statItemData}>{details.monthlyCount} litres</Text>
        </View>
        <View style={styles.statItem3}>
          <Icon name="pipe-leak" size={65} color="white"></Icon>
          <Text style={styles.statItemTitle}>NO OF LEAKS</Text>
          <Text style={styles.statItemData}>{details.leaks}</Text>
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
            <Spinner visible={isLoading} />
            </TouchableOpacity>    
        </View>   
      <View style={styles.bottom}>
      <Text style={styles.graphDetails}>Water Consumption - Last Updated {moment(details.lastUpdated).format('MMM Do YYYY, h:mm a')}</Text>
        <View style={{marginTop:30,marginBottom:30}}>
        <VictoryChart
        domainPadding={{ x: 50, y: [0, 20] }} // Adjust domain padding for bar spacing
        padding={{ top: 80, bottom: 60, left: 50, right: 50 }} 
        theme={VictoryTheme.material}
        height={370}
        width={430}
        
        >
        
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
          <VictoryGroup offset={6}  >
          <VictoryBar data={data4} style={{data:{fill:"#3577f1"}, labels: { fill: 'black', fontSize: 12, fontWeight: 'bold' },}}
          labels={({ datum }) => datum.y !== 0 ? datum.y : ''}
          labelComponent={
            <VictoryLabel dy={-2} />
          }
          />
          <VictoryBar data={data5} style={{data:{fill:"#0ab39c"},labels: { fill: 'black', fontSize: 12, fontWeight: 'bold' },}} 
          labels={({ datum }) => datum.y !== 0 ? datum.y : ''}
          labelComponent={
            <VictoryLabel dy={-2} />
          }
          /> 
          <VictoryBar data={data6} style={{data:{fill:"#f7b84b",width:50},labels: { fill: 'black', fontSize: 12, fontWeight: 'bold' },}} 
          labels={({ datum }) => datum.y !== 0 ? datum.y : ''}
          labelComponent={
            <VictoryLabel dy={-2} />
          }
          /> 
          </VictoryGroup>
          <VictoryLegend
           x={100} // X position of the legend
           y={1}
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
              },
              {
                name:name3,
                symbol:{
                  fill:"#f7b84b"
                  
                }
              }
            ]
          }
          />
        </VictoryChart>
      </View>  
    </View>
    
    </ScrollView>
  );
};

export default Dashboard;