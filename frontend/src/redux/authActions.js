export const login = (username)=>(
    {
        type:"LOGIN",
        payload:{username:username}
    }
);

export const logout = ()=>(
    {
        type:"LOGOUT"
    }
);

export const def = ()=>(
    {
        type:""
    }
);




