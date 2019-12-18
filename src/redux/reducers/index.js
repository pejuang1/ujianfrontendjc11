import {combineReducers} from 'redux'
import AuthReducers from './AuthReducers'
import User from './user'

export default combineReducers({
    Auth:AuthReducers,
    user:User
})