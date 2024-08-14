import { Text, View, TouchableOpacity, ScrollView, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useContext, useEffect, useState, useRef } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import moment from 'moment';
import { AuthContext } from '../../context/AuthContext';
import styles from './styles';
import pickerSelectStyles from'./styles'
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import * as XLSX from 'xlsx'
import RNFS from 'react-native-fs';
import RNPickerSelect from 'react-native-picker-select';
import config from '../../Configurations/APIConfig';

const WaterUsage = () => {
  const dateFrom0 = new Date(Date.now());
  const dateTo0 = new Date(Date.now());
  const dateweek = dateTo0.getDate();
  const dateFrom3 = new Date(dateTo0).setDate(dateweek - 7);
  const dateFromWeekly = moment(dateFrom3).format('DD-MM-YYYY');
  const dateFromWeekly1 = moment(dateFrom3).format('YYYY-MM-DD');
  const dateFromToday = moment(dateFrom0).format('DD-MM-YYYY');
  const dateFromToday1 = moment(dateFrom0).format('YYYY-MM-DD');
  const [dateFrom, setDateFrom] = useState(new Date(Date.now()));
  const [dateTo, setDateTo] = useState(new Date(Date.now()));
  const [showFrom, setShowFrom] = useState(false);
  const [showTo, setShowTo] = useState(false);
  const [waterUsage, setWaterUsage] = useState([]);
  const { userInfo } = useContext(AuthContext);
  const [deviceIds, setDeviceIds] = useState([])
  const [deviceId, setDeviceId] = useState(null)
  const UserId = userInfo.userId
  

  
  const printPDF =  () => {
    const html = `<html>
    <head>
            <style>
              body {
                font-family: 'Helvetica';
                font-size: 16px;
              }
              
              table {
                width: 100%;
                border-collapse: collapse;
                
              }
              th, td {
                border: 1px solid #000;
                padding: 5px;
              }
              th {
                background-color: #ccc;
                font-size: 20px;
              }
            </style>
          </head>
      <body>
            <table>
                                                
                                                    <tr>
                                                        <th data-ordering="false">Id</th>
                                                        <th data-ordering="false">Date and Time</th>
                                                        <th data-ordering="false">Meter For</th>
                                                        <th data-ordering="false">Meter No</th>
                                                        <th data-ordering="false">Reading</th>
                                                    </tr>
                                                
                                               
                                                    ${ waterUsage.map((mr,index) =>
                                                       ` <tr>
                                                            <td>${index + 1}</td>
                                                            <td>${moment(mr.createdDate).format('MMM Do YYYY hh:mm a')}</td>
                                                            <td>${mr.deviceName}</td>
                                                            <td>${mr.meterNo}</td>
                                                            <td>${mr.payLoad_ASCII}</td>
                                                            <td>${mr.litres}</td>
                                                        </tr>
                                                        `
                                                        ,
                                                    )
                                                    .join('')
                                                    }
                                                
                                            </table>
          </body>
      </html>`;

      let options = {
        html,
      fileName: 'MeterReading',
      base64: true,
      directory: 'Documents',
      height:500,
      width:800
      };
      try{
        const pdf =  RNHTMLtoPDF.convert(options);
        Alert.alert('PDF Generated', `PDF saved to: ${pdf.filePath}`);
        const destPath = `${RNFS.DownloadDirectoryPath}/MeterReading.pdf`;
       RNFS.moveFile(pdf.filePath, destPath);
      Alert.alert('PDF Moved', `PDF moved to: ${destPath}`);
      }catch (error) {
        Alert.alert('Error', `Failed to generate PDF: ${error.message}`);
      }

    

    
  }
  
  const exportToExcel = () => {
    var fileName ="/MeterReading-" + moment(dateFrom3).format('DDMMYYYY') + "-" + moment(dateTo0).format('DDMMYYYY');
    
    // Create a new workbook
    const wb = XLSX.utils.book_new();
    // Convert the JSON data to a worksheet
    const ws = XLSX.utils.json_to_sheet(waterUsage);
    // Add the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    const wbout = XLSX.write(wb, { type: 'binary', bookType: "xlsx" });
    const filePath = `${RNFS.DocumentDirectoryPath}/MeterReading.xlsx`;

    // Save the workbook as an Excel file
    RNFS.writeFile(RNFS.DownloadDirectoryPath +`${fileName}.xlsx`, wbout, 'ascii').then((r) => {
      Alert.alert('Excel file saved at:', filePath)

   }).catch((e) => {
       console.log('Error', e);
   });
    //XLSX.writeFile(wb, `${fileName}.xlsx`);
};

  const GetWaterUsageDetails = () => {
    axios.get(config.APIACTIVATEURL + config.GETMETERDATABYUSER + "?DeviceId=00000000-0000-0000-0000-000000000000"+ "&DateFrom="+ `${dateFromWeekly1}`+"&DateTo="+`${dateFromToday1}`+"&UserId="+`${UserId}`).then
      ((res) => {

        setWaterUsage(res.data.data);
        console.log(res.data.data)
        
      }
      ).catch(err => console.log(err));
  };

  const GetDetailsByDevice = () => {
    axios.get(config.APIACTIVATEURL + config.GETMETERDATABYUSER + "?DeviceId="+`${deviceId}`+"&DateFrom="+`${dateFromWeekly1}`+"&DateTo="+`${dateFromToday1}`+"&UserId="+`${UserId}`).then
      ((res) => {

        setWaterUsage(res.data.data);
        console.log(res.data.data)
        
      }
      ).catch(err => console.log(err));
  };

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
  const GetDevices = () => {
    axios
        .get(config.APIACTIVATEURL + config.GETUSERDEVICEBYUSER + "?UserId="+`${UserId}`)
        .then((response) => {
           setDeviceIds(response.data.data)
            console.log(response.data.data)
        });
};

const staticOptions = [
  { label: 'All Devices', value: '00000000-0000-0000-0000-000000000000' },
];

const DynamicOptions = deviceIds.map(item => ({
  label: item.deviceName,
  value: item.deviceId,   
}));

const combinedOptions = [...staticOptions, ...DynamicOptions];

  const Search = () => {
    GetDetailsByDevice();
  };

  useEffect(() => {
    GetDevices();
    GetWaterUsageDetails();
    
  },
    []);
  return (
    <ScrollView style={{ height: "auto" }}>
      <View style={styles.page}>
        <View style={styles.topView}>
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
        <View style={styles.devices}>
          
        <RNPickerSelect
            onValueChange={(value) => setDeviceId(value)}
            value={deviceId}
            items={combinedOptions}
            placeholder={{ label: 'Select an option...', value: null }}
            style={{
              ...pickerSelectStyles,
              placeholder: {
              color: '#088675',
              fontSize: 12,
              fontWeight: 'bold',
            },}}
        />
        </View>
        
          <TouchableOpacity style={styles.btnStyle}>
            <Text
              style={styles.textStyle}
              onPress={Search}
            >Search</Text>
          </TouchableOpacity>
        </View>

        <View>
          <View style={styles.usageView}>
          <Text style={styles.usageText}>Water Usage Data</Text>
          <View style={styles.btnView}>
            <TouchableOpacity
              style={[styles.btn1Style]}
              onPress={printPDF}>
              <Text style={styles.textStyle}>PDF</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.btn2Style]}
              onPress={exportToExcel}>
              <Text style={styles.textStyle}>Excel</Text>
            </TouchableOpacity>
            </View>
          </View>
          {waterUsage.length>0 ?
            waterUsage.map((xyz, index) =>
              <View key={xyz.createdDate}>
                <View style={{ margin: 10 }}>
                  <View style={styles.usageboxView} >
                    <Text style={styles.usageboxheading}>ID : <Text style={styles.usageboxText}>{index + 1}</Text></Text>
                    <Text style={styles.usageboxheading}>Date and Time : <Text style={styles.usageboxText}>{moment(xyz.createdDate).format('MMM Do YYYY, h:mm a')} </Text></Text>
                    <Text style={styles.usageboxheading}>Meter For : <Text style={styles.usageboxText}>{xyz.deviceName}</Text></Text>
                    <Text style={styles.usageboxheading}>Meter No : <Text style={styles.usageboxText}>{xyz.meterNo}</Text></Text>
                    <Text style={styles.usageboxheading}>Reading : <Text style={styles.usageboxText}>{xyz.payLoad_ASCII}</Text></Text>
                    <Text style={styles.usageboxheading}>Usage : <Text style={styles.usageboxText}>{xyz.litres} Litres</Text></Text>
                  </View>
                  
                </View>
              </View>
              
            ) : <View style={{ margin: 10 }}><Text style={{color:"black",fontSize:20}}>No Records</Text></View>
          }
        </View>
      </View>
    </ScrollView>
  );
};
export default WaterUsage;