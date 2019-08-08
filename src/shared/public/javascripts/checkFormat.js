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