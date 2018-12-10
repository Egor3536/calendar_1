/*function mask(inputName, mask, evt) {
    
        var text = document.getElementById(inputName);
        var value = text.value;

        var literalPattern=/[0]/;
        var numberPattern=/[0-9]/;

        var newValue = "";
        for (var vId = 0, mId = 0 ; mId < mask.length ; ) {
            if (mId >= value.length){
                break;
            }
            // запись в строку, если в маске на этом позиции 0, и введеное клавиша цифра
            if (mask[mId] == '0' && value[vId].match(numberPattern) == null) {
                break;
            }
            //Както ставит точки, не очень понимаю
            while (mask[mId].match(literalPattern) == null) {
                if (value[vId] == mask[mId])
                    break;
                newValue += mask[mId++];
            }
            newValue += value[vId++];
            mId++;
        }
        text.value = newValue;

}*/