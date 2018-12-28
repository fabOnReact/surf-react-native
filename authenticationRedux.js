// The types of actions that you can dispatch to modify the state of the store
export const types = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
}

// Helper functions to dispatch actions, optionally with payloads
export const actionAuthentication = {
  login: (user) => {
    return {type: types.LOGIN, payload: user}
  },
  logout: (user) => {
    return {type: types.LOGOUT, payload: user}
  }
}

// Initial state of the store
const initialState = { user: 'testing', }

// Function to handle actions and update the state of the store
export const reducer = (state = initialState, action) => {
  const {user} = state
  const {type, payload} = action

  switch (type) {
    case types.LOGIN: {
      return {
        ...state,
        user: [payload, ...user],
      }
    }
    case types.LOGOUT: {
            return {
        ...state,
        user: [payload, ...user], 
      }
    }
  }

  return state
}
