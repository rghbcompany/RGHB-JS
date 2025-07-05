const AppConfig = {
    baseLang: "fa",
    direction: "",
    successMessage: "",
    failMessage: "",
    forbidenMessage: "",
    projectId: "",
};

const CommonServices = {
    setLogo: function () {
        var darkmode = localStorage.getItem("darkmode");
        let updatedLogo = initialLogo;

        if (darkmode === 'true') {
            if (initialLogo.includes('light')) {
                // Replace 'light' with 'dark' in the logo path
                updatedLogo = initialLogo.replace('light', 'dark');
            }
        }
        // Set the updated logo to the image element
        const logoElement = document.getElementById('site-logo'); // Ensure your logo has this ID
        if (logoElement) {
            logoElement.src = updatedLogo;
        }
    },
    setTheme: function () {
        var darkmode = localStorage.getItem("darkmode");

        if (darkmode === 'true') {
            document.documentElement.setAttribute("data-color-theme", "dark");
            try {
                document.getElementById("chbDarkMode").style.display = 'none';
                document.getElementById("chbLightMode").style.display = 'block';
            } catch (e) {
                // Ignore errors if elements are not found
            }

        } else {
            document.documentElement.setAttribute("data-color-theme", "");
            try {
                document.getElementById("chbLightMode").style.display = 'none';
                document.getElementById("chbDarkMode").style.display = 'block';
            } catch (e) {
                // Ignore errors if elements are not found
            }
        }
    },
    toggleTheme: function () {
        const currentTheme = document.documentElement.getAttribute("data-color-theme");

        if (currentTheme === "dark") {
            // Switch to Light Mode
            document.documentElement.setAttribute("data-color-theme", "");
            localStorage.setItem("darkmode", false);
            try {
                document.getElementById("chbLightMode").style.display = 'none';
                document.getElementById("chbDarkMode").style.display = 'block';
            } catch (e) {
                // Ignore errors if elements are not found
            }

        }
        else {
            // Switch to Dark Mode
            document.documentElement.setAttribute("data-color-theme", "dark");
            localStorage.setItem("darkmode", true);
            try {
                document.getElementById("chbDarkMode").style.display = 'none';
                document.getElementById("chbLightMode").style.display = 'block';
            } catch (e) {
                // Ignore errors if elements are not found
            }
        }

        this.setLogo();
    },

    setLanguage: function (lang) {
        AppConfig.baseLang = lang;
        if (lang == "fa") {
            AppConfig.successMessage = "عملیات با موفقیت انجام شد";
            AppConfig.failMessage = "شکست در انجام عملیات";
            AppConfig.forbidenMessage = "شما مجوز کافی برای انجام این عملیات را ندارید";
        }
        else if (lang == "en") {
            AppConfig.successMessage = "Operation was successful";
            AppConfig.failMessage = "Operation was failed";
            AppConfig.forbidenMessage = "You don't have sufficient permissions to perform this action.";

        }
        else {
            AppConfig.successMessage = "عملیات با موفقیت انجام شد";
            AppConfig.failMessage = "شکست در انجام عملیات";
            AppConfig.forbidenMessage = "شما مجوز کافی برای انجام این عملیات را ندارید";

        }
    },

    setDirection: function (direction) {
        AppConfig.direction = direction;
    },

    setProjectId: function (projectId) {
        AppConfig.projectId = projectId;
    },
    setAdminActiveMenuItem: function () {
        var url = window.location.pathname.split("/");
        if (url.length >= 3) {
            var section = url[3];
            var sectionElement = document.getElementById(section);

            if (window.location.pathname.includes("/Sprint/Dashboard/")) {
                sectionElement = document.getElementById(url[5]);
            }

            if (sectionElement) {
                sectionElement.classList.add("active");

                var parentElement = sectionElement.parentElement;
                if (parentElement && parentElement.classList.contains("nav-item-submenu")) {
                    parentElement.classList.add("nav-item-expanded", "nav-item-open");

                    var nextSibling = sectionElement.nextElementSibling;
                    if (nextSibling) {
                        nextSibling.classList.add("show");
                    }
                }
            }
        }
    },

    getFormData: function (dom_query) {
        var out = {};
        var s_data = $(dom_query).serializeArray();
        //transform into simple data/value object
        for (var i = 0; i < s_data.length; i++) {
            var record = s_data[i];
            out[record.name] = record.value;
        }
        return out;
    },
 
    datePicker: function (selector) {
        $(selector).persianDatepicker({
            initialValue: false,
            initialValueType: 'persian',
            format: 'YYYY/MM/DD',
            autoClose: true,
            timePicker: {
                enabled: false,
            },
            calendar: {
                persian: {
                    leapYearMode: 'astronomical'
                }
            }
        });
    },
    dateTimePicker: function (selector) {
        $(selector).persianDatepicker({
            initialValue: false,
            initialValueType: 'persian',
            format: 'YYYY/MM/DD HH:mm',
            autoClose: true,
            calendar: {
                persian: {
                    leapYearMode: 'astronomical'
                }
            },
            "timePicker": {
                "enabled": true,
                "step": 1,
                "hour": {
                    "enabled": true,
                    "step": 1
                },
                "minute": {
                    "enabled": true,
                    "step": 1
                },
                "second": {
                    "enabled": false,
                    "step": null
                },
                "meridian": {
                    "enabled": false
                }
            },
        });
    },
    dateRangePickers: function (selectorFrom, selectorTo) {
        let to, from;

        to = $(selectorTo).persianDatepicker({
            initialValueType: 'persian',
            initialValue: false,
            format: 'YYYY/MM/DD',
            autoClose: true,
            toolbox: {
                enabled: false,
            },
            calendar: {
                persian: {
                    leapYearMode: 'astronomical'
                }
            },
            timePicker: {
                enabled: false,
                meridian: {
                    enabled: false
                }
            },
            onSelect: function (unix) {
                to.touched = true;
                if (from && from.options && from.options.maxDate != unix) {
                    var cachedValue = from.getState().selected.unixDate;
                    from.options = { maxDate: unix };
                    if (from.touched) {
                        from.setDate(cachedValue);
                    }
                }
            }
        });

        from = $(selectorFrom).persianDatepicker({
            initialValueType: 'persian',
            initialValue: false,
            format: 'YYYY/MM/DD',
            autoClose: true,
            toolbox: {
                enabled: false,
            },
            calendar: {
                persian: {
                    leapYearMode: 'astronomical'
                }
            },
            timePicker: {
                enabled: false,
                meridian: {
                    enabled: false
                }
            },
            onSelect: function (unix) {
                from.touched = true;
                if (to && to.options && to.options.minDate != unix) {
                    var cachedValue = to.getState().selected.unixDate;
                    to.options = { minDate: unix };
                    if (to.touched) {
                        to.setDate(cachedValue);
                    }
                }
            }
        });
    },

    dateTimeRangePickers: function (selectorFrom, selectorTo) {
        let to, from;

        to = $(selectorTo).persianDatepicker({
            initialValueType: 'persian',
            initialValue: false,
            format: 'YYYY/MM/DD',
            autoClose: true,
            toolbox: {
                enabled: false,
            },
            calendar: {
                persian: {
                    leapYearMode: 'astronomical'
                }
            },
            timePicker: {
                enabled: true,
                step: 1,
                hour: {
                    enabled: true,
                    step: 1
                },
                minute: {
                    enabled: true,
                    step: 1
                },
                second: {
                    enabled: false,
                    step: null
                },
                meridian: {
                    enabled: false
                }
            },
            onSelect: function (unix) {
                to.touched = true;
                if (from && from.options && from.options.maxDate != unix) {
                    var cachedValue = from.getState().selected.unixDate;
                    from.options = { maxDate: unix };
                    if (from.touched) {
                        from.setDate(cachedValue);
                    }
                }
            }
        });

        from = $(selectorFrom).persianDatepicker({
            initialValueType: 'persian',
            initialValue: false,
            format: 'YYYY/MM/DD',
            autoClose: true,
            toolbox: {
                enabled: false,
            },
            calendar: {
                persian: {
                    leapYearMode: 'astronomical'
                }
            },
            timePicker: {
                enabled: true,
                step: 1,
                hour: {
                    enabled: true,
                    step: 1
                },
                minute: {
                    enabled: true,
                    step: 1
                },
                second: {
                    enabled: false,
                    step: null
                },
                meridian: {
                    enabled: false
                }
            },
            onSelect: function (unix) {
                from.touched = true;
                if (to && to.options && to.options.minDate != unix) {
                    var cachedValue = to.getState().selected.unixDate;
                    to.options = { minDate: unix };
                    if (to.touched) {
                        to.setDate(cachedValue);
                    }
                }
            }
        });
    },
    validateForm: function (form) {
        //فعال سازی دستی اعتبار سنجی جی‌کوئری
        // Ensure form is a jQuery object
        var val = $(form).validate();
        val.form();
        return val.valid();
    },

    getCookie: function (cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },

    setCookie: function (cname, cvalue) {
        document.cookie = cname + "=" + cvalue + ";path=/";
    },

    copyToClipboard: function (text) {
        var input = document.createElement('textarea');
        input.innerHTML = text;
        document.body.appendChild(input);
        input.select();
        var result = document.execCommand('copy');
        document.body.removeChild(input);
        return result;
    }
};


// Initialize module
// ------------------------------

//When content is loaded
document.addEventListener('DOMContentLoaded', function () {
    //CommonServices.setTheme();
    //CommonServices.setLanguage(AppConfig.baseLang);

});

//// When page is fully loaded
//window.addEventListener('load', function () {
//    console.log("When page is fully loaded")
//    CommonServices.setAdminActiveMenuItem();
//});

// Automatically call setTheme when the file is loaded


document.addEventListener('DOMContentLoaded', function () {
    const lightModeCheckbox = document.getElementById("chbLightMode");
    if (lightModeCheckbox) {
        lightModeCheckbox.addEventListener("click", function () {
            CommonServices.toggleTheme(); // Toggle between light and dark themes
        });
    }

    const darkModeCheckbox = document.getElementById("chbDarkMode");
    if (darkModeCheckbox) {
        darkModeCheckbox.addEventListener("click", function () {
            CommonServices.toggleTheme(); // Toggle between light and dark themes
        });
    }



});

