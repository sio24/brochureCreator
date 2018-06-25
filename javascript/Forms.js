// ------------------------------------------------------------------------------------------------------------
// Generic form validation
// ------------------------------------------------------------------------------------------------------------

function confirmInteger(tb) {
	var input = tb.value;
	if (/^0+/.test(input)) {
		tb.value = input.replace(/^0+/, "");
	}
	input = tb.value;
	if (!/^[0-9]*$/.test(input)) {
		tb.value = input.replace(/[^0-9]*/g, "");
	}
}

// ------------------------------------------------------------------------------------------------------------

function confirmInteger0(tb) {
    var input = tb.value;
    input = tb.value;
    if (!/^[0-9]*$/.test(input)) {
        tb.value = input.replace(/[^0-9]*/g, "");
    }
}

// ------------------------------------------------------------------------------------------------------------

function confirmDouble(tb) {
	var input = tb.value;
	if (/^0+/.test(input)) {
		tb.value = input.replace(/^0+/, "");
	}
	input = tb.value;
	if (!/^[0-9]*(\.?5?)$/.test(input)) {
		var output = input.replace(/[^0-9.]*/g, "");
		var dec5Pos = output.search(/\.5/);
		var decPos = output.search(/\./);
		if (dec5Pos > -1) {
			output = output.substr(0, dec5Pos + 2);
		}
		else if (decPos > -1) {
			output = output.substr(0, decPos + 1);
		}
		tb.value = output;
	}
}

// ------------------------------------------------------------------------------------------------------------

function confirmAlphaNumeric(tb) {
	var input = tb.value;
	if (!/^[a-zA-Z0-9]*$/.test(input)) {
		tb.value = input.replace(/[^a-zA-Z0-9]*/g, "");
	}
}

// ------------------------------------------------------------------------------------------------------------

function editPrice(tb) {
    var initial = tb.value;
    var display = '';
    for (pos = 0; pos <= initial.length; pos++) {
        if ((initial.charAt(pos) >= '0') && (initial.charAt(pos) <= '9')) {
            display += initial.charAt(pos);
        }
    }
    tb.value = display;
    tb.select();
}

// ------------------------------------------------------------------------------------------------------------

function displayPrice(tb, display) {
    var strPrice = tb.value;
    if ((parseInt(strPrice) == 0) || (strPrice == '')) {
        if (display) {
            tb.value = display;
        }
        else {
            tb.value = '';
        }
    }
    else if (strPrice.length > 0) {
        for (pos = strPrice.length - 3; pos > 0; pos -= 3) {
            strPrice = strPrice.substr(0, pos) + ',' + strPrice.substr(pos);
        }
        tb.value = 'R ' + strPrice;
    }
}

// ------------------------------------------------------------------------------------------------------------

function valuePrice(strPrice) {
    var initial = strPrice;
    var value = '';
    for (pos = 0; pos <= initial.length; pos++) {
        if ((initial.charAt(pos) >= '0') && (initial.charAt(pos) <= '9')) {
            value += initial.charAt(pos);
        }
    }
    if (isNaN(parseInt(value))) {
        return 0;
    }
    else {
        return parseInt(value);
    }
}

// ------------------------------------------------------------------------------------------------------------

function dateFocus(tb, type) {
    if (tb.value.length == 0) {
        if (type.toLowerCase() == 'date') {
            tb.value = 'yyyy/mm/dd';
        }
        else if (type.toLowerCase() == 'datetime') {
            tb.value = 'yyyy/mm/dd hh:mm:ss';
        }
    }
    tb.select();
}

// ------------------------------------------------------------------------------------------------------------

