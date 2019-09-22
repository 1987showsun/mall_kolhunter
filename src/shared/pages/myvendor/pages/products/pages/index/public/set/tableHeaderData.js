export const tableHeadKey = [
    {
        key: 'status',
        type: 'button',
        title: '狀態（點擊 上、下架）',
        text: {
            "auth": '上架中',
            "non-display": '下架中',
            "none-auth": '審核中'
        },
        className: "status-width"
    },
    {
        key: 'cover',
        type: 'img',
        title: '圖片',
        className: 'img-width'
    },
    {
        key: 'name',
        type: 'link',
        title: '名稱',
        className: 'table-min-width',
        path: '/myvendor/products/info'
    },
    {
        key: 'brand',
        type: 'text',
        title: '品牌'
    },
    {
        key: 'category',
        type: 'text',
        title: '分類'
    },
    {
        key: 'store',
        type: 'number',
        title: '店家'
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
    },
    {
        key: 'divided',
        type: 'percent',
        title: '分潤比'
    }
]