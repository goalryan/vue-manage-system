/**
 * Created by liushaojun on 2017/8/4.
 */
export default function plugin(Vue, axios, qs, v) {
    const VueAxios = Vue;

    if (plugin.installed) {
        return;
    }
    plugin.installed = true;
    if (!axios) {
        console.error('You have to install axios');
        return;
    }

    //响应时间
    axios.defaults.timeout = 6000;
    //配置请求头
    axios.defaults.headers.post['Content-Type'] = 'application/json';
    //配置接口地址
    axios.defaults.baseURL = 'http://192.168.10.249/auth';
    axios.interceptors.request.use((config) => {
        // config.headers.common['Authorization'] = sessionStorage.getItem("token");
        // config.headers.common['EnterpriseId'] = sessionStorage.getItem("enterpriseId");
        //在发送请求之前做某件事（以表单形式提交数据）
        // if (config.method === 'post') {
        //     config.data = qs.stringify(config.data);
        // }
        return config;
    }, (error) => {
        console.log("错误的传参");
        return Promise.reject(error);
    });

    axios.interceptors.response.use((response) => {
        return response.data;
    }, (error) => {
        if (error.response === undefined) {
            Vue.prototype.$message({ message: '服务异常，请联系供应商', type: 'error' });
            return;
        }
        if (error.response.status === 426) {
            window.location.href = '#/login';
        }
        // return Promise.reject(error);
    });

    VueAxios.axios = axios;
    Object.defineProperties(VueAxios.prototype, {
        $http: {
            get() {
                return axios;
            }
        }
    });
}
