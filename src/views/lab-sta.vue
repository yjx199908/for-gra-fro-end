<template>
  <div id="lab-sta">
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
                        <span>普通化验</span>
                        </template>
                        <el-menu-item index="1-1">红细胞压积</el-menu-item>
                        <el-menu-item index="1-2">白细胞</el-menu-item>
                        <el-menu-item index="1-3">平均RBC体积</el-menu-item>
                        <el-menu-item index="1-4">血红蛋白浓度</el-menu-item>
                        <el-menu-item index="1-5">血红蛋白</el-menu-item>
                        <el-menu-item index="1-6">单核细胞%</el-menu-item>
                        <el-menu-item index="1-7">单核细胞计数</el-menu-item>
                        <el-menu-item index="1-8">淋巴细胞计数</el-menu-item>
                        <el-menu-item index="1-9">嗜酸性细胞%</el-menu-item>
                        <el-menu-item index="1-10">嗜酸细胞计数</el-menu-item>
                        <el-menu-item index="1-11">嗜碱性细胞%</el-menu-item>
                        <el-menu-item index="1-12">嗜碱细胞计数</el-menu-item>
                        <el-menu-item index="1-13">中性细胞计数</el-menu-item>
                        <el-menu-item index="1-14">中性粒细胞%</el-menu-item>
                        <el-menu-item index="1-15">淋巴细胞%</el-menu-item>
                        <el-menu-item index="1-16">平均PLT体积</el-menu-item>
                        <el-menu-item index="1-17">PLT分布宽度</el-menu-item>
                        <el-menu-item index="1-18">葡萄糖</el-menu-item>
                        <el-menu-item index="1-19">肌酐</el-menu-item>
                        <el-menu-item index="1-20">大血小板比率</el-menu-item>
                        <el-menu-item index="1-21">钙</el-menu-item>
                        <el-menu-item index="1-22">谷草转氨酶</el-menu-item>
                        <el-menu-item index="1-23">乳酸脱氢酶</el-menu-item>
                        <el-menu-item index="1-24">C-反应蛋白</el-menu-item>
                        <el-menu-item index="1-25">尿酸</el-menu-item>
                        <el-menu-item index="1-26">尿素氮</el-menu-item>
                        <el-menu-item index="1-27">谷丙转氨酶</el-menu-item>
                        <el-menu-item index="1-28">总蛋白</el-menu-item>
                        <el-menu-item index="1-29">白蛋白</el-menu-item>
                        <el-menu-item index="1-30">有核红细胞百分比</el-menu-item>
                        <el-menu-item index="1-31">有核红细胞绝对值</el-menu-item>
                        <el-menu-item index="1-32">二氧化碳</el-menu-item>
                        <el-menu-item index="1-33">钠</el-menu-item>
                        <el-menu-item index="1-34">氯</el-menu-item>
                        <el-menu-item index="1-35">钾</el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>微生物化验</span>
                        </template>
                        <el-menu-item index="2-1">沙眼衣原体</el-menu-item>
                        <el-menu-item index="2-2">肺炎克雷伯菌</el-menu-item>
                        <el-menu-item index="2-3">解脲支原体(Uu)</el-menu-item>
                        <el-menu-item index="2-4">大肠埃希菌</el-menu-item>
                        <el-menu-item index="2-5">人型支原体（Mh）</el-menu-item>
                        <el-menu-item index="2-6">铜绿假单胞菌</el-menu-item>
                        <el-menu-item index="2-7">鲍曼不动杆菌</el-menu-item>
                        <el-menu-item index="2-8">表皮葡萄球菌</el-menu-item>
                        <el-menu-item index="2-9">人型支原体(Mh)</el-menu-item>
                        <el-menu-item index="2-10">金黄色葡萄球菌</el-menu-item>
                        <el-menu-item index="2-11">生长B群链球菌</el-menu-item>
                        <el-menu-item index="2-12">阴沟肠杆菌</el-menu-item>
                        <el-menu-item index="2-13">阴沟肠杆菌阴沟亚种</el-menu-item>
                        <el-menu-item index="2-14">肺炎支原体</el-menu-item>
                        <el-menu-item index="2-15">弗氏柠檬酸杆菌</el-menu-item>
                        <el-menu-item index="2-16">屎肠球菌(D群)</el-menu-item>
                        <el-menu-item index="2-17">人型葡萄球菌</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                        <i class="el-icon-location"></i>
                        <span>抗药性检验</span>
                        </template>
                        <el-menu-item index="3-1">待扩展</el-menu-item>
                    </el-submenu>
                </el-menu>
          </div>
          <div class="cnt-main-body">
              <div id="lab_graph" class="graph"></div>
          </div>
      </div>
  </div>
</template>

<script>
import TopSelection from 'components/top-selection.vue'
import * as echarts from 'echarts'
import AxiosFactory from 'js/request.js'
export default {
    data(){
        return{
            color_arr:['rgba(54,104,255,0.8)','rgba(255,113,50,0.8)','rgba(107,204,210,0.8)','rgba(172,113,255,0.8)','rgba(74,232,121,0.8)','rgba(189,1,160,0.8)','rgba(229,28,62,0.8)']
        }
    },
    created(){
        setTimeout(()=>{this.load_graph_line('检验数据统计',['-','-','-','-','-','-','-','-'],[0,0,0,0,0,0,0,0])},10,'数量','数值')
    },
    components:{
        TopSelection
    },
    methods:{
        show_graph(index){
            if(index.startsWith('1-')){
                this.show_graph_line(index)
            }
            else if(index.startsWith('2-')){
                this.show_graph_pie(index)
            }
        },
        show_graph_line(index){
            let target = this.$store.state.menu_map['labs'][index].split('#')[0]
            let axios_ins = AxiosFactory()
            console.log(AxiosFactory)
            axios_ins.get(`/lab-sta${target}`).then(result=>{
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
                this.load_graph_line(this.$store.state.menu_map['labs'][index].split('#')[1],bottom_arr,left_arr,'数量','数值')
            })
        },
        load_graph_line(text_str,x_data,y_data,left_str,bottom_str){
            let my_graph = echarts.init(document.getElementById('lab_graph','light'))
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
                    },
                    
                }
                ],
                textStyle:{
                    color:'black',
                    fontSize:16
                }
            })
        },
        show_graph_pie(index){
            let target = this.$store.state.menu_map['labs'][index].split('#')[0]
            let axios_ins = AxiosFactory()
            console.log(AxiosFactory)
            axios_ins.get(`/lab-sta${target}`).then(result=>{
                console.log(result)
                let data = []
                let color_index = Math.floor(Math.random() * 7)
                for(let item in result.data.result.rows){
                    if (!result.data.result.rows[item][target.split('/')[2]]){
                        continue
                    }
                    let temp = {
                        value:result.data.result.rows[item]['cou'],
                        name:result.data.result.rows[item][target.split('/')[2]] + '(' + result.data.result.rows[item]['cou'] + ')',
                        itemStyle:{
                            color:this.color_arr[color_index]
                        }
                        
                    }
                    color_index = (color_index + 1) % 7
                    data.push(temp)
                }
                this.load_graph_pie(this.$store.state.menu_map['labs'][index].split('#')[1],data)
            })
        },
        load_graph_pie(text_str,data){
            console.log(data)
            let my_graph = echarts.init(document.getElementById('lab_graph','light'))
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
                series : [
                    {
                        name: text_str,
                        type: 'pie',
                        radius: '55%',
                        data:data
                    }
                ]
            })

        }
    }
}
</script>

<style>

</style>