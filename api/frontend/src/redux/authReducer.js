const initialState = {
    isLoggedIn: false,
    username: ''
};

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('authState');
        return serializedState ? JSON.parse(serializedState) : initialState;
    } catch (error) {
        return initialState;
    }
};

const saveState = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('authState', serializedState);
    } catch (error) {
        console.log("error saving redux state to localstorage")
    }
};

const authReducer = (state = loadState(), action) => {
    switch(action.type) {
        case 'LOGIN':
            const newState = {
                ...state,
                isLoggedIn: true,
                username: action.payload.username
            };
            saveState(newState);
            return newState;
        case 'LOGOUT':
            const newStateAfterLogout = initialState;
            saveState(newStateAfterLogout);
            return newStateAfterLogout;
        default:
            return state;
    }
};

export default authReducer;
