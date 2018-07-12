import moment from "moment";

getMaxMillisForYear = (year) => {

    return moment({y: year}).endOf('year').valueOf();

}

getMinMillisForYear = (year) => {

    return moment({y: year}).valueOf();

}

getFormattedDateForMillis = (millis) => {

    return moment(millis).format("MM/DD/YYYY");
}

getMillisForFormattedDate = (formattedDate) => {

    return moment(formattedDate,"MM/DD/YYYY").startOf('day').valueOf();

}

export {getMaxMillisForYear, getMinMillisForYear, getFormattedDateForMillis, getMillisForFormattedDate};