function dateValidate(tb, type) {
    var strDate = tb.value;
	
	if ((strDate == '') || (strDate == 'yyyy/mm/dd') || (strDate == 'yyyy/mm/dd hh:mm:ss')) {
        tb.value = '';
		return true;
	}
	
	var strYear = '', strMonth = '', strDay = '', strHour = '', strMinute = '', strSecond = '';
	var intYear, intMonth, intDay, intHour, intMinute, intSecond;
	var blnValidYear = false, blnValidMonth = false, blnValidDay = false, blnValidHour = false, blnValidMinute = false, blnValidSecond = false;
	var blnLeapYear = false;

	var pos = 0;
	var len = strDate.length

    // Get year
	while (((strDate.charAt(pos) < '0') || (strDate.charAt(pos) > '9')) && (pos <= len)) {
		pos++;
	}
	while ((strDate.charAt(pos) >= '0') && (strDate.charAt(pos) <= '9') && (pos <= len)) {
		strYear += strDate.charAt(pos);
		pos++;
	}
	intYear = parseInt(strYear, 10);
	if ((intYear > 0) && (intYear < 100)) {
	    intYear += 2000;
	}

    // Get month
	while (((strDate.charAt(pos) < '0') || (strDate.charAt(pos) > '9')) && (pos <= len)) {
		pos++;
	}
	while ((strDate.charAt(pos) >= '0') && (strDate.charAt(pos) <= '9') && (pos <= len)) {
		strMonth += strDate.charAt(pos);
		pos++;
	}
	intMonth = parseInt(strMonth, 10);

    // Get date
	while (((strDate.charAt(pos) < '0') || (strDate.charAt(pos) > '9')) && (pos <= len)) {
		pos++;
	}
	while ((strDate.charAt(pos) >= '0') && (strDate.charAt(pos) <= '9') && (pos <= len)) {
		strDay += strDate.charAt(pos);
		pos++;
	}
	intDay = parseInt(strDay, 10);
	
	// Get hour
	while (((strDate.charAt(pos) < '0') || (strDate.charAt(pos) > '9')) && (pos <= len)) {
		pos++;
	}
	while ((strDate.charAt(pos) >= '0') && (strDate.charAt(pos) <= '9') && (pos <= len)) {
		strHour += strDate.charAt(pos);
		pos++;
	}
	intHour = parseInt(strHour, 10);
	if (isNaN(intHour)) {
	    intHour = 0;
	}

	// Get minute
	while (((strDate.charAt(pos) < '0') || (strDate.charAt(pos) > '9')) && (pos <= len)) {
		pos++;
	}
	while ((strDate.charAt(pos) >= '0') && (strDate.charAt(pos) <= '9') && (pos <= len)) {
		strMinute += strDate.charAt(pos);
		pos++;
	}
	intMinute = parseInt(strMinute, 10);
	if (isNaN(intMinute)) {
	    intMinute = 0;
	}

    // Get second
	while (((strDate.charAt(pos) < '0') || (strDate.charAt(pos) > '9')) && (pos <= len)) {
		pos++;
	}
	while ((strDate.charAt(pos) >= '0') && (strDate.charAt(pos) <= '9') && (pos <= len)) {
		strSecond += strDate.charAt(pos);
		pos++;
	}
	intSecond = parseInt(strSecond, 10);
	if (isNaN(intSecond)) {
	    intSecond = 0;
	}

    // Validate date
	if ((intYear > 1000) && (intYear <= 9999)) {
		blnValidYear = true;

		if ((intYear % 400 == 0) || ((intYear % 4 == 0) && (intYear % 100 != 0))) {
			blnLeapYear = true;
		}

		if (intMonth <= 12) {
			blnValidMonth = true;

			if (intDay <= 0) {
				blnValidDay = false;
			}
			else if (((intMonth == 1) || (intMonth == 3) || (intMonth == 5) || (intMonth == 7) || (intMonth == 8) || (intMonth == 10) || (intMonth == 12)) && (intDay <= 31)) {
				blnValidDay = true;
			}
			else if (((intMonth == 4) || (intMonth == 6) || (intMonth == 9) || (intMonth == 11)) && (intDay <= 30)) {
				blnValidDay = true;
			}
			else if (intMonth == 2) {
				if (((blnLeapYear == false) && (intDay <= 28)) || ((blnLeapYear == true) && (intDay <= 29))) {
					blnValidDay = true;
				}
			}
		}
	}
	
	// Validate time
	if ((intHour >= 0) && (intHour <= 23)) {
	    blnValidHour = true;
	}
	if ((intMinute >= 0) && (intMinute <= 59)) {
	    blnValidMinute = true;
	}
    if ((intSecond >= 0) && (intSecond <= 59)) {
	    blnValidSecond = true;
	}
	
    // Invalid
	if ((blnValidYear == false) || (blnValidMonth == false) || (blnValidDay == false) || (blnValidHour == false) || (blnValidMinute == false) || (blnValidSecond == false)) {
	    if (type.toLowerCase() == 'date') {
		    alert ('Please input a valid date\nin the form yyyy/mm/dd.');
        }
        else if (type.toLowerCase() == 'datetime') {
		    alert ('Please input a valid date/time\nin the form yyyy/mm/dd hh:mm:ss.');
        }
		tb.select();
		return false;
	}
	
	// Valid
	tb.value = intYear + '/' + ((intMonth < 10) ? '0' + intMonth : intMonth) + '/' + ((intDay < 10) ? '0' + intDay : intDay);
	if (type.toLowerCase() == "datetime") {
	    tb.value += ' ' + ((intHour < 10) ? '0' + intHour : intHour) + ':' + ((intMinute < 10) ? '0' + intMinute : intMinute) + ':' + ((intSecond < 10) ? '0' + intSecond : intSecond);
	}
}

// ------------------------------------------------------------------------------------------------------------
// Formating functions
// ------------------------------------------------------------------------------------------------------------

