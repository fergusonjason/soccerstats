// /app/redux/reducers/index.js

import {combineReducers} from "redux";
import {divisions, division} from "./divisionReducers";
import {staffMembers, staffMember} from "./staffReducer";

export default rootReducer = combineReducers({
    divisions,
    division,
    staffMembers,
    staffMember
});