const React = require("react-native");
const { Platform } = React;

export default {
  layoutInner: {
    flex: 1,
  },
  layoutContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeBg: {
    flex: 1,
    paddingBottom: 30,
  },
  

  section: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  type: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#7E8BF5'
  },

  row: {
    marginBottom: 20,
  },
  rowInline: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col: {
    width: '48%',
  },

  bgGrey: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingLeft: 10,
    paddingVertical: 0,
  },


  propertyType: {
    marginBottom: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  label: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
  labelPrice: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  textInput: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#333',
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 15,
    textAlignVertical: 'top',
  },
  textInputMulti: {
    fontFamily: 'Montserrat-Regular',
    borderBottomWidth: 0,
    borderColor: '#DDD',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 12,
    width: '100%',
    marginBottom: 10,
    borderRadius: 5,
    ...Platform.select({
      ios: {
        height: 100,
        paddingTop: 20,
      },
      android: {
        textAlignVertical: 'top',
      },
    }),
  },
  btn: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#FCC300',
    paddingTop: 20,
    paddingBottom: 20,
    height: 50,
    paddingLeft: 5,
  },
  btnText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#333',
    fontSize: 12,
    alignSelf: 'center',
  },
  btnIcon: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#333',
    fontSize: 16,
    alignSelf: 'center',
  },


  typeBg: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#FFF',
    padding: 0,
    borderRadius: 5,
  },
  typeBtn: {
    flex: 1,
    borderWidth: 0,
    borderRadius: 0,
  },
  typeBtnText: {
    fontFamily: 'Montserrat-Regular',
    color: '#999',
    fontSize: 12,
  },

  typeBtnActive: {
    backgroundColor: '#FFF',
    paddingVertical: 12,
    paddingHorizontal: 5,
    borderRadius: 3,
  },
  typeBtnInactive: {
    backgroundColor: 'transparent',
    paddingVertical: 12,
    paddingHorizontal: 3,
  },
  typeActiveText: {
    color: '#333',
    fontFamily: 'Montserrat-SemiBold',
  },
  typeInactiveText: {
    color: '#FFF',
    fontFamily: 'Montserrat-Regular',
  },

  noBg: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#FFF',
    padding: 2,
    borderRadius: 5,
  },
  noBtn: {
    flex: 1,
    borderWidth: 0,
    borderRadius: 5,
    marginRight: 2,
  },
  noBtnText: {
    color: '#999',
    fontSize: 12,
  },

  noBtnActive: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
    borderRadius: 5,
    borderWidth: 3,
    borderColor: '#7E8BF5'
  },
  noBtnInactive: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 12,
  },
  noActiveText: {
    color: '#333',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
  },
  noInactiveText: {
    color: '#999',
    fontFamily: 'Montserrat-SemiBold',
  },


  itemFooter: {
    flexDirection: 'row',
    marginVertical: 20,
    justifyContent: 'space-between',
  },
  itemText: {
    color: '#333',
    marginRight: 5,
    fontFamily: 'Montserrat-SemiBold',
    marginTop: 5,
    fontSize: 12,
  },
  itemTextDisabled: {
    color: '#CCC',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },
  itemIconDisabled: {
    color: '#CCC',
  },
  itemBtn: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    color: '#333',
    paddingHorizontal: 0,
    borderRadius: 5,
  },
  itemIcon: {
    color: '#333',
  },
  itemBtnActive: {
    flexDirection: 'row',
    backgroundColor: '#FCC300',
    color: '#FFF',
    paddingHorizontal: 0,
    borderRadius: 5,
  },

  amenity: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  amenityItem: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    marginBottom: 1,
    borderRadius: 5,
    width: '33%'
  },
  amenityIcon: {
    marginBottom: 5,
  },
  amenityText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 10,
  },

  photoUpload: {
    marginVertical: 5,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    borderRadius: 5,
  },
  photoUploadBtn: {
    alignSelf: 'center',
    borderWidth: 2,
    backgroundColor: '#FFF',
    borderColor: '#666',
    paddingVertical: 15,
    height: 50,
    borderRadius: 10,
  },
  photoUploadIcon: {
    color: '#555',
    marginBottom: 0,
  },
  photoUploadText: {
    color: '#333',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 12,
  },

  photo: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    flexWrap: 'wrap',
  },
  photoItem: {
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 1,
    borderRadius: 5,
    width: '33%'
  },
  photoIcon: {
    width: '100%',
    height: 100,
    borderRadius: 5,
  },
  photoDelete: {
    position: 'absolute',
    backgroundColor: '#FFF',
    right: 0,
    bottom: 0,
    marginRight: 10,
    marginBottom: 10,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 0,
  },
  photoDeleteIcon: {
    color: '#FF0000',
    fontSize: 20,
    width: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 11,
  },

  publish: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  publishIcon: {
    alignSelf: 'center',
    fontSize: 128,
    color: '#309224',
    marginBottom: 10,
  },
  publishTitle: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    color: '#309224',
    marginBottom: 10,
  },
  publishDesc: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    color: '#666',
  },
  publishPreview: {
    flex: 1,
    paddingVertical: 30,
  },
  publishBtn: {
    backgroundColor: '#FCC300',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  publishBtnIcon: {
    color: '#FFF',
  },
  publishBtnText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#FFF',
  },

}