console.log($.fn.select2);

const Select2Services = {
    // Initialize Select2 with AJAX
    ajax: function (selector, url, minimumInputLength = 1) {
        $(selector).select2({
            ajax: {
                url: url,
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        q: params.term,
                        page: params.page || 1
                    };
                },
                processResults: function (data, params) {
                    console.log(data);
                    return {
                        results: data.items,
                        pagination: {
                            more: data.more
                        }
                    };
                },
                cache: true
            },
            minimumInputLength: minimumInputLength,
            placeholder: 'Search...', // Placeholder text
            allowClear: true, // Allow clearing the selection
            //templateResult: function (item) {
            //    if (item.loading) {
            //        return item.text;
            //    }
            //    return item.text;
            //},
            //templateSelection: function (item) {
            //    return item.text;
            //}
        });
    },

    // Initialize Select2 with basic options
    base: function (selector, options) {
        $(selector).select2(options);
    },

    // Initialize Select2 without search
    noSearch: function (selector) {
        $(selector).select2({
            width: '100%',
            minimumResultsForSearch: Infinity
        });
    },

    // Initialize Select2 with icons
    icon: function (selector) {
        $(selector).select2({
            placeholder: 'Select one choice',
            width: '100%',
            templateResult: this.iconFormat,
            minimumResultsForSearch: Infinity,
            templateSelection: this.iconFormat,
            escapeMarkup: function (m) { return m; }
        });
    },

    // Helper function for icon formatting
    iconFormat: function (icon) {
        var originalOption = icon.element;
        if (!icon.id) { return icon.text; }
        var $icon = '<i class="ph-' + $(icon.element).data('icon') + ' ' + $(icon.element).data('color') + '"></i>' + icon.text;
        return $icon;
    }
};