var records = {
    data: [],
    load: function () {
        m.request({
                method: "GET",
                url: "http://localhost:3000/api/persons"
            })
            .then(function (data) {
                count = parseInt(data.count);
                records.data = data;
            })
    }
};
recordView = {
    oninit: records.load,
    view: function () {
        return m(".record-list", records.data.map(function (rec) {
            return m(".record-object",
                Object.keys(rec).map(function (key, index) {
                    const element = rec[key];
                    return [
                        m(".record-key", key),
                        m(".record-value", element)
                    ];
                })
            );
        }));
    }
};
m.mount(document.body, recordView);
