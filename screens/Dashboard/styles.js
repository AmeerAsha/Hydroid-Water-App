import {StyleSheet} from 'react-native';
import colors from '../../ui/colors'

export default StyleSheet.create({
    page: {
        backgroundColor: colors.tertiary,
        flex: 1,
        height:"auto"
      },
      statList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 9,
        margin: 10,
      },
      statItem: {
        backgroundColor: "#0ab39c",
        borderRadius: 8,
        padding: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        width: '47%',
      },
      statItem1: {
        backgroundColor: "#f7b84b",
        borderRadius: 8,
        padding: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        width: '47%',
      },
      statItem2: {
        backgroundColor: "#3577f1",
        borderRadius: 8,
        padding: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        width: '47%',
      },
      statItem3: {
        backgroundColor: "#f06548",
        borderRadius: 8,
        padding: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        width: '47%',
        
      },
      statItem4: {
        backgroundColor: "#212529",
        borderRadius: 8,
        padding: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        width: '47%',
      },
      statItem5: {
        backgroundColor: "#f672a7",
        borderRadius: 8,
        padding: 8,
        display: 'flex',
        alignItems: 'center',
        gap: 5,
        width: '47%',
        height: 157
      },
      statItemTitle: {
        fontSize: 16,
        flexWrap: 'wrap',
        fontWeight: '600',
        color:"white"
      },
      statItemData: {
        fontSize: 20,
        fontWeight: '800',
        color: "white",
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
      raiseticketButton:{
        margin:10,alignItems:"center",justifyContent:"center"
      },
      raiseticketText:{
        borderRadius:5,
              backgroundColor:"#088675",
              height:40,
              fontSize:16,
              verticalAlign:"middle",
              textAlign:"center",
              color:"white",
             padding:10
      },
      greeting:{
        fontSize:19,fontWeight:'500',color:"black"
      },
      details:{
        fontSize:15,fontWeight:'400'
      },
      bottom:{
        height:"auto",backgroundColor:"white",margin:10
      },
      graphDetails:{
        fontSize:17,marginLeft:20,fontWeight:'500',color:"black",marginTop:10
      }
});
