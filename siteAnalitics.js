class Analytics {
    static instance = null
    diffUrlsAttends = []
    ourUrlsAttends = []
    ourUrl = 'facebook.com'
    fileName = 'test.txt'
    fs = require("fs");
    
    static getInstance() {
        if (this.instance == null) {
            this.instance = new Analytics()
        }
        return this.instance
    }
    newAttend(user) {
        if (this.ourUrl !== user.url) {
            this.diffUrlsAttends.push(`this url : ${user.url} attend us in ${user.time.toLocaleString()}\n`)
        }
        else {
            this.ourUrlsAttends.push('someone went from our url')
        }
    }
    clear() {
        this.diffUrlsAttends = []
        this.ourUrlsAttends = []
        console.log('DATA WAS DELETED')
    }
    save() {
        console.log('loading ....')
        setTimeout(() => {
            const file = this.fs.createWriteStream(this.fileName);
            this.diffUrlsAttends.forEach((el) => {
                file.write(el)
            })
            this.ourUrlsAttends.forEach((el) => {
                file.write(el)
            })
            console.log(`Data was saved`)
        }, 2000)
    }
}


let a = Analytics.getInstance()
a.newAttend({ url: 'instagram.com', time: new Date() })
a.newAttend({ url: 'vk.com', time: new Date() })
a.newAttend({ url: 'facebook.com', time: new Date() })

a.save()