function cleanString(inputString) {
	inputString = trim(inputString);
    inputString = inputString.replace(/\s+/g, " ")
	return inputString.toUpperCase();
}

// ------------------------------------------------------------------------------------------------------------

function formatString(inputString, ifNullOrEmpty) {
	if (typeof ifNullOrEmpty == 'undefined') {
		ifNullOrEmpty = "Unknown";
	}
	inputString += '';
	if ((inputString == '') || (typeof inputString == 'undefined')) {
		return ifNullOrEmpty;
	}
	else {
		return inputString;
	}
}

// ------------------------------------------------------------------------------------------------------------

function formatInteger(inStr, ifNullOrEmpty) {
	if (typeof ifNullOrEmpty == 'undefined') { ifNullOrEmpty = "Unknown" }
	var outStr = '';
	var aInt = (inStr + '').split(',');
    for (var i = 0; i < aInt.length; i++) {
        var int = aInt[i];
	    if ((parseInt(int) == 0) || (isNaN(parseInt(int)))) { outStr += ifNullOrEmpty; }
	    else { outStr += int; }
        if (i != aInt.length - 1) {
            outStr += '<br />';
        }
    }
    return outStr;
}

// ------------------------------------------------------------------------------------------------------------

function formatDecimal(inStr, ifNullOrEmpty) {
	if (typeof ifNullOrEmpty == 'undefined') { ifNullOrEmpty = 'Unknown' }
	var outStr = '';
	var aDec = (inStr + '').split(',');
    for (var d = 0; d < aDec.length; d++) {
        var dec = parseFloat(aDec[d]);
	    if ((dec == 0) || (isNaN(dec))) { outStr += ifNullOrEmpty; }
	    else { outStr += dec; }
        if (d != aDec.length - 1) {
            outStr += '<br />';
        }
    }
    return outStr;
}

// ------------------------------------------------------------------------------------------------------------

function formatBoolean(inStr, ifTrue, ifFalse) {
	if (typeof ifTrue == 'undefined') { ifTrue = "Yes" }
	if (typeof ifFalse == 'undefined') { ifFalse = '' }
	var outStr = '';
	var aBool = (inStr + '').split(',');
    for (var b = 0; b < aBool.length; b++) {
        var bool = aBool[b];
        if ((bool == true) || (bool.toUpperCase() == 'TRUE') || (bool + '' == '1')) { outStr += ifTrue }
        else { outStr += ifFalse }
        if (b != aBool.length - 1) {
            outStr += '<br />';
        }
    }
    return outStr;
}

// ------------------------------------------------------------------------------------------------------------

function formatKM(val, pre) {
    var retVal = '';
    if (val < 1000) { retVal = val; }
    else if (val < 1000000) { retVal = (val / 1000) + 'K'; }
    else { retVal = (val / 1000000) + 'M'; }
    if (pre != null) {
        retVal = pre + retVal;
    }
    return retVal;
}

// ------------------------------------------------------------------------------------------------------------

function formatPrice(inStr, ifNullOrEmpty) {
	if (typeof ifNullOrEmpty == 'undefined') { ifNullOrEmpty = 'Unknown'; }
	var outStr = '';
	var aPr = (inStr + '').split(',');
	for (var p = 0; p < aPr.length; p++) {
	    var strPr = aPr[p];
	    if (isNaN(parseInt(strPr)) || strPr == '0') {
	        outStr += ifNullOrEmpty;
	    }
	    else {
		    for (pos = strPr.length - 3; pos > 0; pos -= 3) {
			    strPr = strPr.substr(0, pos) + ',' + strPr.substr(pos);
		    }
            outStr += 'R ' + strPr;
	    }
        if (p != aPr.length - 1) {
            outStr += '<br />'; 
        }
    }
    return outStr;
}

// ------------------------------------------------------------------------------------------------------------

function formatPriceD(inputFloat, ifNullOrEmpty) {
	if (typeof ifNullOrEmpty == 'undefined') {
		ifNullOrEmpty = "R 0.00";
	}
	var strPrice = inputFloat + '';
	var fltPrice = parseFloat(strPrice);
	if (isNaN(fltPrice)) {
		return strPrice;
	}
	else if (fltPrice == 0) {
		return ifNullOrEmpty;
	}
	else if (strPrice.length > 0) {
	    var strInt = '', strDec = '';
	    var isNeg = fltPrice < 0;
	    if (isNeg) { strPrice = strPrice.substr(1); }
	    var decIdx = strPrice.indexOf('.');
	    if (decIdx == -1) {
	    	strInt = strPrice;
	    }
	    else {
	    	strInt = strPrice.substr(0, strPrice.indexOf('.'));
	    	strDec = strPrice.substr(strPrice.indexOf('.') + 1, 2);
	    }
	    if (strDec.length < 2) { strDec += '00' }
	    strDec = strDec.substr(0, 2);
	    for (pos = strInt.length - 3; pos > 0; pos -= 3) {
		    strInt = strInt.substr(0, pos) + ',' + strInt.substr(pos);
		}
		return 'R ' + (isNeg ? '-' : '') + strInt + '.' + strDec;
	}
}

