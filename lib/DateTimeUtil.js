const DAY_PER_WEEK = 7

export default {
    formatDate(date, fmt) {
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        let o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds()
        }
        for (let k in o) {
            if (new RegExp(`(${k})`).test(fmt)) {
                let str = o[k] + ''
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
            }
        }
        return fmt
    },
    padLeftZero(str) {
        return ('00' + str).substr(str.length)
    },
    getDateTime(date) {
        return this.formatDate(date, 'yyyy-MM-dd hh:mm:ss')
    },
    getDate(date) {
        return this.formatDate(date, 'yyyy-MM-dd')
    },
    getDateStr(datetimeStr) {
        if (datetimeStr) {
            return this.formatDate(new Date(Date.parse(datetimeStr.replace(/-/gi, "/"))), 'yyyy-MM-dd')
        }
        return ""
    },
    getTimeStr(datetimeStr) {
        if (datetimeStr) {
            return this.formatDate(new Date(Date.parse(datetimeStr.replace(/-/gi, "/"))), 'hh:mm:ss')
        }
        return ""
    },
    getDateTimeMin() {
        return this.getDateTime(new Date(0))
    },
    getDateTimeNow() {
        return this.getDateTime(new Date())
    },
    getTimestamp() {
        return '' + new Date().getTime()
    },
    getDateTimeStamp(dateStr) {
        return Date.parse(dateStr.replace(/-/gi, "/"));
    },
    getTimeNow() {
        return this.formatDate(new Date(), 'hh:mm:ss')
    },
    /**
     * 获取当前年份最开始时间
     * @param date
     */
    getYearStart(date) {
        return this.formatDate(date, 'yyyy-01-01 00:00:00');
    },
    /**
     * 获取当前年份结束时间
     * @param date
     */
    getYearEnd(date) {
        return this.formatDate(date, 'yyyy-12-31 23:59:59');
    },
    /**
     *  // 获取传入时间的当前周的其实日期
     * @param {*} date
     * @param {*} offset
     */
    getCurrentWeekBeginDate(date) {
        var beginDate = new Date(date);
        var day = beginDate.getDay();
        var offset = day == 0 ? 7 : day;
        return this.getBeforeDate(beginDate, offset)

    },
    getCurrentWeekEndDate(date) {
        var endDate = new Date(date);
        var day = endDate.getDay();
        var offset = day == 0 ? 0 : 7 - day;
        return this.getAfterDate(endDate, offset);

    },

    /**
 *  // 获取传入时间的下周的其实日期
 * @param {*} date
 * @param {*} offset
 */
    getNextWeekBeginDate(date) {
        var beginDate = new Date(date);
        var day = beginDate.getDay();
        var offset = day == 0 ? 1 : 8 - day;
        return this.getAfterDate(beginDate, offset)

    },
    getNextWeekEndDate(date) {
        var endDate = new Date(date);
        var day = endDate.getDay();
        var offset = day == 0 ? 7 : 14 - day;
        return this.getAfterDate(endDate, offset);

    },
    /**
     *  // 获取date本周起offset个周的结束时间，
     * @param {*} date
     * @param {*} offset
     */
    getWeekBeginDay(date, offset) {
        if (!date) { // 如果date没传则取当前时间
            date = new Date()
        }
        if (!offset) {
            offset = 0
        }
        var day = date.getDate()
        if (date.getDay() != 0) {
            day = day - date.getDay() + 1
        } else {
            day = day - 6
        }
        var tempDay = new Date(date.getFullYear(), date.getMonth(), day) // 获取date本周一日期
        tempDay.setDate(tempDay.getDate() + DAY_PER_WEEK * (offset)) // 设置date (offset)个周后的周一日期
        // tempDay.setMilliseconds(tempDay.getMilliseconds() - 1) // 设置date offset个周的结束日期
        return this.getDate(tempDay)
    },
    /**
     *  // 获取date当月起offset个周的结束时间，
     * @param {*} date
     * @param {*} offset
     */
    getWeekEndDay(date, offset) {
        if (!date) { // 如果date没传则取当前时间
            date = new Date()
        }
        if (!offset) {
            offset = 0
        }
        var day = date.getDate()
        if (date.getDay() != 0) {
            day = day + 7 - date.getDay()
        } else {
            day 
        }
        var tempDay = new Date(date.getFullYear(), date.getMonth(), day) // 获取date本周日日期
        tempDay.setDate(tempDay.getDate() + DAY_PER_WEEK * (offset)) // 设置date (offset+1)个周后的周日日期
        // tempDay.setMilliseconds(tempDay.getMilliseconds() - 1) // 设置date offset个周的结束日期
        return this.getDate(tempDay)
    },
    /**
     * 获取date所在月开始时间，某个月的一号的00:00:00
     * @param {*} date
     */
    getMonthBeginDay(date, offset) {

        if (!offset) {
            offset = 0
        }
        var monBeginDay = new Date(date.getFullYear(), date.getMonth(), 1)
        monBeginDay.setMonth(date.getMonth() + offset) // 设置date (offset+1)个月后的一号
        return this.getDate(monBeginDay)
    },
    /**
     * 获取date当月起offset个月的结束时间，即下一个月最后一天的23:59:59
     * @param {*} date 当前时间
     * @param {*} offset +表示offset个月后，-表示offset个月前
     */
    getMonthEndDay(date, offset) { //
        if (!date) { // 如果date没传则取当前时间
            date = new Date()
        }
        if (!offset) {
            offset = 0
        }
        var tempDay = this.getMonthBeginDay(date, offset + 1)
        var newDate = new Date(tempDay)
        var endDate = new Date(newDate.getFullYear(), newDate.getMonth(), newDate.getDate() - 1)
        // tempDay.setMilliseconds(tempDay.getMilliseconds() - 1) // 设置date offset个月的结束日期
        return this.getDate(endDate)
    },

    /**
     * 格式化前台时间显示，显示 月前，周前，天前，小时前，分钟前，刚刚
     * @param dateTimeStamp 2019-03-22 00:00:00
     * @returns {string}
     */
    getDateDiff(dateTimeStamp) {
        var dateTimeStamp = Date.parse(dateTimeStamp.replace(/-/gi, "/"))

        var result;

        var minute = 1000 * 60;
        var hour = minute * 60;
        var day = hour * 24;
        //var halfamonth = day * 15;
        var month = day * 30;
        var now = new Date().getTime();
        var diffValue = now - dateTimeStamp;

        if (diffValue < 0) {
            return
        }
        var monthC = diffValue / month;
        var weekC = diffValue / (7 * day);
        var dayC = diffValue / day;
        var hourC = diffValue / hour;
        var minC = diffValue / minute;
        if (monthC >= 1) {
            result = "" + parseInt(monthC) + "月前"
        } else if (weekC >= 1) {
            result = "" + parseInt(weekC) + "周前"
        } else if (dayC >= 1) {
            result = "" + parseInt(dayC) + "天前"
        } else if (hourC >= 1) {
            result = "" + parseInt(hourC) + "小时前"
        } else if (minC >= 1) {
            result = "" + parseInt(minC) + "分钟前"
        } else
            result = "刚刚"
        return result
    },

    /**
     * 获取前后几个月的时间
     * @param date {date}
     * @param n {string}
     * @returns {string}
     */
    getMonthDate(date, n) {
        date.setMonth(date.getMonth() + Number(n));
        var yy1 = date.getFullYear();
        var mm1 = date.getMonth() + 1; //因为getMonth（）返回值是 0（一月） 到 11（十二月） 之间的一个整数。所以要给其加1
        var dd1 = date.getDate();
        if (mm1 < 10) {
            mm1 = '0' + mm1;
        }
        if (dd1 < 10) {
            dd1 = '0' + dd1;
        }
        return yy1 + '-' + mm1 + '-' + dd1
    },
    // 获取前n天的日期
    getBeforeDate(date, n) {
        let nDay = n;
        let d = new Date(date);

        let year = d.getFullYear();
        let mon = d.getMonth() + 1;
        let day = d.getDate();
        if (day <= nDay) {
            if (mon > 1) {
                mon = mon - 1;
            } else {
                year = year - 1;
                mon = 12;
            }
        }
        d.setDate(d.getDate() - nDay + 1);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        day = d.getDate();
        let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
        return s;
    },
    // 获取后n天的日期
    getAfterDate(date, n) {
        let nDay = n;
        let d = new Date(date);
        let year = d.getFullYear();
        let mon = d.getMonth() + 1;
        let day = d.getDate();
        if (day <= nDay) {
            if (mon > 1) {
                mon = mon + 1;
            } else {
                year = year + 1;
                mon = 12;
            }
        }
        d.setDate(d.getDate() + nDay);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        day = d.getDate();
        let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
        return s;
    },
    // 获取前n月的日期
    getBeforeMonth(date, n) {
        let nMonth = n;
        let d = new Date(date);
        let year = d.getFullYear();
        let mon = d.getMonth() + 1;
        let day = d.getDate();
        if (day <= nMonth) {
            if (mon > 1) {
                mon = mon - 1;
            } else {
                year = year - 1;
                mon = 12;
            }
        }
        d.setMonth(d.getMonth() - nMonth);
        d.setDate(d.getDate() + 1);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        day = d.getDate();
        let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
        return s;
    },
    // 获取前n年的日期
    getBeforeYear(date, n) {
        let nYear = n;
        let d = new Date(date);
        let year = d.getFullYear();
        let mon = d.getMonth() + 1;
        let day = d.getDate();
        if (day <= nYear) {
            if (mon > 1) {
                mon = mon - 1;
            } else {
                year = year - 1;
                mon = 12;
            }
        }
        d.setFullYear(d.getFullYear() - nYear);
        d.setMonth(d.getMonth());
        d.setDate(d.getDate() + 1);
        year = d.getFullYear();
        mon = d.getMonth() + 1;
        day = d.getDate();
        let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
        return s;
    },

    isToday(date) {
        var d = new Date(date.replace(/-/g, "/"));
        var todaysDate = new Date();
        if (d.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0)) {
            return true;
        } else {
            return false;
        }
    },
    /**
     * 获取两日期之间日期列表函数
     * @param {String} stime   起始日期 '2021-09-01'
     * @param {String} etime   结束日期 '2021-09-30'
     */ 
    getDateListBetweenDate(stime,etime){
        //初始化日期列表，数组
        var diffdate = new Array();
        var i=0;
        //开始日期小于等于结束日期,并循环
        while(stime<=etime){
            diffdate[i] = stime;
            
            //获取开始日期时间戳
            var stime_ts = new Date(stime).getTime();
            console.log('当前日期：'+stime   +'当前时间戳：'+stime_ts);
            
            //增加一天时间戳后的日期
            var next_date = stime_ts + (24*60*60*1000);
            
            //拼接年月日，这里的月份会返回（0-11），所以要+1
            var next_dates_y = new Date(next_date).getFullYear()+'-';
            var next_dates_m = (new Date(next_date).getMonth()+1 < 10)?'0'+(new Date(next_date).getMonth()+1)+'-':(new Date(next_date).getMonth()+1)+'-';
            var next_dates_d = (new Date(next_date).getDate() < 10)?'0'+new Date(next_date).getDate():new Date(next_date).getDate();
    
            stime = next_dates_y+next_dates_m+next_dates_d;
            
            //增加数组key
            i++;
        }
        return diffdate;
    }

    /**
     * @description 获取服务器时间(无需后台接口支持)
     * @author jamieyan@tencent.com
     * @param {Function} callback 成功回调
     * @param {Function} error    失败回调
     */
    // getServerTime(callback, error){
    //   var xhr, dateStr;
    //   if(window.XMLHttpRequest){
    //     xhr = new XMLHttpRequest();
    //   } else if(window.ActiveXObject){
    //     xhr = new ActiveXObject("Microsoft.XMLHTTP");
    //   }
    //   xhr.onreadystatechange = function(){
    //     // 一般ajax取readyState为4时处理，
    //     // 因为这里只需要response header，所以可以早一些就得到结果
    //     if(xhr.readyState === 3){
    //       // 从response header里取得Date字段，不区分大小写
    //       // 所有标准的hosp_workHTTP服务都会返回Date
    //       // 这里的Date便是服务器时间了
    //       dateStr = xhr.getResponseHeader("Date");
    //       // 处理回调
    //       if (dateStr && ("function" === typeof callback)) {
    //         callback(dateStr);
    //       } else if ("function" === typeof error){
    //         error(xhr);
    //       }
    //       // 时间都已经取到了，可以把ajax停掉
    //       xhr.abort();
    //     }
    //   };
    //   // 这里的路径要根据你的实际情况选择
    //   // 因为有些服务器404返回会比较慢
    //   // 尽量选择返回body较小，反应速度快的路径
    //   xhr.open("GET", "/404.htm", true);
    //   xhr.send(null);
    // }

}