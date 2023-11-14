import makeRequest from "../httpClient"

export const fetchUsers = (params?: string) =>
  makeRequest({
    url: `/search/users?q=${params}`,
    method: "GET",
    
  })


