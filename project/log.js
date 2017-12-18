var DEBUG = true;

export default log = (TAG, ...optionalParams) => {
    if(DEBUG){
        optionalParams.forEach(function(element) {
            console.log(TAG,element);
        }, this);
        
    }
};