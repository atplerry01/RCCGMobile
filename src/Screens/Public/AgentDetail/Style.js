const React = require("react-native");
const { Platform } = React;

export default {
  layoutContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  shadow: {
    flex: 1,
    height: 20,
  },

  
  coverImg: {
    flex: 1,
    height: 300,
  },

  section: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  

  profile: {
    flex: 1,
    height: 300,
  },
  bgBlue: {
    width: '100%',
    flex: 1,
    height: 300,
    backgroundColor: '#7E8BF5',
    position: 'absolute',
    opacity: 0.85,
  },
  back: {
    flex: 1,
    width: '100%',
    height: 300,
    paddingHorizontal: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    position: 'absolute',
  },


  owner: {
    flex: 1,
    width: '100%',
    height: 300,
    paddingHorizontal: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  ownerTitle: {
    flex: 1,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 20,
    color: '#333',
  },
  ownerAvatar: {
    borderRadius: 50,
    borderWidth: 5,
    borderColor: '#DDD',
    padding: 5,
    alignItems: 'center',
  },
  ownerAvatarImg: {
    borderRadius: 50,
    width: 100,
    height: 100,
  },
  ownerInfo: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  ownerName: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 18,
    color: '#FFF',
    marginTop: 20,
    marginBottom: 5,
  },
  ownerLocation: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#FFF',
    opacity: 0.7,
  },

  tabBorder: {
    backgroundColor: '#FCC300',
  },
  tabGrey: {
    backgroundColor: '#FFF',
    fontFamily: 'Montserrat-Regular',
  },
  tabText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#999',
  },
  tabTextActive: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 12,
    color: '#333',
  },
  infoTab: {
    paddingVertical: 20,
  },
  infoItem: {
    alignItems: 'flex-start',
    paddingVertical: 30,
  },
  infoItemLast: {
    borderBottomWidth: 0,
  },
  infoIcon: {
    marginRight: 10,
  },
  infoHeader: {
    fontFamily: 'Montserrat-Regular',
    color: '#333',
    marginBottom: 5,
    fontSize: 12,
  },
  infoDesc: {
    fontFamily: 'Montserrat-Regular',
    color: '#999',
    fontSize: 12,
  },

  formBg: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 30,
    paddingBottom: 30,
  },
  col: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textInput: {
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
  textInputHalf: {
    fontFamily: 'Montserrat-Regular',
    borderBottomWidth: 0,
    borderColor: '#DDD',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 12,
    width: '48.5%',
    marginBottom: 10,
    borderRadius: 5,
  },
  btn: {
    width: '100%',
    borderRadius: 5,
    backgroundColor: '#FCC300',
    paddingVertical: 15,
    paddingHorizontal: 5,
  },
  btnText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#333',
    fontSize: 14,
    alignSelf: 'center',
  },

  formBtnText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#333',
    fontSize: 12,
  },
  formBtnIcon: {
    color: '#333',
    fontSize: 24,
  },

  overview: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  overviewTitle: {
    flex: 1,
    fontFamily: 'Montserrat-SemiBold',
    marginBottom: 10,
  },
  overviewDesc: {
    flex: 1,
    color: '#666',
    lineHeight: 20,
    fontFamily: 'Montserrat-Regular',
    fontSize: 13,
  },

  

}