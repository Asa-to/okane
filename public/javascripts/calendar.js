const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
};

const weeksEN = {
    0: 'Sunday',
    1: 'Monday',
    2: 'Tuesday',
    3: 'Wednesday',
    4: 'Thursday',
    5: 'Fryday',
    6: 'Saturday'
};

const weeks = {
    0: '日',
    1: '月',
    2: '火',
    3: '水',
    4: '木',
    5: '金',
    6: '土'
};

const today = new Date();
let year = today.getFullYear();
let month = today.getMonth();

const setLastMonth = () => {
    if(month == 0){
        month = 11;
        year--;
    }else{
        month--;
    }
}

const setNextMonth = () => {
    if(month == 11){
        month = 0;
        year++;
    }else{
        month++;
    }
}

document.getElementById('nextMonthButton').addEventListener('click', () => {
    setNextMonth();
    showCalendar();
});

document.getElementById('lastMonthButton').addEventListener('click', () => {
    setLastMonth();
    showCalendar();
});


const setDateOption = () => {
    Array.prototype.forEach.call(document.getElementsByClassName(`${today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate()}`), element => {
        element.classList.add('today');
    });
}

const createCalendar = () => {
    const calendar = document.getElementById('calendar');
    calendar.innerHTML = '';
    const thead = calendar.createTHead();
    const tbody = calendar.createTBody();
    let newRow;
    let newCell;
    const date = new Date(year, month);
    //週をtheadに設定する
    newRow = thead.insertRow();
    for(let i = 0; i < 7; i++){
        newCell = newRow.insertCell();
        newCell.classList.add(weeksEN[i]);
        newCell.appendChild(document.createTextNode(weeks[i]));
    }
    //1日の曜日(wday)を求めて、そこから最終日(lastDay)まで日にちを入れていく
    const firstWday = date.getDay();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    //tbodyに日にちを足していく
    let day = 0;
    while(day < lastDay){
        newRow = tbody.insertRow();
        for(let wday = 0; wday < 7; wday++ ){
            newCell = newRow.insertCell();
            if(day == 0 && wday < firstWday || lastDay <= day){
                continue;
            }else{
                const todayID = year + '-' + zeroPadding(month + 1, 2) + '-' + zeroPadding(day, 2);
                newCell.id = todayID;
                newCell.classList.add = weeksEN[wday];
                const dayP = document.createElement('p');
                const incomeP = document.createElement('p');
                const outcomeP = document.createElement('p');
                dayP.textContent = ++day;
                incomeP.textContent = '0';
                outcomeP.textContent = '0';
                dayP.classList.add('day');
                incomeP.classList.add('income');
                outcomeP.classList.add('outcome');
                newCell.appendChild(dayP);
                newCell.appendChild(incomeP);
                newCell.appendChild(outcomeP);
                // tableHtml += `<td class="${todayID} ${weeksEN[wday]}"><span class="day">${day++}</span><br><span class="income" id="${todayID}income"></span><br><span class="outcome" id="${todayID}outcome"></span></td>`;
            }
        }
    }
    setDateOption();
}

const zeroPadding = (num, length) => {
    return ('00000000000000000000' + num).slice(-length);
}

const showCalendar = () => {
    createCalendar();
    document.getElementById('thisMonth').innerText = `${year}年${month+1}月`;
}

window.onload = () =>{
    showCalendar();
}