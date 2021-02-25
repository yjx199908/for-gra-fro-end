<template>
  <div id="che-sta">
      <top-selection></top-selection>
      <div class="cnt-main">
          <div class="cnt-main-left">
                <el-menu
                    default-active="1"
                    class="el-menu-vertical-demo"
                    @select="show_graph">
                    <el-submenu index="1">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>心电检查</span>
                        </template>
                        <el-menu-item index="1-1">心室率</el-menu-item>
                        <el-menu-item index="1-2">心房率</el-menu-item>
                        <el-menu-item index="1-3">P波宽度</el-menu-item>
                        <el-menu-item index="1-4">PR间期</el-menu-item>
                        <el-menu-item index="1-5">QRS宽度</el-menu-item>
                        <el-menu-item index="1-6">QT/QTc</el-menu-item>
                        <el-menu-item index="1-7">QRS电轴</el-menu-item>
                        <el-menu-item index="1-8">RV5</el-menu-item>
                        <el-menu-item index="1-9">SV1</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>病理检查</span>
                        </template>
                        <el-menu-item index="2-1">待扩展</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>放射检查</span>
                        </template>
                        <el-menu-item index="3-1">待扩展</el-menu-item>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>超声检查</span>
                        </template>
                        <el-menu-item index="4-1">待扩展</el-menu-item>
                    </el-submenu>
                </el-menu>
          </div>
          <div class="cnt-main-body">
              <div id="check_graph" class="graph"></div>
          </div>
      </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import TopSelection from 'components/top-selection.vue'
import AxiosFactory from 'js/request.js'
export default {
    created(){
        setTimeout(()=>{this.load_graph('检查数据统计',['-','-','-','-','-','-','-','-'],[0,0,0,0,0,0,0,0])},10,'数量','数值')
    },
    components:{
        TopSelection
    },
    methods:{
        show_graph(index){
            let target = this.$store.state.menu_map['checks'][index].split('-')[0]
            let axios_ins = AxiosFactory()
            console.log(AxiosFactory)
            axios_ins.get(`/che-sta${target}`).then(result=>{
                console.log(result)
                let bottom_arr = []
                let left_arr = []
                
                for(let item in result.data.result.rows){
                    if(!result.data.result.rows[item][target.split('/')[2]]){
                        continue
                    }
                    bottom_arr.push(result.data.result.rows[item][target.split('/')[2]])
                    left_arr.push(result.data.result.rows[item].cou)
                }
                console.log(bottom_arr)
                console.log(left_arr)
                this.load_graph(this.$store.state.menu_map['checks'][index].split('-')[1],bottom_arr,left_arr,'数量','数值')
            })
        },
        load_graph(text_str,x_data,y_data,left_str,bottom_str){
            let my_graph = echarts.init(document.getElementById('check_graph','light'))
            my_graph.setOption({
                title: {
                    text: text_str,
                    x:'center',
                    textStyle: { //主标题文本样式{"fontSize": 18,"fontWeight": "bolder","color": "#333"}
                        fontSize: 16,
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                    },
                },
                tooltip: {},
                xAxis: {
                    name:bottom_str,
                    nameTextStyle:{
                        color:'black',
                        align:'left'
                    },
                    data: x_data,
                    axisLabel: {
                        show: true,
                        textStyle: {
                            fontSize : 16      //更改坐标轴文字大小
                        }
                    },
                },
                yAxis: {
                    name:left_str,
                    nameTextStyle:{
                        color:'black',
                        align:'left'
                    },
                    axisLabel: {
                        show: true,
                        textStyle: {
                            fontSize : 16      //更改坐标轴文字大小
                        }
                    },
                },
                series: [{
                    name: '值',
                    type: 'line',
                    data: y_data,
                    lineStyle:{
                        color:'yellow'
                    }
                }],
                textStyle:{
                    color:'black',
                    fontSize:16
                }
            })
        }
    }
}
</script>
<style>

</style>