// ------------------------------------------------------------------------------------------------------------

function formatDate(strDate, inclTime, ifNullOrEmpty) {
	if (typeof inclTime == 'undefined') { inclTime = false; }
	if (typeof ifNullOrEmpty == 'undefined') { ifNullOrEmpty = "Unknown"; }
	if (typeof strDate == 'string') {
		var dateSep = strDate.charAt(4);
		var aDateTime = strDate.split(' ');
		var aDate = aDateTime[0].split(dateSep);
		var aTime = (typeof aDateTime[1] == 'undefined') ?  new Array(0, 0, 0) : aDateTime[1].split(':');
		strDate = new Date(aDate[0], aDate[1] - 1, aDate[2], aTime[0], aTime[1], aTime[2]);
	}
	if ((typeof strDate == 'object') && (strDate.constructor == Date)) {
	// Date object
		if ((isNaN(strDate)) || (Date.parse(strDate) == -30578695200000) || (Date.parse(strDate) == 0)) {
			return ifNullOrEmpty;
		}
		var dm = strDate.getDate().toString()
		dm = (dm.length == 1) ? '0' + dm : dm;
		var m = (strDate.getMonth() + 1).toString();											// getMonth() returns value 0 - 11
		m = (m.length == 1) ? '0' + m : m;
		var y = strDate.getFullYear();
		var h = strDate.getHours();
		h = (h.length == 1) ? '0' + h : h;
		var min = strDate.getMinutes();
		min = (min.length == 1) ? '0' + min : min;
		var s = strDate.getSeconds();
		s = (s.length == 1) ? '0' + s : s
		if (inclTime) { return y + '/' + m + '/' + dm + ' ' + h + ':' + min + ':' + s; }
		else { return y + '/' + m + '/' + dm; }
	}
}

// ------------------------------------------------------------------------------------------------------------

function monthName(month) {
	switch (month) {
		case 0:
			return 'January';
			break;
		case 1:
			return 'February';
			break;
		case 2:
			return 'March';
			break;
		case 3:
			return 'April';
			break;
		case 4:
			return 'May';
			break;
		case 5:
			return 'June';
			break;
		case 6:
			return 'July';
			break;
		case 7:
			return 'August';
			break;
		case 8:
			return 'September';
			break;
		case 9:
			return 'October';
			break;
		case 10:
			return 'November';
			break;
		case 11:
			return 'December';
			break;
	}
}

// ------------------------------------------------------------------------------------------------------------

function dateFromString(strDate, delimiter) {
	if (typeof delimiter == 'undefined') {
		delimiter = strDate.charAt(4);
	}
	var aDate = strDate.split(delimiter);
    return new Date(aDate[0], aDate[1] - 1, aDate[2]);
}

// ------------------------------------------------------------------------------------------------------------

function daysDiff(date1, date2) {
	var msPerDay = 24 * 60 * 60 * 1000;
	var diff = date1.valueOf() - date2.valueOf();
	return Math.floor(diff / msPerDay) + 1;
}

// ------------------------------------------------------------------------------------------------------------

function daysAdd(date, days) {
	var msPerDay = 24 * 60 * 60 * 1000;
	return new Date(date.valueOf() + (days * msPerDay));
}

// ------------------------------------------------------------------------------------------------------------

function firstDayOfMonth(month, year) {
	return new Date(year, month, 1);
}

// ------------------------------------------------------------------------------------------------------------

function lastDayOfMonth(month, year) {
	month = parseInt(month);
	year = parseInt(year);
	var isLeapYear = (year % 4 == 0) && (year % 100 != 0);
	switch (month) {
		case 0:
		case 2:
		case 4:
		case 6:
		case 7:
		case 9:
		case 11:
			return new Date(year, month, 31);
			break;
		case 3:
		case 5:
		case 8:
		case 10:
			return new Date(year, month, 30);
			break;
		case 1:
			return new Date(year, month,  (isLeapYear) ? 29 : 28);
			break;
	}
}

// ------------------------------------------------------------------------------------------------------------

function formatExtent(inputString, ifNullOrEmpty) {
    if (typeof ifNullOrEmpty == 'undefined') { ifNullOrEmpty = "Unknown" }
    var outputString = '';
    var aExtents = (inputString + '').split(',');
    for (var e = 0; e < aExtents.length; e++) {
    	var strExtent = aExtents[e];
    	if (isNaN(parseInt(strExtent)) || strExtent == '0') {
    		outputString += ifNullOrEmpty;
    	}
    	else {
    		for (pos = strExtent.length - 3; pos > 0; pos -= 3) {
    			strExtent = strExtent.substr(0, pos) + ',' + strExtent.substr(pos);
    		}
    		outputString += strExtent + ' m&sup2;';
    	}
    	if (e != aExtents.length - 1) {
    		outputString += '<br />';
    	}
    }
    return outputString;
}

