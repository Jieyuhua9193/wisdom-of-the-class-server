export default (code: Number, data?: any) => {
  switch (code) {
    case 0:
      return successFn(code, data);
    case -1:
      return errorFn(code);
  }
}

interface IResponse {
  code: Number,
  result?: any,
  msg?: String
}

function successFn(code: Number, data ?: any): IResponse {
  return {
    code: code,
    result: data || null
  }
}

function errorFn(code: Number): IResponse {
  let msg: String;
  switch (code) {
    case -1:
      msg = '系统异常';
      break;
    case -2:
      msg = '账户/密码错误';
      break;
    case -3:
      msg = '权限不足';
      break;
    default:
      msg = '未知错误';
  }
  return {
    code: code,
    msg: msg
  }
}

