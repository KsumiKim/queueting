import * as actionTypes from "./actionTypes";
import {auth, db} from "../../firebase-queueting";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = () => {
  return {
    type: actionTypes.AUTH_SUCCESS
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  }
}

export const checkAuthTimeout = () => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, 360000);
  }
}

export const authenticate = (email, password) => {
  return async dispatch => {
    dispatch(authStart());
    await auth.signInWithEmailAndPassword(email, password)
    .then(credential => {
        dispatch(fetchUser({
          token: credential.user.refreshToken,
          userId: credential.user.uid,
        }));
        dispatch(authSuccess());
        dispatch(checkAuthTimeout());
    })
    .catch(error => {
      dispatch(authFail(error.message));
    });
  }
}

export const fetchUserStart = () => {
  return {
    type: actionTypes.FETCH_USER_START
  }
}

export const fetchUserSuccess = (user) => {
  return {
    type: actionTypes.FETCH_USER_SUCCESS,
    userId: user.userId,
    token: user.token,
    name: user.name
  }
}

export const fetchUserFail = (error) => {
  return {
    type: actionTypes.FETCH_USER_FAIL,
    error: error
  }
}

export const fetchUser = (userData) => {
  return async dispatch => {
    dispatch(fetchUserStart());
    const userRef = await db.collection("users").doc(userData.userId).get();

    try {
      dispatch(fetchUserSuccess({
        userId: userRef.id,
        token: userData.token,
        name: userRef.data().name,
        phone: userRef.data().phone
      }));
    } catch(error) {
      dispatch(fetchUserFail(error));
    }
  }
}

export const fetchUsersStart = () => {
  return {
    type: actionTypes.FETCH_USERS_START
  }
}

export const fetchUsersFail = (error) => {
  return {
    type: actionTypes.FETCH_USERS_FAIL,
    error: error
  }
}

export const fetchUsersSuccess = (users) => {
  return {
    type: actionTypes.FETCH_USERS_SUCCESS,
    users: users
  }
}

export const fetchUsers = () => {
  return async dispatch => {
    dispatch(fetchUsersStart());

    const userRef = await db.collection("users").get();
    let users = [];

    try {
      userRef.forEach(userDoc => {
        const user = userDoc.data();
        const userId = userDoc.id;
        users.push({
          data: user,
          userId: userId
        });
      })
      dispatch(fetchUsersSuccess(users));
    } catch(error) {
      console.error(error);
      dispatch(fetchUsersFail(error));
    }
  }
}