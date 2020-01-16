const updateReducer = (state = false, action) => {
    switch(action.type) {
        case 'CONFIRM_DATA_UPDATE':
            return !state
          default:
            return state
    }
}

export default updateReducer;