// ------------------------------------------------------------------------------------------------------------

function formatIntThouSep(inputInt, ifNullOrEmpty) {
    if (typeof ifNullOrEmpty == 'undefined') { ifNullOrEmpty = "Unknown" }
    var outputString = '';
    if (isNaN(parseInt(inputInt))) {
        outputString += ifNullOrEmpty;
    }
    else {
        var intPart = parseInt(inputInt).toString();
        for (pos = intPart.length - 3; pos > 0; pos -= 3) {
            intPart = intPart.substr(0, pos) + ',' + intPart.substr(pos);
        }
        outputString = intPart;
    }
    return outputString;
}

// ------------------------------------------------------------------------------------------------------------

function formatDblThouSep(inputDbl, decPlace, ifNullOrEmpty) {
    if (typeof ifNullOrEmpty == 'undefined') { ifNullOrEmpty = "Unknown" }
    var outputString = '';
    if (isNaN(parseInt(inputDbl))) {
    		outputString += ifNullOrEmpty;
    }
    else {
    	var intPart = parseInt(inputDbl).toString();
    	var decPart = inputDbl.toFixed(decPlace).toString();
    	decPart = decPart.substr(decPart.indexOf('.') + 1);
    	for (pos = intPart.length - 3; pos > 0; pos -= 3) {
    		intPart = intPart.substr(0, pos) + ',' + intPart.substr(pos);
    	}
    	outputString = intPart + '.' + decPart;
    }
    return outputString;
}

// ------------------------------------------------------------------------------------------------------------

function formatGPS(degreesDecimal, longLat, ifNullOrEmpty) {

    if (typeof ifNullOrEmpty  == 'undefined') {ifNullOrEmpty = "Unknown";}

    if (isNaN(parseInt(degreesDecimal + ''))) {return ifNullOrEmpty;}

	var Direction;
    if (longLat == 'Longitude') {
    	if (degreesDecimal > 0) {Direction = 'E';}
    	else {Direction = 'W';}
    }
    else if (longLat == 'Latitude') {
        if (degreesDecimal > 0) {Direction = 'N';}
    	else {Direction = 'S';}
    }

    degreesDecimal = Math.abs(degreesDecimal);
    var Degrees = Math.floor(degreesDecimal);
    var Minutes = (degreesDecimal - Degrees) * 60;
    var Seconds = (Minutes - Math.floor(Minutes)) * 60;
    var SecondsDecimal = Math.round((Seconds - Math.floor(Seconds)) * 100);
    return Degrees + '° ' + Math.floor(Minutes) + '\' ' + Math.floor(Seconds) + '.' + SecondsDecimal + '" ' + Direction;
}

// ------------------------------------------------------------------------------------------------------------

function formatFTAddress(StreetNo, StreetName, Complex, SubSuburb, Suburb, Separator) {
	if (typeof Separator == 'undefined') { Separator = "<br />"; }
	var Address = '';
	if ((StreetNo != '') && (typeof StreetNo != 'undefined')) { Address += StreetNo }
	if ((StreetName != '') && (typeof StreetName != 'undefined')) {
		if (Address != '') { Address += ' ' }
		Address += StreetName;
	}
	if ((Complex != '') && (typeof Complex != 'undefined')) {
		if (Address != '') { Address += Separator }
		Address += Complex;
	}
	if ((SubSuburb != '') && (typeof SubSuburb != 'undefined')) {
		if (Address != '') { Address += Separator }
		Address += SubSuburb;
	}
	if ((Suburb != '') && (typeof Suburb != 'undefined')) {
		if (Address != '') { Address += Separator }
		Address += Suburb;
	}
	if (Address == '') { return ifNullOrEmpty }
	else { return Address }
}

// ------------------------------------------------------------------------------------------------------------

function formatSTAddress(SectionNo, SchemeName, StreetNo, StreetName, SubSuburb, Suburb, Separator) {
	if (typeof Separator == 'undefined') { Separator = "<br />"; }
	var Address = '';
	if ((StreetNo != '') && (typeof StreetNo != 'undefined')) {
		if (Address != '') { Address += Separator }
		Address += StreetNo
	 }
	if ((StreetName != '') && (typeof StreetName != 'undefined')) {
		if (Address != '') { Address += ' ' }
		Address += StreetName;
	}
	if ((SubSuburb != '') && (typeof SubSuburb != 'undefined')) {
		if (Address != '') { Address += Separator }
		Address += SubSuburb;
	}
	if ((Suburb != '') && (typeof Suburb != 'undefined')) {
		if (Address != '') { Address += Separator }
		Address += Suburb;
	}
	if (Address == '') { return ifNullOrEmpty }
	else { return Address }
}

