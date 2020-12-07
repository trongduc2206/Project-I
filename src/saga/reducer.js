const initialState = {
    name:'',
    objects: []
}
export default (state = initialState, action) => {
    switch (action.type) {
        case 'API_CALL_REQUEST':
            return {
                ...state,
                name: action.name,
                fetching: true,
            }
        case 'API_CALL_SUCCESS':
            return {
                ...state,
                objects:action.payload
            }
        default: return state;
    }
}