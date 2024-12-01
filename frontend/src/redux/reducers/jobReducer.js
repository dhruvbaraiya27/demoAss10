const initialState = {
    jobs: [],
    loading: false,
    error: null
  };
  
  export default function jobReducer(state = initialState, action) {
    switch (action.type) {
      case 'JOB_CREATE_REQUEST':
      case 'JOB_FETCH_REQUEST':
        return { ...state, loading: true };
      
      case 'JOB_CREATE_SUCCESS':
        return { 
          ...state, 
          loading: false, 
          jobs: [...state.jobs, action.payload] 
        };
      
      case 'JOB_FETCH_SUCCESS':
        return { 
          ...state, 
          loading: false, 
          jobs: action.payload 
        };
      
      case 'JOB_CREATE_FAILURE':
      case 'JOB_FETCH_FAILURE':
        return { 
          ...state, 
          loading: false, 
          error: action.payload 
        };
      
      default:
        return state;
    }
  }