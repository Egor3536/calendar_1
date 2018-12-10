function create_mask_calendar(id,id_mask,id_calendar) {
    var elem = document.getElementById(id);
    var now_date = new Date();
    //alert(now_date.getDate()+'.'+(now_date.getMonth()+1)+'.'+now_date.getFullYear());
    //value="'+now_date.getDate()+'.'+(now_date.getMonth()+1)+'.'+now_date.getFullYear()+'"
    var out = '';
    out +='Укажите диапазон дат(год начала - год конца)';
    out +='<input type="text" style="width: 40px" id="start_date"> - ';
    out +='<input type="text" style="width: 40px" id="end_date"><br>' +
        'Мин. дата начала - 1500 / По умолчанию дата начала и конца (1500-2300)<br>';
    out +='<input type="text" id="'+id_mask+'"  value="'+now_date.getDate()+'.'+(now_date.getMonth()+1)+'.'+now_date.getFullYear()+'">';
    out +='<button id="open_calendar">+</button><br>';
    out +='<div id="'+id_calendar+'" style="display: none">1</div>';
    elem.innerHTML =out;

    var inp =  document.getElementById(id_mask);
    var date ;
    //var but =  document.getElementById('open_calendar');
    var calendar =  document.getElementById(id_calendar);
    var start_date =  document.getElementById('start_date');
    var end_date =  document.getElementById('end_date');

    start_date.onkeydown = function () {
        var curLen = start_date.value.length;
        var charCode = (event.which) ? event.which : event.keyCode;

        if ( charCode > 31 && (charCode < 48 || charCode > 57) && charCode!=37 && charCode!=39)  return false;
        if (curLen == 4 && charCode!=8 && charCode!=37 && charCode!=39) return false;
    };
    end_date.onkeydown = function () {
        var curLen = end_date.value.length;
        var charCode = (event.which) ? event.which : event.keyCode;

        if ( charCode > 31 && (charCode < 48 || charCode > 57) && charCode!=37 && charCode!=39)  return false;
        if (curLen == 4 && charCode!=8 && charCode!=37 && charCode!=39) return false;
    };

    inp.onkeydown = function() {
        var curLen = inp.value.length;
        var charCode = (event.which) ? event.which : event.keyCode;

        if ( charCode > 31 && (charCode < 48 || charCode > 57) && charCode!=37 && charCode!=39)  return false;

        if (curLen == 10 && charCode!=8 && charCode!=37 && charCode!=39) return false;

        if (curLen == 0 && (charCode >= 52 && charCode <= 57)){
            inp.value = "0";
        }

        if (curLen == 2 && charCode!=8)
            inp.value = inp.value + ".";


        if (curLen == 5 && charCode!=8)
            inp.value = inp.value + ".";

        return true;
    };

    inp.onkeyup = function () {
        date = inp.value;

        if (validate_date(date,start_date.value,end_date.value)) {
            createCalendar(id_calendar,date,id_mask,start_date.value,end_date.value);
        }else{
            createCalendar(id_calendar,-1,id_mask,start_date.value,end_date.value);
        }
    };

    open_calendar.onclick = function () {
        date = inp.value;
        if (calendar.style.display == "none"){
            calendar.style.display = "block";
            createCalendar(id_calendar,date,id_mask,start_date.value,end_date.value);
        }
        else{
            calendar.style.display = "none"
        }
    };

}

function validate_date(value,start_year,end_year)
{   //alert(value);
    var arrD = value.split(".");
    if ((+start_year < 1500) || (start_year == '')) start_year=1500;
    if (end_year == '') end_year=2300;
    arrD[1] -= 1;
    //alert(arrD[2]);
    //alert(start_year);
    //alert(end_year);
    var d = new Date(arrD[2], arrD[1], arrD[0]);
    if ((d.getFullYear() == arrD[2]) && (d.getMonth() == arrD[1]) && (d.getDate() == arrD[0]) && (arrD[2] <= +end_year && arrD[2] >= +start_year )) {
        return true;
    } else {
        return false;
    }
}

function createCalendar(id,date,id_mask,start_year,end_year) {

    const monthName = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var elem = document.getElementById(id);
    var inp_m = document.getElementById(id_mask);

    if (date != -1) {
        var arrD = date.split(".");
        var mask_arr = inp_m.value.split(".");
        var mask_year = mask_arr[2];
        var mask_mon = mask_arr[1] - 1;
        var mask_day = mask_arr[0];

        var year = arrD[2];
        var mon = arrD[1] - 1;
        var day = arrD[0];
        if ((day == -1) && (mask_mon == mon) && (mask_year == year)) {
            day = mask_day;
        }
        var d = new Date(year, mon);

        var table = '<table>' +
            '<thead>' +
            '<th><button id="previous_month"><<</button></th>'+
            '<th colspan="5">' + monthName[d.getMonth()] + '-' + d.getFullYear() + '</th>' +
            '<th><button id="next_month">>></button></th>'+
            '</thead>' +
            '<tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

        d.setDate(1);
        for (var i = 0; i < getDay(d); i++) {
            table += '<td></td>';
        }
        while (d.getMonth() == mon) {
            if (d.getDate() == day) {
                table += '<td><div style="color: red ">' + d.getDate() + '</div></td>';
            } else {
                table += '<td><div id="sel_'+d.getDate()+'">' + d.getDate() + '</div></td>';
            }

            if (getDay(d) % 7 == 6) {
                table += '<tr></tr>';
            }

            d.setDate(d.getDate() + 1);
        }
        if (getDay(d) != 0) {
            for (var i = getDay(d); i < 7; i++) {
                table += '<td><div style="color: gray">' + d.getDate() + '</div></td>';
                d.setDate(d.getDate() + 1);
            }
        }

        table += '</tr></table><div id="a">></div>';
        elem.innerHTML = table;

        var previous_month =  document.getElementById('previous_month');
        var next_month =  document.getElementById('next_month');
        //var input =  document.getElementById(id_mask);

        previous_month.onclick = function () {
            d.setMonth(d.getMonth() - 2);
            if (validate_date(1+'.'+(d.getMonth()+1)+'.'+d.getFullYear(),start_year,end_year,start_year,end_year)){
                createCalendar(id,-1+'.'+(d.getMonth()+1)+'.'+d.getFullYear(),id_mask,start_year,end_year);
            }
        };
        next_month.onclick = function () {
            d.setMonth(d.getMonth());
            if (validate_date(1+'.'+(d.getMonth()+1)+'.'+d.getFullYear(),start_year,end_year)) {
                createCalendar(id, -1 + '.' + (d.getMonth() + 1) + '.' + d.getFullYear(), id_mask,start_year,end_year);
            }
        };
/*
        a.onclick = function() {
            d2.setDate(d2.getDate() + 1);
            var new_date_d = d2.getDate()+'.'+(d2.getMonth()+1)+'.'+d2.getFullYear();
            var input =  document.getElementById(id_mask);
            input.value = new_date_d;
            createCalendar(id,d2.getDate()+'.'+(d2.getMonth()+1)+'.'+d2.getFullYear(),id_mask);

        }*/

    }else{
        var er="Введена некорректная дата!";
        elem.innerHTML = er;
    }
}



function getDay(date) {
    var day = date.getDay();
    if (day == 0) day = 7;
    return day - 1;
}
create_mask_calendar('new_calendar','mask_date','id_calendar');
