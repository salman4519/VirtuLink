const HOST_ROUTE = "http://localhost:5000/api"

const AUTH_ROUTE = "/auth"
export const AUTH_ROUTES = {
    LOGIN:`${HOST_ROUTE}${AUTH_ROUTE}/signin`
}

const ATTENDEE_ROUTE = "/attendee"
export const ATTENDEE_ROUTES = {
    GET_PROFILE:`${ATTENDEE_ROUTE}/profile`
}