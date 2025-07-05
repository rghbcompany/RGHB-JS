const StringExtensions = {
    toEnglishNumber(persianStr) {
        if (persianStr == null || persianStr === "") {
            return "";
        }
        const numberMap = {
            "۰": "0",
            "۱": "1",
            "۲": "2",
            "۳": "3",
            "۴": "4",
            "۵": "5",
            "۶": "6",
            "۷": "7",
            "۸": "8",
            "۹": "9"
        };
        return Object.keys(numberMap).reduce((current, key) =>
            current.replace(new RegExp(key, "g"), numberMap[key]), persianStr);
    },

    replaceSpace(str, replaceCharacter = "_") {
        if (str == null || str === "") {
            return "";
        }
        return str.replace(/ /g, replaceCharacter);
    },

    replaceUnderline(str, replaceCharacter = " ") {
        if (str == null || str === "") {
            return "";
        }
        return str.replace(/_/g, replaceCharacter);
    }
};