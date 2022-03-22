const SERIALIZE_OBJ = 'SERIALIZE_OBJ'

export default {
  isString: function (str) {
    if (str === null) {
      return false
    } else {
      return (typeof str === 'string') && str.constructor === String
    }
  },
  isArray: function (obj) {
    if (obj === null) {
      return false
    } else {
      return (typeof obj === 'object') && obj.constructor === Array
    }
  },
  isObject: function (obj) {
    if (obj === null) {
      return false
    } else {
      return (typeof obj === 'object') && obj.constructor === Object
    }
  },
  isFunction: function (obj) {
    if (obj === null) {
      return false
    } else {
      return (typeof obj === 'function')
    }
  },
  isEmptyObject(e) {
    var t
    for (t in e) {
      return false
    }
    return true
  },
  isEmptyArray(array) {
    if (!array || array.length === 0) {
      return true
    }
    return false
  },
  isNull(value) {
    if (value !== undefined && value !== null) {
      return true
    }
    return false
  },
  /**
   * isNotNull(value)此工具函数的作用:验证入参不等于空
   * 返回值说明：当value等于undefined或null时返回false
   *            否则返回true
   * @param {} value 
   * @returns 
   */
  isNotNull(value) {
    if (value == undefined && value == null) {
      return false
    }
    return true
  },  
  clone: function (obj) {
    var str
    var newobj = obj.constructor === Array ? [] : {}
    if (typeof obj !== 'object') {
      return
    } else if (window.JSON) {
      str = JSON.stringify(obj) // 序列化对象
      newobj = JSON.parse(str) // 还原
    } else {
      for (var i in obj) {
        newobj[i] = typeof obj[i] === 'object' ? this.clone(obj[i]) : obj[i]
      }
    }
    return newobj
  },

  //字符串转base64
  encode(str){
    if(!str) return '';
    // 对字符串进行编码
    var encode = encodeURI(str);
    // 对编码的字符串转化base64
    var base64 = btoa(encode);
    return base64;
  },
    
  // base64转字符串
  decode(base64){
    if(!base64) return '';
    // 对base64转编码
    var decode = atob(base64);
    // 编码转字符串
    var str = decodeURI(decode);
    return str;
  },

  serialize(obj) {
    var name = SERIALIZE_OBJ
    var result = "";
    function serializeInternal(o, path) {
      for (var p in o) {
        var value = o[p];
        if (typeof value != "object") {
          if (typeof value == "string") {
            result += "\n" + path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "] = " + "\"" + value.replace(/\"/g, "\\\"") + "\"" + ";";
          } else {
            result += "\n" + path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "] = " + value + ";";
          }
        }
        else {
          if (value instanceof Array) {
            result += "\n" + path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "]" + "=" + "new Array();";
            serializeInternal(value, path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "]");
          } else {
            result += "\n" + path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "]" + "=" + "new Object();";
            serializeInternal(value, path + "[" + (isNaN(p) ? "\"" + p + "\"" : p) + "]");
          }
        }
      }
    }
    serializeInternal(obj, name);
    return result;
  },
  deserialize(str) {
    var SERIALIZE_OBJ = {}
    eval(str)
    return SERIALIZE_OBJ
  }
}