/**
 * 应用需要访问的所有常量
 */

export default {
  EMAIL_REGEX: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  MIN_PASSWORD_LENGTH: 6,
  CLIENT_ID: 'ffb12e79140e7b6597ba',
  CLIENT_SECRET: 'd07dadbce095325cebfc40a46eb467e906063927',
  BASE_HEADER: {
    'Accept': 'application/vnd.github.v3.full+json',
    'Content-Type': 'application/json',
  },
  BASE_PAGE_LIMIT: 10,
  LOGIN_SCREEN: 'Login',
  REPOSITORY_LIST_SCREEN: 'RepositoriesList',
  REPOSITORY_DETAILS_SCREEN: 'RepositoryDetails',
  HARDWARE_PRESS_EVENT:'hardwareBackPress',

  SUCCESS:'SUCCESS',
  FAIL:'FAIL',
  INITIAL: '',

  // URL
  SUPNUEVO_BASE_URL: 'http://211.87.224.40:8080/supnuevo',
  SUPNUEVO_VENTAS_BASE_URL: 'http://211.87.224.40:8080/supnuevo_ventas',
  SPORTS_HOT_BASE_URL: 'http://114.215.99.2',

  SUPNUEVO_TEST_BASE_URL: 'http://192.168.1.109:8080/supnuevo',
  SUPNUEVO_VENTAS_TEST_BASE_URL: 'http://192.168.1.100:8080/supnuevo_ventas',
  SPORTS_HOT_TEST_BASE_URL: 'http://localhost:8080/badmintonhot',

  // STACK

  // GOOS
  TYPE_1: "食物",
  TYPE_2: "化妆品",
  TYPE_3: "生活用品",
  TYPE_4: "服饰",

  // DATA
  GET_DATAS_SUCCESS : 'GET_DATAS_SUCCESS',
  GET_DATAS_FAIL : 'GET_DATAS_FAIL',
  GET_MORE_DATAS_SUCCESS : 'GET_MORE_DATAS_SUCCESS',
  GET_MORE_DATAS_FAIL : 'GET_MORE_DATAS_FAIL',
  GET_DATA_DETAIL_SUCCESS : "GET_DATA_DETAIL_SUCCESS",
  GET_DATA_DETAIL_FAIL : "GET_DATA_DETAIL_FAIL",
  ADD_DATA_SUCCESS : "ADD_DATA_SUCCESS",
  ADD_DATA_FAIL : "ADD_DATA_FAIL",
  EDIT_DATA_SUCCESS : "EDIT_DATA_SUCCESS",
  EDIT_DATA_FAIL : "EDIT_DATA_FAIL",
  DELETE_DATA_SUCCESS : "DELETE_DATA_SUCCESS",
  DELETE_DATA_FAIL : "DELETE_DATA_FAIL",

  // CHART
  ADRESS_DROP_DOWN : ['中国','日本','美国'],
  TIME_DROP_DOWN : ['1月','2月','3月'],
  TYPE_DROP_DOWN : ['食物','服饰','生活'],

  // MAP
  BAIDU_MAP: "百度地图",
  BING_MAP: "微软地图",
}
