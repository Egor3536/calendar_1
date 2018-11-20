<!DOCTYPE html>
<html lang="ru">
<head>
    <link href="css/calendar.css">
    <meta charset="UTF-8">
    <title>Calendar</title>

    <script type="text/javascript">

    </script>

</head>
<body>
<input type="text" id="zipCode" onkeyup="mask('zipCode', '00.00.0000', event);" value="__.__.____" >
    <button OnClick="ToggleVisibility('calendar','zipCode')">+</button><br>

    <div id="calendar" style="display: none"></div>

    <script src="js/calendar.js"></script>
    <script src="js/mask_date.js"></script>
</body>
</html>
