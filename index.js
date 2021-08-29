const BirthdayElem = document.querySelector('#txt-date');
const resultBtn = document.querySelector('#btn-check');
const resultDiv = document.querySelector('#result');
const monkeyEmoji = document.querySelector('#monkey');
const happyFace = document.querySelector('#smile');
resultBtn.addEventListener('click', resultHandler)

function resultHandler(e) {
    const bdayString = BirthdayElem.value;
   
    if (bdayString !== '') {
        const [yyyy , mm , dd] = bdayString.split('-');

        let date = {
            day: Number(dd),
            month: Number(mm),
            year: Number(yyyy)
        };

        let dateString = convertDateToString(date);
        let list = checkAllPalindromDates(dateString);
        let isPalindrome = false;

        for (let i = 0; i < list.length; i++) {
            if (list[i]) {
                isPalindrome = true;
                break;
            }
        }

        if (!isPalindrome) {
            const [ctr1, nextDate] = nextPalindromeDate(date);
            const [ctr2, prevDate] = previousPalindromeDate(date);
            
            if (ctr1 > ctr2) {
                setTimeout(() => {
                    monkeyEmoji.classList.remove('hide')
                    happyFace.classList.add('hide')
                    resultDiv.innerText = `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${ctr2} days.`;
                },3000)

            } else {
                setTimeout(()=>{
                    monkeyEmoji.classList.remove('hide')
                    happyFace.classList.add('hide')
                    resultDiv.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr1} days.`;
                },3000)
               
            }

        } else {
            setTimeout(() => {
               monkeyEmoji.classList.add('hide')
                happyFace.classList.remove('hide')

                resultDiv.innerText = 'Yay! Your birthday is palindrome!';
            }, 3000)

        }
    }
}

function reverseString(str) {
    return str.split('').reverse().join('');
}

function isStringPalindrome(str) {
    return str === reverseString(str);
}

function convertDateToString(date) {
    var dateInStr = {
        day: '',
        month: '',
        year: ''
    };

    if (date.day < 10) {
        dateInStr.day = '0' + date.day;
    } else {
        dateInStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateInStr.month = '0' + date.month;
    } else {
        dateInStr.month = date.month.toString();
    }

    dateInStr.year = date.year.toString();
    return dateInStr;
}

function allDateFormats(date) {
    let ddmmyyyy = date.day + date.month + date.year;
    let mmddyyyy = date.month + date.day + date.year;
    let yyyymmdd = date.year + date.month + date.day;
    let ddmmyy = date.day + date.month + date.year.slice(-2);
    let mmddyy = date.month + date.day + date.year.slice(-2);
    let yyddmm = date.year.slice(-2) + date.day + date.month;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}

function checkAllPalindromDates(date) {
    let dateFormatList = allDateFormats(date);
    const palindromeList = [];

    for (var i = 0; i < dateFormatList.length; i++) {
        var result = isStringPalindrome(dateFormatList[i]);
        palindromeList.push(result);
    }
    return palindromeList;
}

function checkLeapYear(year) {

    if (year % 400 === 0)
        return true;

    if (year % 100 === 0)
        return false;

    if (year % 4 === 0)
        return true;

    return false;
}

function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
        if (checkLeapYear(year)) {
            if (day > 29) {
                day = 1;
                month = 3;
            }
        } else {
            if (day > 28) {
                day = 1;
                month = 3;
            }
        }
    } else {
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
        }
    }

    if (month > 12) {
        month = 1;
        year++;
    }

    return {
         day,
         month,
         year
    }
}

function nextPalindromeDate(date) {

    var nextDate = getNextDate(date);
    var ctr = 0;

    while (true) {
        ctr++;
        var dateString = convertDateToString(nextDate);
        var resultList = checkAllPalindromDates(dateString);

        for (let i = 0; i < resultList.length; i++) {
            if (resultList[i]) {
                return [ctr, nextDate];
            }
        }
        nextDate = getNextDate(nextDate);
    }
}

function getPreviousDate(date) {
    let day = date.day - 1;
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (day === 0) {
        month--;

        if (month === 0) {
            month = 12;
            day = 31;
            year--;
        } else if (month === 2) {
            if (checkLeapYear(year)) {
                day = 29;
            } else {
                day = 28;
            }
        } else {
            day = daysInMonth[month - 1];
        }
    }

    return {
         day,
         month,
         year
    }
}

function previousPalindromeDate(date) {

    let previousDate = getPreviousDate(date);
    let ctr = 0;

    while (true) {
        ctr++;
        let dateString = convertDateToString(previousDate);
        let resultList = checkAllPalindromDates(dateString);

        for (let i = 0; i < resultList.length; i++) {
            if (resultList[i]) {
                return [ctr, previousDate];
            }
        }
        previousDate = getPreviousDate(previousDate);
    }
}


