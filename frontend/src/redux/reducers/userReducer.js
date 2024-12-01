const initialState = {
    users: [],
    loading: false,
    error: null
  };
  
  export default function userReducer(state = initialState, action) {
    switch (action.type) {
      case 'USERS_FETCH_REQUEST':
        return { ...state, loading: true };
      
      case 'USERS_FETCH_SUCCESS':
        return { 
          ...state, 
          loading: false, 
          users: action.payload 
        };
      
      case 'USERS_FETCH_FAILURE':
        return { 
          ...state, 
          loading: false, 
          error: action.payload 
        };
      
      default:
        return state;
    }
  }