Date.prototype.getDayNameEng = function(day) {
    const strDayOfWeek = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    return strDayOfWeek[day];
};

Date.prototype.getMonthNameEng = function(month) {
    const strMonthName = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    return strMonthName[month];
}

Date.prototype.getMonthLen = function(month, year) {
    let intMonthDays;
    if (year % 4 != 0 || (year % 100 == 0 && year % 400 != 0)) {
        intMonthDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    } else {
        intMonthDays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
    return intMonthDays[month];
}

function loadCal() {
    const today = new Date;

    // sets current date readout
    document.getElementById("txtDayOfWeek").textContent = today.getDayNameEng(today.getDay());
    document.getElementById("txtYear").textContent = today.getFullYear().toString();
    document.getElementById("txtMonth").textContent = today.getMonthNameEng(today.getMonth());
    document.getElementById("txtDay").textContent = today.getDate().toString();

    // sets calendar header
    document.getElementById("calHeadMonth").textContent = today.getMonthNameEng(today.getMonth());
    document.getElementById("calHeadYear").textContent = today.getFullYear().toString();

    let dateMo1 = new Date(today.getFullYear(), today.getMonth(), 1);
    let k = 1; // stepper for days in current month
    
    const arrayCalInset = document.getElementsByClassName("calDateInset");
    const arrayCalContent = document.getElementsByClassName("calDateContent");
    const arrayCal = document.getElementsByClassName("calCell")

    // for loop to fill in dates and feasts of current month
    for (let i = dateMo1.getDay(); i <= (today.getMonthLen(today.getMonth(), today.getFullYear()) - 1 + dateMo1.getDay()); ++i) {
        arrayCalInset[i].textContent = k.toString();
        arrayCalContent[i].textContent = 'TEST'; // TODO change this to actual feast info
        ++k;

        // Visually identify current date
        if (i == today.getDate() + dateMo1.getDay() - 1) {
            document.getElementById(arrayCal[i].style.fontWeight = 'bold');
        } // end if
    } // end for

    // FIXME I think this can be done in a simpler way
    // fills in dates before and after current month
    let m; // stepper for days before current month
    let n = 1; // stepper for days after current month

    for (let i = 0; i < arrayCal.length; ++i) {
        if (arrayCalInset[i].textContent === '') {
            if (i < dateMo1.getDay()) {
                if (today.getMonth() == 0) { // sets highest number for previous month to 31 if current month is January (December has 31 days)
                    m = 31 - dateMo1.getDay() + (i+1); // 31 is number of days in December, minus the day of the week because it will start filling in on Sunday, but need to add number of iterations already done so that it goes up each loop, add one because getDay is zero-indexed so otherwise there is an OBOE

                } else {
                    let dateLastMo1 = new Date(today.getFullYear(), (today.getMonth() - 1), 1);
                    m = dateLastMo1.getMonthLen(dateLastMo1.getMonth(),dateLastMo1.getFullYear()) - dateMo1.getDay() + (i+1); // gets number of days in previous month, minus day of the week current months starts on so it counts up from Sunday, then have to add current number of iterations so it steps, but getDay is zero-indexed so have to add one to avoid OBOE
                } // end else

                arrayCalInset[i].textContent = m;
                document.getElementById(arrayCal[i].style.color = '#999999'); // TODO CHANGE ME
                document.getElementById(arrayCalInset[i].style.border = 'none');
                document.getElementById(arrayCalInset[i].style.maxWidth = '100%');
                document.getElementById(arrayCalContent[i].style.width = '0%');
                document.getElementById(arrayCalInset[i].style.align = 'center');

            } else {
                if (i > today.getMonthLen(today.getMonth(),today.getFullYear())) {
                    document.getElementById(arrayCal[i].style.color = '#999999'); // TODO CHANGE ME
                    document.getElementById(arrayCalInset[i].style.border = 'none');
                    document.getElementById(arrayCalInset[i].style.maxWidth = '100%');
                    document.getElementById(arrayCalContent[i].style.width = '0%');
                    document.getElementById(arrayCalInset[i].style.align = 'center');
                    arrayCalInset[i].textContent = n.toString();
                    ++n;
                } // end if
            } // end else
        } // end if

    } // end for
}

const saintType = {
    C: "Confessor",
    CC: "Confessors",
    P: "Pope",
    PP: "Popes",
    M: "Martyr",
    MM: "Martyrs",
    V: "Virgin",
    VV: "Virgins",
    W: "Widow",
    WW: "Widows",
    S: "Apostle",
    SS: "Apostles",
    Q: "Queen",
    K: "King",
    N: "Deacon",
    A: "Abbot",
    AA: "Abbots",
    a: "Abbess",
    aa: "Abbesses",
    D: "Doctor",
}