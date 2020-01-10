/*
 *   Copyright (c) 2020 
 *   All rights reserved.
 */

// Images
import kvNullImage                   from '../images/init/1000x427initKvImages.jpg';
import nullImages                    from '../images/init/420x420initBlockImages.jpg';

export const initKv = () => {
    let   data  = [];
    for( let i=0 ; i<3 ; i ++ ){
        data = [
            ...data,
            {
                url   : '',
                title : '',
                image : kvNullImage
            }
        ]
    }

    return data;
}

export const initStore = () => {
    let data = [];
    for( let i=0 ; i<30 ; i++ ){
        data = [ 
            ...data, 
            { 
                id          : i,
                name        : 'Mall Kolhunter',
                description : null,
                cover       : kvNullImage,
                photo       : nullImages,
                modified    : 0,
                productCount: 0,
                saleTotal   : 0
            }
        ]
    }
    return data;
} 

export const initProduct = () => {
    let   data  = [];
    for( let i=0 ; i<30 ; i ++ ){
        data = [
            ...data,
            {
                token        : i,
                name         : "",
                price        : 0,
                sellPrice    : 0,
                createTimeMs : 0,
                modifyTimeMs : 0,
                onSale       : "n",
                combo        : true,
                adult        : false,
                images       : [
                    {
                        path : nullImages,
                        sort : 0
                    }
                ]
            }
        ]
    }
    return data;
}