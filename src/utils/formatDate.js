import moment from 'moment'

// Times in millisecond
const second = 1e3
const minute = 6e4
const hour = 36e5
const day = 864e5
const week = 6048e5

const formats = {
    seconds: {
        short: 's',
        long: ' sec'
    },
    minutes: {
        short: 'm',
        long: ' min'
    },
    hours: {
        short: 'h',
        long: ' hr'
    },
    days: {
        short: 'd',
        long: ' day'
    }
}

export const twitterFormat = (date, format) => {
    let diff = Math.abs(date.diff(new moment()))
    let unit, num, unitStr
    if (diff <= second) {
        unit = 'seconds'
        num = 1
    } else if (diff < minute) {
        unit = 'seconds'
    } else if (diff < hour) {
        unit = 'minutes'
    } else if (diff < day) {
        unit = 'hours'
    } else if (format === 'short') {
        if (diff < week) {
            unit = 'days'
        } else {
            return date.format('M/D/YY')
        }
    } else {
        return date.format('MMM D')
    }
    if (!(num && unit)) {
        num = moment.duration(diff)[unit]()
    }
    unitStr = unit = formats[unit][format]
    if (format === 'long' && num > 1) {
        unitStr += 's'
    }
    return num + unitStr
}


export const twitterShort = date => twitterFormat(date, 'short')
export const twitterLong = date => twitterFormat(date, 'long')