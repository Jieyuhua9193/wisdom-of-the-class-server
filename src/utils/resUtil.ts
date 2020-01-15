export default (code: Number, data?: any) => {
  if (code >= 0) {
    return successFn(code, data);
  } else {
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
    case -21:
      msg = '账户/密码错误';
      break;
    case -22:
      msg = '权限不足';
      break;
    case -23:
      msg = '激活码错误';
    default:
      msg = '未知错误';
  }
  return {
    code: code,
    msg: msg
  }
}

