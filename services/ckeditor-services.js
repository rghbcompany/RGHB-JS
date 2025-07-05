const CKEditorServices = {
    initBasic: function (selector) {
        if (!selector) {
            console.error("CKEditor selector is required.");
            return Promise.reject(new Error("CKEditor selector is required."));
        }

        return new Promise((resolve, reject) => {
            ClassicEditor
                .create(document.querySelector(selector), {
                    language: {
                        // The UI will be English.
                        ui: window.language,
                        // But the content will be edited in Arabic.
                        content: window.language
                    },
                    toolbar: [
                        'bold', 'italic', 'underline', 'fontColor', 'highlight', '|',
                        'bulletedList', 'numberedList', '|', 'heading',
                    ]
                })
                .then(editor => {
                    resolve(editor); // Resolve the promise with the editor instance
                })
                .catch(error => {
                    console.error("CKEditor initialization error:", error);
                    reject(error); // Reject the promise with the error
                });
        });
    }

    ,
    initPro: function (selector) {
        if (!selector) {
            console.error("CKEditor selector is required.");
            return Promise.reject(new Error("CKEditor selector is required."));
        }

        return new Promise((resolve, reject) => {
            ClassicEditor
                .create(document.querySelector(selector), {
                    language: {
                        // The UI will be English.
                        ui: window.language,
                        // But the content will be edited in Arabic.
                        content: window.language
                    },
                    toolbar: {
                        items: [
                            'heading',
                            'bold', 'italic', 'strikethrough', 'underline',
                            'bulletedList', 'numberedList', 'todoList',
                            'fontSize', 'fontColor', 'fontBackgroundColor', 'highlight',
                            'alignment',
                            'link', 'insertTable',
                            'horizontalLine'
                        ],
                        shouldNotGroupWhenFull: false
                    },
                    htmlSupport: {
                        allow: [
                            {
                                name: /.*/,
                                attributes: true,
                                classes: true,
                                styles: true
                            }
                        ]
                    },
                    list: {
                        properties: {
                            styles: true,
                            startIndex: true,
                            reversed: true
                        }
                    },
                    heading: {
                        options: [
                            { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                            { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                            { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' },
                            { model: 'heading3', view: 'h3', title: 'Heading 3', class: 'ck-heading_heading3' },
                            { model: 'heading4', view: 'h4', title: 'Heading 4', class: 'ck-heading_heading4' },
                            { model: 'heading5', view: 'h5', title: 'Heading 5', class: 'ck-heading_heading5' },
                            { model: 'heading6', view: 'h6', title: 'Heading 6', class: 'ck-heading_heading6' }
                        ]
                    },
                    fontSize: {
                        options: [10, 12, 14, 'default', 18, 20, 22],
                        supportAllValues: true
                    },
                    placeholder: '',
                    link: {
                        decorators: {
                            addTargetToExternalLinks: true,
                            defaultProtocol: 'https://',
                            toggleDownloadable: {
                                mode: 'manual',
                                label: 'Downloadable',
                                attributes: {
                                    download: 'file'
                                }
                            }
                        }
                    },
                })
                .then(editor => {
                    resolve(editor); // Resolve the promise with the editor instance
                })
                .catch(error => {
                    console.error("CKEditor initialization error:", error);
                    reject(error); // Reject the promise with the error
                });
        });
    }
};

export default CKEditorServices;