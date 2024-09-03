import {StyleSheet} from 'react-native';
import colors from '../../ui/colors'

export default StyleSheet.create({
    page: {
        backgroundColor: "#e9ebec",
        flex: 1,
        height:"auto"
      },
      dateBox: {
        borderColor: "white",
        backgroundColor: "#daf4f0",
        borderWidth: 3,
        margin: 10,
        borderRadius: 20,
        display: 'flex',
        flexDirection: 'row',
        padding: 8,
      },
      dateText: {
        flex: 1,
        fontSize: 18,
        textAlign: 'center',
        fontWeight: '700',
        color: "#088675",
      },
      item: {
        margin: 10,
        borderRadius: 5,
        backgroundColor: colors.primary,
        padding: 15,
      },
      itemId: {
        color: colors.tertiary,
        fontSize: 24,
        fontWeight: '800',
      },
      itemInfo: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: colors.tertiary2,
        borderBottomWidth: 1,
        borderStyle: 'dashed',
      },
      itemInfoHead: {
        color: colors.tertiary,
        fontSize: 16,
        lineHeight: 30,
        fontWeight: '600',
      },
      itemInfoBody: {
        color: colors.tertiary,
        fontSize: 16,
        lineHeight: 30,
        fontWeight: '500',
      },
      topView:{
        backgroundColor:"#e9ebec"
      },
      searchButton:{
        margin:10,alignItems:"center",justifyContent:"center"
      },
      searchText:{
        borderRadius:5,
              backgroundColor:"#088675",
              height:40,
              fontSize:18,
              alignItems:"center",
              verticalAlign:"middle",
              padding:10,
              color:"white",
      },
      usageView:{
        margin:10,
      },
      usageText:{
        fontSize:21,marginTop:10,marginLeft:20,fontWeight:"bold",color:"black",marginBottom:20
      },
      nodataText:{
        fontSize:18,marginLeft:20,color:"black",marginBottom:20
      },
      usageboxView:{
        borderWidth:3,backgroundColor:"#daf4f0",borderColor:"white",borderRadius:20,margin:10,width:300
      },
      usageboxheading:{
        fontSize:16,margin:10,color:"#088675",fontWeight:"bold"
      },
      usageboxText:{
        fontSize:15,margin:10,color:"#088675",fontWeight:"400"
      },titleText: {
        textAlign: 'center',
        marginVertical: 20,
        marginHorizontal: 15,
      },
      textStyle: {
        color: 'white',
        fontSize: 16,
        paddingHorizontal: 17,
      },
      btnView:{
        flex:1,
        flexDirection:"row",
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        
      },
      btnStyle: {
        backgroundColor: '#088675',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 10,
        width: 100,
        height: 40,
      },
      btn1Style: {
        backgroundColor: '#088675',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        width: 65,
        height: 30,
        marginHorizontal:10
      },
      btn2Style: {
        backgroundColor: '#6559cc',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        width: 120,
        height: 40,
        marginHorizontal:10
      },
      devices:{
       
          borderColor: "white",
          backgroundColor: "#daf4f0",
          borderWidth: 3,
          margin: 10,
          borderRadius: 20,
          
        
      },
      icon: {
        backgroundColor: 'transparent',
        borderTopWidth: 10,
        borderTopColor: 'gray',
        borderRightWidth: 10,
        borderRightColor: 'transparent',
        borderLeftWidth: 10,
        borderLeftColor: 'transparent',
        width: 0,
        height: 0,
      },
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: '#088675',
    paddingRight: 30, 
    backgroundColor:"#daf4f0"// to ensure the text is never behind the icon
  },
});
