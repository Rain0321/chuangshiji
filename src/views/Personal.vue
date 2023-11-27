<template>
    <div class="page-personal">
        <div id="test-echars" style="width: 100%;height: 520px;background:#fff"></div>
        <div id="earth" style="width: 100%;height: 520px;background:#fff;border: 1px;"></div>
        <div id="plane-path" style="width: 100%;height: 520px;background:#fff;border: 1px;"></div>
    </div>
</template>
<script>
import * as echarts from 'echarts';
import { get } from '@/api/http';
import {geoCoordMap,XAData,XNData,YCData} from '@/tools/mapData'
export default {
    data() {
        return {
            charts: '',
            optionData: ["155", "400", "900", "800", "300", "900", "270"]
        }
    },
    methods: {
        // 折线图
        drawLine(id) {
            this.charts = echarts.init(document.getElementById(id));
            this.charts.setOption({
                    title:{
                        left:'3%',
                        top:'5%',
                        text:"最近一周订单数量",//标题文本，支持使用 \n 换行。
                    },
					tooltip: {
						trigger: 'axis'
					},
					legend: {
                        align:'right',//文字在前图标在后
                        left:'3%',
                        top:'15%',
						data: ['近一周']
					},
					grid: {
                        top:'30%',
						left: '5%',
						right: '5%',
						bottom: '5%',
						containLabel: true
					},
                    toolbox: {
						feature: {
							saveAsImage: {} //保存为图片
						}
					},
					xAxis: {
						type: 'category',
                        boundaryGap:true,
                        axisTick:{
                            alignWithLabel:true //保证刻度线和标签对齐
                        },
                        data: ["周一","周二","周三","周四","周五","周六","周日"] //x坐标的名称
					
					},
					yAxis: {
						type: 'value',
						boundaryGap: true,
                        splitNumber:4, //纵坐标数
                        interval:250 //强制设置坐标轴分割间隔
					},
                    series: [{
						name: '近一周',
						type: 'line', //折线图line;柱形图bar;饼图pie
						stack: '总量',
                        areaStyle: {
                            //显示区域颜色---渐变效果
                            color:{
                                type: 'linear',
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [{
                                    offset: 0, color: 'rgb(255,200,213)' // 0% 处的颜色
                                }, {
                                    offset: 1, color: '#ffffff' // 100% 处的颜色
                                }],
                                global: false // 缺省为 false
                            }
                        },
                        itemStyle: {
							color: 'rgb(255,96,64)', //改变折线点的颜色
							lineStyle: {
								color: 'rgb(255,96,64)' //改变折线颜色
							}
                            
                        },
						data: this.optionData
					}]
            })
        },
        drawEarth() {
            let earthChart = echarts.init(document.getElementById('earth'));
            let option = {
                tooltip: {
                    trigger: 'item',
                    // formatter: ``
                },
                geo: {
                    map: 'china',
                    label: {
                        show: true
                    },
                    zoom: 1.5,
                    roam: true
                }
            };
            get('/static/data/china.json')
                .then( res => {
                    console.log(res);
                    let airData = res.features;
                    //console.log(airData instanceof Array)
                    airData.forEach(item => {
                        item.name = item.properties.name;
                        item.value = 300 * Math.random();

                    });
                    console.log(airData);
                    let scatterData = [ 
                        {value: [85.294711, 41.371801]},
                        { value: [117.000923, 36.675807]}
                    ]
                    option.series =[ 
                        {
                        data: airData,
                        geoIndex: 0,
                        type: 'map',
                        name: '随机数'
                        },
                        {
                            data: scatterData,
                            type: 'effectScatter',
                            coordinateSystem: 'geo',
                            //设置涟漪动画缩放比
                            rippleEffect: {
                                scale: 10
                            }
                        }
                    ]
                    option.visualMap = {
                        min: 0,
                        max: 300,
                        inRange: {
                            color: ['white', 'green']
                        },
                        calculable: true
                    }
                    echarts.registerMap('china', res);
                    earthChart.setOption(option);
                })
        },
        drawPlanePath() {
            let planeChart =echarts.init(document.getElementById('plane-path'))
            var planePath = "path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z";
          //var planePath = 'arrow';
          var convertData = function(data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
              var dataItem = data[i];
            
              var fromCoord = geoCoordMap[dataItem[0].name];
              var toCoord = geoCoordMap[dataItem[1].name];
              if (fromCoord && toCoord) {
                res.push({
                  fromName: dataItem[0].name,
                  toName: dataItem[1].name,
                  coords: [fromCoord, toCoord],
                  value: dataItem[1].value
                });
              }
            }
            return res;
          };
        
          var color = ["#a6c84c", "#ffa022", "#46bee9"]; //航线的颜色
          var series = [];
          [
            ["西安", XAData],
            ["西宁", XNData],
            ["银川", YCData]
          ].forEach(function(item, i) {
            series.push(
              {
                name: item[0] + " Top3",
                type: "lines",
                zlevel: 1,
                effect: {
                  show: true,
                  period: 6,
                  trailLength: 0.7,
                  color: "red", //arrow箭头的颜色
                  symbolSize: 3
                },
                lineStyle: {
                  normal: {
                    color: color[i],
                    width: 0,
                    curveness: 0.2
                  }
                },
                data: convertData(item[1])
              },
              {
                name: item[0] + " Top3",
                type: "lines",
                zlevel: 2,
                symbol: ["none", "arrow"],
                symbolSize: 10,
                effect: {
                  show: true,
                  period: 6,
                  trailLength: 0,
                  symbol: planePath,
                  symbolSize: 15
                },
                lineStyle: {
                  normal: {
                    color: color[i],
                    width: 1,
                    opacity: 0.6,
                    curveness: 0.2
                  }
                },
                data: convertData(item[1])
              },
              {
                name: item[0] + " Top3",
                type: "effectScatter",
                coordinateSystem: "geo",
                zlevel: 2,
                rippleEffect: {
                  brushType: "stroke"
                },
                label: {
                  normal: {
                    show: true,
                    position: "right",
                    formatter: "{b}"
                  }
                },
                symbolSize: function(val) {
                  return val[2] / 8;
                },
                itemStyle: {
                  normal: {
                    color: color[i]
                  },
                  emphasis: {
                    areaColor: "#2B91B7"
                  }
                },
                data: item[1].map(function(dataItem) {
                  return {
                    name: dataItem[1].name,
                    value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value])
                  };
                })
              }
            );
          });
          echarts.registerMap('china', import('@/tools/china.js'));
          var option = {
    tooltip: {
      trigger: "item",
      formatter: function(params, ticket, callback) {
        if (params.seriesType == "effectScatter") {
          return "线路：" + params.data.name + "" + params.data.value[2];
        } else if (params.seriesType == "lines") {
          return (
            params.data.fromName +
            ">" +
            params.data.toName +
            "<br />" +
            params.data.value
          );
        } else {
          return params.name;
        }
      }
    },
    legend: {
      orient: "vertical",
      top: "bottom",
      left: "right",
      data: ["西安 Top3", "西宁 Top3", "银川 Top3"],
      textStyle: {
        color: "#fff"
      },
      selectedMode: "multiple"
    },
    geo: {
      map: "china",
      label: {
        emphasis: {
          show: true,
          color: "#fff"
        }
      },
      // 把中国地图放大了1.2倍
      zoom: 1.2,
      roam: true,
      itemStyle: {
        normal: {
          // 地图省份的背景颜色
          areaColor: "rgba(20, 41, 87,0.6)",
          borderColor: "#195BB9",
          borderWidth: 1
        },
        emphasis: {
          areaColor: "#2B91B7"
        }
      }
    },
    series: series
  };
  planeChart.setOption(option);
  window.addEventListener("resize", function() {
    planeChart.resize();
  });
        }
    },
    mounted() {
        this.$nextTick(function() {
            this.drawLine('test-echars');
            this.drawEarth();
            this.drawPlanePath();
        })
    }
}
</script>