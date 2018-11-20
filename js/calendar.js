function ToggleVisibility(element,element_2) {

    var element_1 = document.getElementById(element);
    var date = document.getElementById(element_2);
    var value = date.value;
    var years = value.substring(value.lastIndexOf('.')+1);
    //alert(years);
    var month = value.substring(value.indexOf('.')+1,value.lastIndexOf('.'));
    var day = value.substring(0,value.indexOf('.'));
    //alert(month);
    if (element_1.style.display == "none"){
        element_1.style.display = "block";
        createCalendar(element,years,month,day);
    }
    else{
        element_1.style.display = "none"
    }

    function createCalendar(id, year, month,day) {
        var elem = document.getElementById(id);

        var mon = month - 1;
        var d = new Date(year,mon);
        var d2 = new Date(year,mon,day);
        var table ='<table><tr><th>пн</th><th>вт</th><th>ср</th><th>чт</th><th>пт</th><th>сб</th><th>вс</th></tr><tr>';

        d.setDate(1);
        for(var i=0; i<getDay(d); i++){
            table+= '<td></td>';
        }
        while(d.getMonth() == mon){
            if (d.getDate() == d2.getDate()) {
                table += '<td><div style="color: red">' + d.getDate() + '</div></td>';
            }else{
                table += '<td>' + d.getDate() + '</td>';
            }

            if (getDay(d) % 7 == 6){
                table+='<tr></tr>';
            }

            d.setDate(d.getDate()+1);
        }
        if (getDay(d) != 0){
            for (var i =getDay(d) ; i<7 ; i++){
                table+= '<td><div style="color: gray">' + d.getDate() + '</div></td>';
                d.setDate(d.getDate()+1);
            }
        }

        table+= '</tr></table>';
        elem.innerHTML = table;
    }

    function getDay(date) {
        var day = date.getDay();
        if (day == 0) day = 7;
        return day - 1;
    }

}