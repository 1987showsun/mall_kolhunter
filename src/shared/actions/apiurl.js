const API_ADDRESS = () => {
    if( process.env.NODE_ENV_DEV==true ){
        return "https://api.kolhunter.com";
    }else{
        return  "";
    }
}

export default function API(){
    return {
        'signin': {
            'inc': ""
        },
        'signup': {
            'inc': `${API_ADDRESS()}/v1/vendor/join`
        },
        'forget': {
            'inc': ""
        }
    }
}