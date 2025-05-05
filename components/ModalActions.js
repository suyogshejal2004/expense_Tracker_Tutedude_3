
const styles = StyleSheet.create({
    pencil: {
      backgroundColor: 'aliceblue',
      borderRadius: 10,
      padding: 8,
    },
    trash: {
      backgroundColor: 'aliceblue',
      borderRadius: 10,
      // padding: 8,
      paddingVertical: 8,
      paddingHorizontal: 15
    },
    closeIcon: {
      position: 'absolute',
      top: 0,
      right: 0,
    },
    handleIcons: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      width: '100%',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      // backgroundColor: '#2196F3',
      marginHorizontal: 5,
      marginVertical: 5,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  })
  