// ------------------------------------------------------------------------------------------------------------

function formatRatesAddress(Address1, Address2, Address3, Address4, PostCode) {
	if (typeof ifNullOrEmpty == 'undefined') { ifNullOrEmpty = "Unknown"; }
	var Address = '';
	if ((Address1 != '') && (typeof Address1 != 'undefined')) { Address += Address1 }
	if ((Address2 != '') && (typeof Address2 != 'undefined')) {
		if (Address != '') { Address += '<br />' }
		Address += Address2;
	}
	if ((Address3 != '') && (typeof Address3 != 'undefined')) {
		if (Address != '') { Address += '<br />' }
		Address += Address3;
	}
	if ((Address4 != '') && (typeof Address4 != 'undefined')) {
		if (Address != '') { Address += '<br />' }
		Address += Address4;
	}
	if ((PostCode != '') && (typeof PostCode != 'undefined')) {
		if (Address != '') { Address += '<br />' }
		Address += PostCode;
	}
	if (Address == '') { return ifNullOrEmpty }
	else { return Address }
}

// ------------------------------------------------------------------------------------------------------------

function formatSTTypeCat(typeCat) {
    switch (typeCat) {
        case "D":
            return "Residence"; break;
        case "A":
            return "Amenity"; break;
        case "B":
            return "Business / Commercial"; break;
        case "I":
            return "Industrial"; break;
        default:
            return typeCat; break;
    }
}

// ------------------------------------------------------------------------------------------------------------

//function formatFTType(inputString, ifNullOrEmpty) {
//	if (typeof ifNullOrEmpty == 'undefined') { ifNullOrEmpty = "Unknown" }
//	var aType = inputString.split(',');
//	var outputString = '';
//	for (var t = 0; t < aType.length; t++) {
//		var type = trim(aType[t].toUpperCase());
//		switch (type) {
//	        case "A":
//	            outputString += "APARTMENT";
//	            break;
//	        case "B":
//	            outputString += "BUNGALOW";
//	            break;
//            case "CH":
//            case "CLH":
//                outputString += "CLUSTER HOUSE";
//                break;
//            case "CH2":
//                outputString += "DOUBLE STOREY CLUSTER HOUSE";
//                break;
//            case "COM":
//                outputString += "COMMERCIAL";
//                break;
//            case "D":
//            case "DEM":
//                outputString += "TO DEMOLISH";
//                break;
//            case "FS":
//                outputString += "FACTORY SPACE";
//                break;
//            case "GA":
//                outputString += "GARAGE";
//                break;
//            case "H":
//                outputString += "HOUSE";
//                break;
//            case "H2":
//                outputString += "DOUBLE STOREY HOUSE";
//                break;
//            case "H3":
//                outputString += "TRIPLE STOREY HOUSE";
//                break;
//            case "H SD":
//            case "S/D":
//            case "SD":
//            case "SD H":
//                outputString += "SEMI-DETACHED HOUSE";
//                break;
//            case "H2 SD":
//            case "SD/H2":
//            case "SD2":
//    	        outputString += "DOUBLE STOREY SEMI-DETACHED HOUSE";
//                break;
//            case "SB":
//    	        outputString += "SHARE BLOCK";
//                break;
//            case "ST":
//                outputString += "SECTIONAL TITLE";
//                break;
//            case "TH":
//                outputString += "TOWN HOUSE";
//                break;
//            case "TH2":
//                outputString += "DOUBLE STOREY TOWN HOUSE";
//                break;
//            case "T/H3":
//            case "TH3":
//                outputString += "TRIPLE STOREY TOWN HOUSE";
//                break;
//            case "VL":
//            case "V/L":
//                outputString += "VACANT LAND";
//                break;
//            case '':
//		    case '&NBSP;':
//                outputString += ifNullOrEmpty;
//                break;
//            default:
//                outputString += type;
//                break;
//	    }
//        if (t != aType.length - 1) {
//            outputString += '<br />';
//        }
//    }
//    return outputString;
//}

// ------------------------------------------------------------------------------------------------------------

