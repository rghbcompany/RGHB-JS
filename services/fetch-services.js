const FetchServices = {
    async request(url, method = "GET", data = null, alert = true, responseType = "json", contentType = "application/json; charset=utf-8") {
        try {
            const options = {
                method,
                headers: {
                    "Content-Type": contentType,
                },
            };

            if (data) {
                options.body = contentType.includes("json") ? JSON.stringify(data) : new URLSearchParams(data);
            }

            const response = await fetch(url, options);

            if (response.status === 403) {
                if (alert) AlertServices.error(AppConfig.forbidenMessage);
                return null;
            }

            if (!response.ok) {
                if (alert) AlertServices.error(`خطای سرور: ${response.status}`);
                throw new Error(`Server error: ${response.status}`);
            }

            return responseType === "json" ? response.json() : response.text();
        } catch (error) {
            if (alert) AlertServices.error(AppConfig.failMessage);
            throw error;
        }
    },

    post_json(url, data, alert = true) {
        return this.request(url, "POST", data, alert, "json");
    },

    get_json(url, alert = true) {
        return this.request(url, "GET", null, alert, "json");
    },

    put_json(url, data, alert = true) {
        return this.request(url, "PUT", data, alert, "json");
    },

    delete_json(url, alert = true) {
        return this.request(url, "DELETE", null, alert, "json");
    },

    post_html(url, data, alert = true) {
        return this.request(url, "POST", data, alert, "text");
    },

    get_html(url, alert = true) {
        return this.request(url, "GET", null, alert, "text");
    },

    put_html(url, data, alert = true) {
        return this.request(url, "PUT", data, alert, "text");
    },

    delete_html(url, alert = true) {
        return this.request(url, "DELETE", null, alert, "text");
    },

    post_html_form(url, data, alert = true) {
        return this.request(url, "POST", data, alert, "text", "application/x-www-form-urlencoded");
    },

    get_html_form(url, alert = true) {
        return this.request(url, "GET", null, alert, "text", "application/x-www-form-urlencoded");
    }
};