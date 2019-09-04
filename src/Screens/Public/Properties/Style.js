export default  {
    layoutContent: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center',
    },

    section: {
        flex: 1,
        paddingVertical: 10,
    },
    item: {
        flex: 1,
        width: '90%',
        marginHorizontal: '5%',
        marginVertical: 20,
        backgroundColor: '#FFF',
        borderRadius: 5,
        elevation: 10,
        shadowOffset: { 
            width: 15, 
            height: 15 
        },
        shadowColor: "grey",
        shadowOpacity: 0.1,
        shadowRadius: 0,
    },
    itemImg: {
        marginBottom: 10,
        width: '100%',
        height: 200,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    itemFavorite: {
        position: 'absolute',
        alignSelf: 'flex-end',
        color: '#FCC300',
        marginTop: 10,
        paddingRight: 10,
    },
    itemPrice: {
        color: '#333',
        fontSize: 16,
        fontFamily: 'Montserrat-SemiBold',
        paddingHorizontal: 20,
    },
    itemLocation: {
        color: '#999',
        fontSize: 11,
        fontFamily: 'Montserrat-Regular',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    itemRow: {
        flexDirection: 'row',
        paddingHorizontal: 20,
        paddingBottom: 15,
    },
    itemOverview: {
        flexGrow: 1,
        flexDirection: 'row',
    },
    itemIcon: {
        color: '#999',
        marginRight: 5,
        fontSize: 24,
    },
    itemNo: {
        color: '#333',
        marginRight: 5,
        fontFamily: 'Montserrat-SemiBold',
        marginTop: 5,
        fontSize: 14,
    },

    bgFilter: {
        backgroundColor: '#FFF',
        borderTopWidth: 0.5,
        borderColor: '#DDD',
        flexDirection: 'row',
    },



    
 }