//function formatFTTypeShort(inputString, ifNullOrEmpty) {
//    if (typeof ifNullOrEmpty == 'undefined') { ifNullOrEmpty = "Unknown" }
//    var aType = inputString.split(',');
//    var outputString = '';
//    for (var t = 0; t < aType.length; t++) {
//        var type = trim(aType[t].toUpperCase());
//        switch (type) {
//            case "A":
//                outputString += "Apartment";
//                break;
//            case "B":
//                outputString += "Bungalow";
//                break;
//            case "CH":
//            case "CLH":
//                outputString += "Cluster House";
//                break;
//            case "CH2":
//                outputString += "DS Cluster Hse";
//                break;
//            case "COM":
//                outputString += "Commercial";
//                break;
//            case "D":
//            case "DEM":
//                outputString += "To Demolish";
//                break;
//            case "FS":
//                outputString += "Factory Space";
//                break;
//            case "GA":
//                outputString += "Garage";
//                break;
//            case "H":
//                outputString += "House";
//                break;
//            case "H2":
//                outputString += "DS House";
//                break;
//            case "H3":
//                outputString += "TS House";
//                break;
//            case "H SD":
//            case "S/D":
//            case "SD":
//            case "SD H":
//                outputString += "Semi Det House";
//                break;
//            case "H2 SD":
//            case "SD/H2":
//            case "SD2":
//                outputString += "DS Semi Det Hse";
//                break;
//            case "SB":
//                outputString += "Share Block";
//                break;
//            case "ST":
//                outputString += "Sectional Title";
//                break;
//            case "TH":
//                outputString += "Town House";
//                break;
//            case "TH2":
//                outputString += "DS T/House";
//                break;
//            case "T/H3":
//            case "TH3":
//                outputString += "TS T/House";
//                break;
//            case "VL":
//            case "V/L":
//                outputString += "Vacant Land";
//                break;
//            case '':
//            case '&NBSP;':
//                outputString += ifNullOrEmpty;
//                break;
//            default:
//                outputString += type;
//                break;
//        }
//        if (t != aType.length - 1) {
//            outputString += '<br />';
//        }
//    }
//    return outputString;
//}

// ------------------------------------------------------------------------------------------------------------

function formatSaleType(inputString) {
	switch (trim(inputString).toUpperCase()) {
	case "AGREEMENT":
	    return "AGREEMENT";
	case "CCT":
        return "CCT";
    case "CRT":
        return "CRT";
    case "CRST":
        return "CRST";
    case "DISTRIBUTION":
        return "DISTRIBUTION";
    case "DONATION":
        return "DONATION";
    case "ESTATE":
        return "ESTATE";
    case "EXCHANGE":
        return "EXCHANGE";
    case "EXPROP", "EXPROPRIATION":
        return "EXPROPRIATION";
    case "INHERITANCE":
        return "INHERITANCE";
    case "PRIVATE TREATY":
        return "PRIVATE TREATY";
    case "RECTIFICATION":
        return "RECTIFICATION";
    case "VESTING":
        return "VESTING";
    default:
        return "OTHER";
	}
}

// ------------------------------------------------------------------------------------------------------------

function formatCondition(inputString, ifNullOrEmpty) {
	if (typeof ifNullOrEmpty == 'undefined') { ifNullOrEmpty = 'Unknown' }
	if ((inputString == '') || (typeof inputString == 'undefined')) { return ifNullOrEmpty }
	switch (trim(inputString.toUpperCase())) {
    case 'RM':
        return 'TO REMODEL';
    case 'P':
        return 'TO RENOVATE';
    case 'A':
        return 'AVERAGE';
    case 'G':
        return 'GOOD';
    case 'VG':
        return 'VERY GOOD';
    case 'E':
        return 'EXCELLENT';
    case 'L':
        return 'EXCEPTIONAL';
    default:
        return trim(inputString.toUpperCase())
    }
}

// ----------------------------------------------------------------------------

function formatConditionShort(inStr, ifNullOrEmpty) {
    if (typeof ifNullOrEmpty == 'undefined') { ifNullOrEmpty = 'Unknown' }
    var aCond = inStr.split(',');
    var outStr = '';
    for (var c = 0; c < aCond.length; c++) {
        var cond = trim(aCond[c].toUpperCase());
        switch (cond) {
            case 'RM':
                outStr += 'Remod';
                break;
            case 'P':
                outStr += 'Renov';
                break;
            case 'A':
                outStr += 'Avg';
                break;
            case 'G':
                outStr += 'Good';
                break;
            case 'VG':
                outStr += 'VGood';
                break;
            case 'E':
                outStr += 'Excel';
                break;
            case 'L':
                outStr += 'Excep';
                break;
            case '':
            case '&NBSP;':
                outStr += ifNullOrEmpty;
                break;
            default:
                outStr += cond
                break;
        }
        if (c != aCond.length - 1) {
            outStr += '<br />';
        }
    }
    return outStr;
}

// ------------------------------------------------------------------------------------------------------------

function formatHouseSize(inputString, ifNullOrEmpty) {
	if (typeof ifNullOrEmpty == 'undefined') { ifNullOrEmpty = '-' }
	switch (inputString) {
    case 'S':
        return 'Smaller than average';
    case 'L':
        return 'Larger than average';
    default:
       	return ifNullOrEmpty;
    }
}

