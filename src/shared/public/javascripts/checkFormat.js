/*
 *   Copyright (c) 2019 
 *   All rights reserved.
 */

import React from 'react';
import lang from '../lang/lang.json';

// 密碼檢查
export function PWD( form ){
    const PWD = form['password'];
    const confirmPWD = form['confirm'];
    let msg = "", status=true;
    if( PWD!="" && PWD == confirmPWD) {
        let re;
        if(PWD.length < 8) {
            status = false;
            msg = "password must contain at least eight characters";
        }
        re = /[0-9]/;
        if(!re.test(PWD)) {
            status = false;
            msg = "password must contain at least one number (0-9)";
        }
        re = /[a-z]/;
        if(!re.test(PWD)) {
            status = false;
            msg = "password must contain at least one lowercase letter (a-z)";
        }
        re = /[A-Z]/;
        if(!re.test(PWD)) {
            status = false;
            msg = "password must contain at least one uppercase letter (A-Z)";
        }
        return {
            status,
            msg
        }
    } else {
        msg = "please check that you've entered and confirmed your password";
        return {
            status: false,
            msg
        }
    }
}

// 發票-是否全部由數字組成
export const isNumber = string => {
    const regexp = /^[0-9]+$/;
    return regexp.test(string);
}

export const isPhoneNumber = string => {
    if (string==null){
        return false;
    }
    if (string.trim()=="") {
        return false;
    }
    var regexp = /^!*([0-9]!*){10,}$/;
    var phoneNum = string.split("-").join("").split(" ").join("");
    return regexp.test(phoneNum);
}

// 發票-自然人憑證
export const isCertificated = string  => {
    var regexp = /^[a-zA-Z]{2}[0-9]{14}$/;
    return regexp.test(string);
}

// 發票-手機條碼
export const isInvoice = string => {
    var regexp = /^\/{1}[0-9"+".A-Z]{7}$/;
    return regexp.test(string);
}

export const checkRequired = ( required=[], formObject={} ) => {
    return required.filter( keys => {
        if(formObject[keys]=="" || formObject[keys]==null || formObject[keys]==undefined ){
            return true;
        }
    }).map( keys => {
        return <div key={keys} className="items">{lang['zh-TW']['note'][`${keys} required`]}</div>;
    })
}