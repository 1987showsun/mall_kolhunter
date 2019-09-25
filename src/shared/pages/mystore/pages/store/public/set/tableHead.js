export default [
    {
        key: 'status',
        type: 'buttonTest',
        title: '狀態（點擊移出販售）',
        text: {
            "off": '未販賣',
            "on": '販賣中'
        },
        className: "status-width"
    },
    {
        key: 'image',
        type: 'img',
        title: '圖片',
        className: 'img-width'
    },
    {
        key: 'name',
        type: 'link',
        title: '名稱',
        className: 'table-min-width',
        path: '/detail'
    },
    {
        key: 'price',
        type: 'number',
        title: '售價'
    },
    {
        key: 'sellPrice',
        type: 'number',
        title: '特價'
    }
]