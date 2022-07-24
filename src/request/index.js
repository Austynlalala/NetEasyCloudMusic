// 在此脚本中封装axios
import axios from 'axios';
// 创建axios实例
const service = axios.create({
    baseURL:'http://localhost:3000/',
    timeou:3000,
})
export default service;