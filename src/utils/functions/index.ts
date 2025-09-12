export function getCurrentDate() {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

export function parseQueryString(search:any) {
  const params = {} as any;
  if (!search || search === '?') return params;

  // 移除开头的 "?"
  const queryStr = search.substring(1);
  // 分割参数对（如 "a=1&b=2" → ["a=1", "b=2"]）
  const pairs = queryStr.split('&');

  for (const pair of pairs) {
    // 分割键和值（如 "a=1" → ["a", "1"]）
    const [key, value] = pair.split('=');
    if (key) {
      // 解码 URL 编码的字符（如 %20 → 空格）
      const decodeKey = decodeURIComponent(key);
      const decodeValue = value ? decodeURIComponent(value) : '';
      params[decodeKey] = decodeValue;
    }
  }

  return params;
}