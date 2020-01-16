export default (code: any, data?: any) => {
  if (code >= 0) {
    return {
      code: code,
      result: data || null
    }
  } else {
    return {
      code: code,
      msg: data || null
    }
  }
}
