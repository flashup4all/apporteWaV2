import { user_data, user_token} from "../constant";

export const encrypt = (user) => {
    
    console.log(response)
}

export const store_user = (user) => {

   window.localStorage.setItem(user_data, JSON.stringify(user))
}

export const get_user = (user) => {

    return JSON.parse(window.localStorage.getItem(user_data))
}

export const store_token = (token) => {

    window.localStorage.setItem(user_token, token)
}

export const get_token = (token) => {

    return window.localStorage.getItem(user_token)
}

export const clear_store = () => {

    window.localStorage.removeItem(user_token)
    window.localStorage.removeItem(user_data)
}