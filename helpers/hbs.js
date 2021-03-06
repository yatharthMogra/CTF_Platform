const moment = require('moment')

let adminName = ['Atyant','Yatharth']

module.exports = {
    inc: function (value) {
        return parseInt(value) + 1;
    },
    checkAdmin: function (loggedUser) {
        let flag = false;
        for (i = 0; i < adminName.length; i++) {
            if (adminName[i].toString() == loggedUser.firstName.toString()){
                flag = true
            }
        } 
        return flag;
    },
    questionStatus: function (quesNo, worldNo, loggedUser) {
        if ( loggedUser.worldNumber > worldNo ) {
            return true;
        }
        else if ( (loggedUser.worldNumber == worldNo) && (loggedUser.questionNumber >= quesNo ) ){
            return true
        }
        else {
            return false
        }
    },
    worldStatus: function (worldNo, loggedUser) {
        if (loggedUser.worldNumber >= worldNo ){
            return true
        }
        else {
            return false
        }
    },
    submitStatus: function (usrWNoSol, usrQNoSol, qNo, WNo) {
        if(usrWNoSol>WNo){
            return false
        }
        else if ( usrWNoSol==WNo && usrQNoSol>=qNo ) {
            return false
        }
        else{
            return true
        }
    },
    formatDate: function (date, format) {
        return moment(date).format(format)
    },
    truncate: function (str, len) {
        if (str.length > len && str.length > 0) {
            let new_str = str + ' '
            new_str = str.substr(0, len)
            new_str = str.substr(0, new_str.lastIndexOf(' '))
            new_str = new_str.length > 0 ? new_str : str.substr(0, len)
            return new_str + '...'
        }
        return str
    },
    stripTags: function (input) {
        return input.replace(/<(?:.|\n)*?>/gm, '')
    },
    editIcon: function (loggedUser, worldId, floating = true) {
        let flag = false;
        for (i = 0; i < adminName.length; i++) {
            if(adminName[i].toString() == loggedUser.toString()) flag = true
        } 
        if (flag) {
            if (floating) {
                return `<a href="/worlds/edit/${worldId}" class="btn-floating halfway-fab blue"><i class="fas fa-edit fa-small"></i></a>`
            } else {
                return `<a href="/worlds/edit/${worldId}"><i class="fas fa-edit"></i></a>`
            }
        } else {
            return ''
        }
    },
    lockIcon: function (questionStatus) {
        if (questionStatus) {
            return `<a class="btn-floating halfway-fa blue"><i class="fa fa-unlock fa-small"></i></a>`
        } else {
            return `<a class="btn-floating halfway-fa grey"><i class="fa fa-lock"></i></a>`
        }
    },
    qImage: function (question) {
        let ans = `
        <div class="card" id="carousel">
            <div class="carousel carousel-slider center">
        `
        for (let i = 1; i <= question.imageNo; i++) {
            let imge = question.worldNumber+'_'+question.questionNo+'_'+i
            ans+= `
            <div class="carousel-item red" href="#one!">
                <img class="imgg" src="/img/${imge}.jpg" >
            </div>
            `
        }
        ans+= `
            </div>
        </div>
        `
        if(question.imageNo > 0){
            return ans
        }
        else{
            return ``
        }
    },
    wImage: function (worldNo) {
        let ans = `<img class="background-image" src="/img/${worldNo}.png">`
        return ans
    },
    qAudio: function (question) {
        if (question.audioNo == 1){
            if(question.worldNumber == 3 && question.questionNo == 1){
                let aud = 'ALAPMIEMAT'
                return `
                    <div class="card">
                        <audio controls>
                            <source src="/audio/${aud}.mp3" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                    `
            }
            else if(question.worldNumber == 3 && question.questionNo == 3){
                let aud = 'DEEPSOUND'
                return `
                    <div class="card">
                        <audio controls>
                            <source src="/audio/${aud}.wav" type="audio/mpeg">
                            Your browser does not support the audio element.
                        </audio>
                    </div>
                    `
            }
        let aud = question.worldNumber+'_'+question.questionNo
        return `
            <div class="card">
                <audio controls>
                    <source src="/audio/${aud}.mp3" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            </div>
            `
        }
        else{
            return ``
        }
    },
    qVideo: function (question) {
        if (question.videoNo == 1){
        let vid = question.worldNumber+'_'+question.questionNo
        return `
        <div class="card">
            <video width="400" controls>
                <source src="/video/${vid}.mp4" type="video/mp4">
                Your browser does not support HTML video.
            </video>
        </div>
            `
        }
        else{
            return ``
        }
    },
}