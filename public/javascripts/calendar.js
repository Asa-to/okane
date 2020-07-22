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
    const date = new Date(year, month);
    //tableHtmlにカレンダーのhtmlを追加していく
    let tableHtml = '';
    //週を足す
    tableHtml = '<table><thead><tr>';
    for(let i = 0; i < 7; i++){
        tableHtml += `<th class="${weeksEN[i]}">${weeks[i]}</th>`;
    }
    tableHtml += '</tr></thead>'
    //1日の曜日(wday)を求めて、そこから最終日(lastDay)まで日にちを入れていく
    const firstWday = date.getDay();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    //週毎に日にちを入れていく
    let day = 1;
    while(day < lastDay){
        tableHtml += '<tr>';
        for(let wday = 0; wday < 7; wday++ ){
            if(day == 1 && wday < firstWday || lastDay <= day){
                tableHtml += '<td></td>';
            }else{
                const todayID = year + '-' + zeroPadding(month + 1, 2) + '-' + zeroPadding(day, 2);
                tableHtml += `<td class="${todayID} ${weeksEN[wday]}">${day++}<br><span id="${todayID}income"></span><span id="${todayID}outcome"></span></td>`;
            }
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>'
    document.getElementById('calendar').innerHTML = tableHtml;
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