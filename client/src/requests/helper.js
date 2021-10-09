export const getTimeFormat = (timestamp) => {
    let monthsArr = ['', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'July', 'Aug', 'Sep',
        'Oct', 'Nov', 'Dec']
    let date = timestamp.substring(8, 10)
    let month = timestamp.substring(5, 7)
    let year = timestamp.substring(0, 4)
    let returnString = ''
    if (date.substring(1,1) == 1){
        returnString += date + 'st '
    }
    else if (date.substring(1,1) == 2){
        returnString += date + 'nd '
    }
    else if (date.substring(1,1) == 3){
        returnString += date + 'rd '
    }
    else{
        returnString += date + 'th '
    }

    returnString += monthsArr[month] + " " + year
    return returnString
}