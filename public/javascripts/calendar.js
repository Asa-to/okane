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

// const weeks = {
//     0: 'Sunday',
//     1: 'Monday',
//     2: 'Tuesday',
//     3: 'Wednesday',
//     4: 'Thursday',
//     5: 'Fryday',
//     6: 'Saturday'
// };

const weeks = {
    0: '日',
    1: '月',
    2: '火',
    3: '水',
    4: '木',
    5: '金',
    6: '土'
};

const createCalendar = (year, month) => {
    const date = new Date(`${months[month-1]} 1, ${year} 10:00:00`);
    //tableHtmlにカレンダーのhtmlを追加していく
    let tableHtml = '';
    //週を足す
    tableHtml = '<table><thead><tr>';
    for(let i = 0; i < 7; i++){
        tableHtml += `<th>${weeks[i]}</th>`;
    }
    tableHtml += '</tr></thead>'
    //1日の曜日(wday)を求めて、そこから最終日(lastDay)まで日にちを入れていく
    const firstWday = date.getDay();
    const lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    console.log(lastDay);
    //週毎に日にちを入れていく
    let day = 1;
    for(let week = 0; week < 6; week++){
        tableHtml += '<tr>';
        for(let wday = 0; wday < 7 && day <= lastDay; wday++ ){
            if(day == 1 && wday < firstWday){
                tableHtml += '<td></td>';
            }else{
                tableHtml += `<td>${day++}</td>`;
            }
        }
        tableHtml += '</tr>';
    }
    tableHtml += '</table>'
    document.getElementById('calendar').insertAdjacentHTML('afterbegin',tableHtml);
}

window.onload = createCalendar(new Date().getFullYear(), new Date().getMonth() + 1);