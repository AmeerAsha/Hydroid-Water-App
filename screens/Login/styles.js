import {StyleSheet} from 'react-native';

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      wrapper: {
        width: '80%',
      },
      input: {
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#bbb',
        borderRadius: 5,
        paddingHorizontal: 14,
      },
      link: {
        color: 'blue',
      },
      errorText: {
        color: "red",
        marginBottom: 10,
      },
      heading1:{fontSize:50,fontWeight:"bold",color:"black",marginTop:20},
      heading2:{fontSize:20,fontWeight:"600",color:"#405189",marginTop:25},
      username:{fontSize:18,fontWeight:"400",color:"black",marginTop:20},
      password:{fontSize:18,fontWeight:"400",color:"black"},
      btn:{color:"#0ab39c"},
      bottom:{flexDirection: 'row', marginTop: 20}
});