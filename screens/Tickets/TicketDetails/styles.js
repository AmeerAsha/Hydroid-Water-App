import {StyleSheet} from 'react-native';


export default StyleSheet.create({
    page:{margin:20,backgroundColor:"#daf4f0",borderColor:"#e9ebec",borderRadius:10,borderWidth:3,height:"auto"},
    topContent:{margin:10,height:100},
    heading:{fontSize:17,fontWeight:"600",color:"black"},
    query:{fontSize:16,marginTop:10},
    comments:{fontSize:19,fontWeight:"600",color:"black"},
    name:{fontSize:17,color:"black",fontWeight:"500"},
    responseData:{fontSize:15,margin:10,},
    heading2:{fontSize:16,fontWeight:"400",color:"black"},
    commentline:{borderColor: "#e9ebec",
        backgroundColor: "white",
        borderWidth: 1,
        marginTop:10,
        padding: 10,
        borderRadius: 8,
        fontWeight: '600',},
    commentError:{color:"red",marginBottom:10},
    buttonView:{marginTop:10,marginLeft:150,marginRight:10,height:80},
    buttonText:{
        borderRadius:5,
        backgroundColor:"#088675",
        height:50,
        color:"white",
        fontSize:17,
        paddingTop:10,
        textAlign:"center"
        
        
     },
     bottomContent:{height:1500,backgroundColor:"#e9ebec"},
     heading3:{fontSize:25,marginTop:10,marginLeft:5,fontWeight:"bold",color:"gray"},
     box:{margin:10,backgroundColor:"#daf4f0",borderColor:"#e9ebec",borderRadius:10,borderWidth:3,height:300},
     boxText:{margin:10,fontSize:18,color:"black",fontWeight:"600"},
     boxResponse:{fontSize:16,margin:10,color:"#088675",fontWeight:"400"}
});