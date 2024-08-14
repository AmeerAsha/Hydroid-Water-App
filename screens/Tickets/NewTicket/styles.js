import {StyleSheet} from 'react-native';
import colors from '../../ui/colors'

export default StyleSheet.create({
    page: {
        backgroundColor: colors.tertiary,
        flex: 1,
      },
      form: {
        margin: 10,
        display: 'flex',
        gap: 10,
        backgroundColor:"#daf4f0"
      },
      formLabels: {
        fontSize: 19,
        fontWeight: '600',
        margin: 10,
        color: "#088675",
      },
      formSelect: {
        borderColor: "#e9ebec",
        backgroundColor: "white",
        borderWidth: 1,
        fontSize:16
      },
      formInput: {
        borderColor: "#e9ebec",
        backgroundColor: "white",
        borderWidth: 1,
        margin: 5,
        padding: 10,
        borderRadius: 8,
        fontWeight: '600',
      },
      formButton: {
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
  
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
      errorText: {
        color: "red",
        marginBottom: 10,
      },
});