// ------------------------------------------------------------------------------------------------------------

function ageInYears(inputString, ifNullOrEmpty) {
	if (typeof ifNullOrEmpty == 'undefined') { ifNullOrEmpty = '' }
    inputString = parseInt(inputString + '');
    if (isNaN(inputString)) { return ifNullOrEmpty }
    if (inputString <= 0) { return ifNullOrEmpty }
    else if ((inputString > 0) && (inputString < 1000)) { return inputString }
    else { return (Now.Year - inputString) }
}

// ------------------------------------------------------------------------------------------------------------

function ageYearBuilt(ageInYears) {
    if ((ageInYears == '') || (ageInYears == 0)) {
        return 0;
    }
	else if (ageInYears < 1000) {
		var yearNow = new Date().getFullYear();
		return yearNow - ageInYears;
	}
	else {
		return ageInYears;
	}
}

// ------------------------------------------------------------------------------------------------------------

function stripAlpha(inputString) {
    var outputString = '';
    for (pos =  0; pos < inputString.length; pos++) {
        var currentChar = inputString.charAt(pos);
        if ((currentChar >= "0") && (currentChar <= "9")) {
        	outputString += currentChar;
        }
    }
    if (outputString == '') {
        outputString = "0";
       }
    return outputString;
}

// ------------------------------------------------------------------------------------------------------------

function stripAlphaFloat(inputString) {
	var outputString = '';
	for (pos = 0; pos < inputString.length; pos++) {
		var currentChar = inputString.charAt(pos);
		if (((currentChar >= "0") && (currentChar <= "9")) || (currentChar == ".") || (currentChar == "-")) {
			outputString += currentChar;
		}
	}
	if (outputString == '') {
		outputString = "0.00";
	}
	return outputString;
}

// ------------------------------------------------------------------------------------------------------------
// Statistics
// ------------------------------------------------------------------------------------------------------------

function stats(aIn) {
	if (aIn.constructor.toString().indexOf("Array") == -1) { return false; }
	var oStats = new Object();
	var sum = mean = median = 0;
	var n = aIn.length;
	if (n > 0) {
		aIn.sort(numSort);
		for (i = 0; i < n; i++) {
			sum += aIn[i];
		}
		mean = sum / n;
		if (n % 2 == 0) {
		    median = (aIn[Math.floor(n / 2) - 1] + aIn[Math.floor(n / 2)]) / 2;
		}
		else {
			median = aIn[Math.floor(n / 2)];
		} 
	}
	oStats.sum = sum;
	oStats.mean = mean;
	oStats.median = median;
	return oStats;
}

// ------------------------------------------------------------------------------------------------------------
// Misc
// ------------------------------------------------------------------------------------------------------------

function radiansToDegrees(radians) {
	return radians * 180 / Math.PI;
}

// ------------------------------------------------------------------------------------------------------------

function numSort(a, b) {
    return a - b;
}

// ------------------------------------------------------------------------------------------------------------

function roundToDec(inputFloat, noDecPlaces, ifNullOrEmpty) {
	if (typeof ifNullOrEmpty == 'undefined') { ifNullOrEmpty = 'Unknown' }
	inputFloat = parseFloat(inputFloat + '');
	if ((isNaN(inputFloat)) || (inputFloat == 0)) { return ifNullOrEmpty }
	var integer = Math.round(inputFloat);
	var dec = inputFloat - integer;
	return integer + '.' + Math.round(dec * Math.pow(10, noDecPlaces));
}

// ------------------------------------------------------------------------------------------------------------

function roundToThousand (inputInteger) {
    return Math.round(inputInteger / 1000) * 1000
}

// ------------------------------------------------------------------------------------------------------------

function roundToHundred (inputInteger) {
    return Math.round(inputInteger / 100) * 100
}

// ------------------------------------------------------------------------------------------------------------

function trim(stringToTrim) {
	return stringToTrim.replace(/^\s+|\s+$/g,'');
}

// ------------------------------------------------------------------------------------------------------------

function ltrim(stringToTrim) {
	return stringToTrim.replace(/^\s+/,'');
}

// ------------------------------------------------------------------------------------------------------------

function rtrim(stringToTrim) {
	return stringToTrim.replace(/\s+$/,'');
}

// ------------------------------------------------------------------------------------------------------------
// dhxWins
// ------------------------------------------------------------------------------------------------------------

function windowLoading(statusHandle) {
	var msg = statusHandle.getText();
	if ((msg.length < 9) || (msg.length > 140)) {
		msg = 'Loading .'
	}
	else {
		msg += '.';
	}
	statusHandle.setText(msg);
}

// ------------------------------------------------------------------------------------------------------------
