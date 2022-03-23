//store안에 변하는 마지막 값을 return 해주는 것이 reducer
//combineReducer를 이용해서 rootReducer에서 state를 하나로 합침

import { combineReducers } from "redux";
import user from './user_reducer';


const rootReducer = combineReducers({
    user
})

export default rootReducer;