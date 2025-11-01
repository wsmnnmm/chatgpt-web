export function getCurrentDate() {
  const date = new Date()
  const day = date.getDate()
  const month = date.getMonth() + 1
  const year = date.getFullYear()
  return `${year}-${month}-${day}`
}

export function parseQueryString(url: string): Record<string, string> {
  const params: Record<string, string> = {};
  const queryStart = url.indexOf('?');
  if (queryStart === -1) return params;

  const hashStart = url.indexOf('#', queryStart);
  const queryString = hashStart === -1 ? url.slice(queryStart + 1) : url.slice(queryStart + 1, hashStart);

  queryString.split('&').filter(Boolean).forEach(pair => {
    const [key, ...values] = pair.split('=');
    if (key) {
      const decodeKey = decodeURIComponent(key.trim());
      const decodeValue = values.length ? decodeURIComponent(values.join('=').trim()) : '';
      params[decodeKey] = decodeValue;
    }
  });

  return params;
}