export default [
    {
        key: 'status',
        type: 'buttonTest',
        title: '狀態（點擊加入販售）',
        text: {
            "off": '未加入販賣',
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
        path: '/myvendor/info/product'
    },
    {
        key: 'brand',
        type: 'text',
        title: '品牌'
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