export default {
    'products': [
        {
            key: 'status',
            type: 'buttonTest',
            title: '動作',
            text: {
                "off": '加入產品',
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
        },
        {
            key    : 'kolFee',
            type   : 'text',
            title  : '分潤比'
        }
    ],
    'store': [
        {
            key: 'status',
            type: 'text',
            title: '動作',
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
            title: '導購連結',
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
        },
        {
            key: 'kolFee',
            type: 'text',
            title: '分潤比'
        }
    ],
    'fansorders': [
        {
            key: 'orderID',
            type: 'text',
            title: '粉絲訂單編號',
            className: 'id'
        },
        {
            key: 'productName',
            type: 'text',
            title: '商品名稱',
            className: 'productName',
        },
        {
            key: 'count',
            type: 'number',
            title: '購買數量'
        },
        {
            key: 'purchasePrice',
            type: 'number',
            title: '商品單價'
        },
        {
            key: 'totalPrice',
            type: 'number',
            title: '總金額'
        },
        {
            key: 'productFee',
            type: 'number',
            title: '可分得金額'
        },
        {
            key: 'percent',
            type: 'text',
            title: '分潤比'
        },
    ]
}