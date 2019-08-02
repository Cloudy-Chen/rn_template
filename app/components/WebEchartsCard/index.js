import LineAndBarCharts from './js/LineAndBarCharts';
import PieCharts from './js/PieCharts';
import LineAndBarTables from './js/LineAndBarTables';
import PieTables from './js/PieTables';
import constants from './js/constants';

const WebEchartsCard = {
  get LineAndBarCharts() {return LineAndBarCharts},
  get LineAndBarTables() {return LineAndBarTables},
  get PieCharts() {return PieCharts},
  get PieTables() {return PieTables},
  get constants() {return constants},
}

module.exports=WebEchartsCard
