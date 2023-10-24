export function isJson(str) {
    //Test if it's a json
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

  export function formatDate(date, format) {
    const map = {
      mmm: ("00" + (date.getMonth() + 1)).slice(-2),
      dd: ("00" + date.getDate()).slice(-2),
      yyyy: date.getFullYear(),
      hh: date.getUTCHours(),
      mm: date.getMinutes(),
      ss: date.getSeconds()
    }
    return format.replace(/mmm|dd|yyyy|hh|mm|ss/gi, matched => map[matched])
  }