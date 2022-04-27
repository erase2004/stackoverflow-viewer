import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.stackexchange.com/2.3'
})

export const apiHelper = axiosInstance
