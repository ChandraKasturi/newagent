import useTokenStore from '../store/tokenStore'

export const fetchWithSession = async (url, options = {}) => {
  const sessionId = useTokenStore.getState().sessionId
  console.log('Session ID:', sessionId)
  const headers = {
    'Content-Type': 'application/json',
    ...(sessionId && { 'x-session-id': sessionId }),
    ...options.headers,
  }

  return fetch(url, {
    ...options,
    credentials: 'include',
    headers,
  })
}