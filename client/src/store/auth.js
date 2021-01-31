const UPDATE_EMAIL_VALUE = 'infiniteLibrary/auth/UPDATE_EMAIL_VALUE';
const UPDATE_PASSWORD_VALUE = 'infiniteLibrary/auth/UPDATE_PASSWORD_VALUE';
const UPDATE_TOKEN_VALUE = 'infiniteLibrary/auth/UPDATE_TOKEN_VALUE';
const REMOVE_USER = 'infiniteLibrary/auth/REMOVE_USER';
const AUTO_UPDATE_USER_VALUE = 'infiniteLibrary/auth/UPDATE_USER_VALUE';

export const INFINITE_LIBRARY_AUTH_TOKEN = 'INFINITE_LIBRARY_AUTH_TOKEN';

const updateEmailValue = value => ({ type: UPDATE_EMAIL_VALUE, value });
const updatePasswordValue = value => ({ type: UPDATE_PASSWORD_VALUE, value });
const updateTokenValue = value => ({ type: UPDATE_TOKEN_VALUE, value });
//const autoUpdateUserValue = users => ({ type: AUTO_UPDATE_USER_VALUE, users });
const removeUser = () => ({ type: REMOVE_USER });

export const actions = {
  updateEmailValue,
  updatePasswordValue,
  updateTokenValue,
  removeUser,
  //autoUpdateUserValue,
};

const tryLogin = () => {
  return async (dispatch, getState) => {
    const { auth: { email, password } } = getState();
    const response = await fetch('/api/session', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    try {
      if (response.status >= 200 && response.status < 400) {
        const data = await response.json();
        dispatch(updateTokenValue(data.token));
        //dispatch(autoUpdateUser());
        const res = await fetch('/api/users/');
        if (res.ok){
          const {users} = await res.json();
          //dispatch(autoUpdateUserValue(users));
        } else {
          console.log(res);
        }
        window.localStorage.setItem(INFINITE_LIBRARY_AUTH_TOKEN, data.token);
      } else {
        console.error('Bad response');
      }
    } catch (e) {
      console.error(e);
    }
  };
};

const logOut = () => {
  return (dispatch) => {
    window.localStorage.removeItem(INFINITE_LIBRARY_AUTH_TOKEN);
    dispatch(removeUser);
  }
}

/* const autoUpdateUser = () => {
  return async (dispatch) => {

  }
}
 */
export const thunks = {
  tryLogin,
  logOut,
  //autoUpdateUser,
};

const token = window.localStorage.getItem(INFINITE_LIBRARY_AUTH_TOKEN);

const initialState = {
    token,
    email: "",
    password: "",
    user: {id: 0, username: ""},
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_EMAIL_VALUE: {
      return {
        ...state,
        email: action.value,
      };
    }
    case UPDATE_PASSWORD_VALUE: {
      return {
        ...state,
        password: action.value,
      };
    }
    case UPDATE_TOKEN_VALUE: {
      const token = action.value;
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      const payloadObj = JSON.parse(decodedPayload);
      const { email } = payloadObj;
      console.log(payloadObj);
      return {
        ...state,
        token,
        email
      };
    }
    case REMOVE_USER: {
      return {
        ...state,
        email: '',
        password: '',
        token: false,
        user: {id: 0, username: ""}
      }
    }
    /* case AUTO_UPDATE_USER_VALUE: {
      const [currentUser] = action.users.filter(user => user.email === state.email);
      return {
        ...state,
        user: currentUser,
      }
    } */
    default: {
      return state;
    }
  }
}

export default reducer;
