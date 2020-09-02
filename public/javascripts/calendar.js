const months = { 0: 'January', 1: 'February', 2: 'March', 3: 'April', 4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September', 9: 'October', 10: 'November', 11: 'December' };

const weeksEN = { 0: 'Sunday', 1: 'Monday', 2: 'Tuesday', 3: 'Wednesday', 4: 'Thursday', 5: 'Fryday', 6: 'Saturday' };

const weeks = { 0: '日', 1: '月', 2: '火', 3: '水', 4: '木', 5: '金', 6: '土' };

const today = new Date();
let year = today.getFullYear();
let month = today.getMonth();

const setMonthData = (monthDataList) => {
    let totalIncome = 0;
    let totalOutcome = 0;
    monthDataList.forEach((element) => {
        console.log(element);
        if(0 < element['amount']){
            const dayData = document.getElementById(`${element['date']}income`).textContent; 
            totalIncome += parseInt(element['amount']);
            document.getElementById(`${element['date']}income`).textContent = parseInt(dayData) + parseInt(element["amount"]);
        }else{
            const dayData = document.getElementById(`${element['date']}outcome`).textContent;
            totalOutcome += Math.abs(parseInt(element['amount']));
            document.getElementById(`${element['date']}outcome`).textContent = parseInt(dayData) + parseInt(element["amount"]);
        }
    });
    document.getElementById('totalIncomeMonth').textContent = `今月の収入：${totalIncome}`;
    document.getElementById('totalOutcomeMonth').textContent = `今月の支出：${totalOutcome}`;
}

const printDataList = (data) => {
    const table = document.getElementById('dataListTable');
    table.removeChild(document.getElementById('tbody'));
    const tbody = table.createTBody();
    tbody.id = 'tbody';
    data.forEach( dataColume => {
        const newRow = tbody.insertRow();
        const keys = ['date', 'title', 'amount'];
        for(key in keys){
            const newCell = newRow.insertCell();
            if(keys[key] == 'date'){
                newCell.appendChild(document.createTextNode(dataColume[keys[key]].slice(8, 10)));
            }else{
                newCell.appendChild(document.createTextNode(dataColume[keys[key]]));
            }
        }
        const newCell = newRow.insertCell();
        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.textContent = '削除'
        deleteButton.id = dataColume['id'];
        deleteButton.onclick = () => {
            fetch(`/dataApi/delete?ID=${dataColume['id']}`, {
                method: 'GET'
            })
            .then(response => response.text())
            .then(result => {
                showCalendar();
            });
        };
        newCell.appendChild(deleteButton);
    });
}

const getMonthData = (date) => {
    fetch(`/dataApi/sakura?month=${month+1}&year=${year}`, {
        method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
        setMonthData(JSON.parse(json));
        printDataList(JSON.parse(json));
    });
}

const setTotalAssett = () => {
    fetch('/dataApi/totalAsset', {
        method: 'GET'
    })
    .then(response => response.json())
    .then(content => {
        const asset = JSON.parse(content);
        document.getElementById('totalAssets').textContent = `総資産：${asset['0']['SUM(amount)']}`;
        if(document.getElementById('totalAssets').textContent == '総資産：null') document.getElementById('totalAssets').textContent = '総資産：0';
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
                day++;
                const todayID = year + '-' + zeroPadding(month + 1, 2) + '-' + zeroPadding(day, 2);
                newCell.id = todayID;
                newCell.classList.add = weeksEN[wday];
                const dayP = document.createElement('p');
                const incomeP = document.createElement('p');
                const outcomeP = document.createElement('p');
                dayP.textContent = day;
                incomeP.textContent = '0';
                outcomeP.textContent = '0';
                dayP.classList.add('day');
                incomeP.classList.add('income');
                incomeP.id = todayID + 'income';
                outcomeP.classList.add('outcome');
                outcomeP.id = todayID + 'outcome';
                newCell.appendChild(dayP);
                newCell.appendChild(incomeP);
                newCell.appendChild(outcomeP);
            }
        }
    }
}

const zeroPadding = (num, length) => {
    return ('00000000000000000000' + num).slice(-length);
}

const showCalendar = () => {
    createCalendar();
    getMonthData();
    setTotalAssett();
    document.getElementById('thisMonth').innerText = `${year}年${month+1}月`;
}

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

window.onload = () =>{
    showCalendar();
}