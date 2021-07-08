const moment = require('moment')

let adminName = ['Atyant','Yatharth']

module.exports = {
    checkAdmin: function (loggedUser) {
        let flag = false;
        for (i = 0; i < adminName.length; i++) {
            if (adminName[i].toString() == loggedUser.firstName.toString()){
                flag = true
            }
        } 
        return flag;
    },
}