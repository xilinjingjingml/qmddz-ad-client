export namespace confusonFunc {

    export function viewLog(content) {
        let tmp = "oh," + content
        //console.log("jin---" + tmp)
        this.hand()
        this.foot()
        this.showFaly()
        this.showObject()
        this.showSwitch()
        this.showArray()
        // //console.log("jin---sss", this.randomZuOWen())
    }

    export function hand(){
        var str = "Visit W3School!";
        var n = str.search("W3School"); 
        let hh = "方法也可将所有数组元素"
        let jj = "把数组转换为字符串"
        let qq = n + hh + jj
        //console.log("jin---" + n , qq)
        let a = 1
        let b = 2
        let c = 3
        let d = a + b
        //console.log("jin---", a,b,c,d)
        let qqq = "上海"
        let www = "苏州"
        let eee = "怀化"
        let rrr = "芜湖"
        let ttt = "邵阳"
        let yyy = "温州"
        let uuu = "平顶山"
        let aaa = qqq + www
        let ddd = eee + rrr
        let ggg = ttt + yyy
        //console.log("jin---", aaa, ddd, ggg, uuu)
        this.foot()
    }

    export function foot(){
        let ff = Math.floor(Math.random() * 10)
        //console.log("jin---" + ff)
        if(ff === 1){
            let a = 1
            let b = 2
            let c = 3
            let d = a + b
            //console.log("jin---", a,b,c,d)
        }
        else if(ff === 2){
            let a = 1
            let b = 2
            let c = 3
            let d = a + b
            //console.log("jin---", a,b,c,d)
        }
        else if(ff === 3){
            let a = 1
            let b = 2
            let c = 3
            let d = a + b
            //console.log("jin---", a,b,c,d)
        }
        else if(ff === 4){
            let a = 1
            let b = 2
            let c = 3
            let d = a + b
            //console.log("jin---", a,b,c,d)
        }
        else if(ff === 5){
            let a = 1
            let b = 2
            let c = 3
            let d = a + b
            //console.log("jin---", a,b,c,d)
        }else{
            let a = 1
            let b = 2
            let c = 3
            let d = a + b
            //console.log("jin---", a,b,c,d)
        }
        let qqq = "上海"
        let www = "苏州"
        let eee = "怀化"
        let rrr = "芜湖"
        let ttt = "邵阳"
        let yyy = "温州"
        let uuu = "平顶山"
        let aaa = qqq + www
        let ddd = eee + rrr
        let ggg = ttt + yyy
        //console.log("jin---", aaa, ddd, ggg, uuu)
        this.showFaly()
    }

    export function showFaly(){
        var da = new Date();
        //console.log("jin---" + da)
        let a = 3
        let b = 4
        let c = 5
        let d = 6
        let rr = a + b
        let tt = a - c
        let uu = d * c
        let rq = rr/tt
        //console.log("jin---", uu, rq)
        let qqq = "上海"
        let www = "苏州"
        let eee = "怀化"
        let rrr = "芜湖"
        let ttt = "邵阳"
        let yyy = "温州"
        let uuu = "平顶山"
        let aaa = qqq + www
        let ddd = eee + rrr
        let ggg = ttt + yyy
        //console.log("jin---", aaa, ddd, ggg, uuu)
        this.showObject()
    }

    export function showObject(){
        var person = {
            firstName:"John",
            lastName:"Doe",
            age:50,
            eyeColor:"blue"
        };
        for(const cur in person){
            //console.log("jin---" + cur)
        }
        let a = 1
        let b = 2
        let c = 3
        let d = a + b
        //console.log("jin---", a,b,c,d)
        let qqq = "上海"
        let www = "苏州"
        let eee = "怀化"
        let rrr = "芜湖"
        let ttt = "邵阳"
        let yyy = "温州"
        let uuu = "平顶山"
        let aaa = qqq + www
        let ddd = eee + rrr
        let ggg = ttt + yyy
        //console.log("jin---", aaa, ddd, ggg, uuu)
    }

    export function showSwitch(){
        var dat = new Date().getDay(); 
        let x = null
        switch (dat) 
        { 
        case 0:x="今天是星期日"; 
        break; 
        case 1:x="今天是星期一"; 
        break; 
        case 2:x="今天是星期二"; 
        break; 
        case 3:x="今天是星期三"; 
        break; 
        case 4:x="今天是星期四"; 
        break; 
        case 5:x="今天是星期五"; 
        break; 
        case 6:x="今天是星期六"; 
        break; 
        }
        //console.log("jin---", x)
        let a = 3
        let b = 4
        let c = 5
        let d = 6
        let rr = a + b
        let tt = a - c
        let uu = d * c
        let rq = rr/tt
        //console.log("jin---", uu, rq)
        let qqq = "上海"
        let www = "苏州"
        let eee = "怀化"
        let rrr = "芜湖"
        let ttt = "邵阳"
        let yyy = "温州"
        let uuu = "平顶山"
        let aaa = qqq + www
        let ddd = eee + rrr
        let ggg = ttt + yyy
        //console.log("jin---", aaa, ddd, ggg, uuu)
        this.showArray()
    }

    export function showArray(){
        var fruits = ["Banana", "Orange", "Apple", "Mango"]
        //console.log("jin---", fruits.pop())
        let a = 3
        let b = 4
        let c = 5
        let d = 6
        let rr = a + b
        let tt = a - c
        let uu = d * c
        let rq = rr/tt
        //console.log("jin---", uu, rq)
        let qqq = "上海"
        let www = "苏州"
        let eee = "怀化"
        let rrr = "芜湖"
        let ttt = "邵阳"
        let yyy = "温州"
        let uuu = "平顶山"
        let aaa = qqq + www
        let ddd = eee + rrr
        let ggg = ttt + yyy
        //console.log("jin---", aaa, ddd, ggg, uuu)
    }

    export function randomZuOWen(){
        //TODO 随机单词长度
        //TODO 随机作文长度
        let word = "qwertyuiopasdfghjklzxcvbnm"
        let blankSpace = " "
        let zuoWen = ""
        let wordlenght = 0
        for(let count = 0; count < 100; count++){
            //TODO 随机单词长度 wordlenght
            let curWords = ""
            wordlenght = Math.ceil(Math.random()*7 + 2)
            for(let curWord = 0; curWord < wordlenght; curWord++){
                curWords = curWords + word.charAt(Math.floor(Math.random()*26))
            }
            zuoWen = zuoWen + curWords + blankSpace
        }
        return zuoWen
    }
}