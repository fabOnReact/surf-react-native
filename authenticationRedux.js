// The types of actions that you can dispatch to modify the state of the store
export const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
}

// Helper functions to dispatch actions, optionally with payloads
export const actionCreators = {
  login: (credentials) => {
    return {type: types.LOGIN, payload: credentials}
  },
  logout: (credentials) => {
    return {type: types.LOGOUT, payload: credentials}
  }
}

// Initial state of the store
const initialState = { credentials: '', }

// Function to handle actions and update the state of the store
export const reducer = (state = initialState, action) => {
  const {credentials} = state
  const {type, payload} = action

  switch (type) {
    case types.LOGIN: {
      return {
        ...state,
        credentials: [payload, ...credentials],
      }
    }
    case types.LOGOUT: {
            return {
        ...state,
        credentials: [payload, ...credentials], 
      }
    }
  }

  return state
}
