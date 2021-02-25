<template>
  <div id="pat-data">
      <top-selection></top-selection>
      <div class="bottom-area">
          <div class="work-body">
              <div class="for-search">
                <label>编号:</label><el-input v-model="sk.patient_id_v" placeholder="编号" type="number"></el-input>
                <label>姓名:</label><el-input v-model="sk.patient_name_v" placeholder="姓名"></el-input>
                <label>民族:</label><el-input v-model="sk.patient_native_v" placeholder="民族"></el-input>
                <el-button type="primary" plain @click="start_search">检索</el-button>
              </div>
              <div class="for-show">
                  <!---->
                <el-table
                :data="pat_list"
                style="width: 100%;"
                :height="'100%'"
                :stripe="true"
                :border="true"
                :highlight-current-row="true"
                :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center','color':'rgba(100,100,100,0.8)'}">
                <el-table-column
                    prop="id"
                    label="编号"
                    >
                </el-table-column>
                <el-table-column
                    prop="name"
                    label="姓名"
                    >
                </el-table-column>
                <el-table-column
                    prop="age"
                    label="年龄">
                </el-table-column>
                <el-table-column
                    prop="sex"
                    label="性别">
                </el-table-column>
                <el-table-column
                    prop="nation"
                    label="民族">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        @click="show_des(scope.$index, scope.row)"
                        type="success" plain>详情</el-button>
                    </template>
                </el-table-column>
                </el-table>
                  <!---->
              </div>
              <el-pagination
                background
                layout="prev, pager, next"
                :total="page_control.totle_count"
                @current-change="change_page"
                :current-page.sync="page_control.cur_page"
                :page-size="20"
                >
              </el-pagination>
          </div>
      </div>
      <el-drawer
        title=""
        :visible.sync="drawer"
        :with-header="false"
        direction="rtl"
        size="25%">
        <div class="visit-show">
            <div class="drawer-title">
                <el-link type="primary" disabled icon="el-icon-user">就诊记录</el-link>
            </div>
            <div class="drawer-body">
                <el-divider><i class="el-icon-view"></i></el-divider>
                <el-table
                :data="vis_list"
                style="width: 100%;"
                :stripe="true"
                :border="true"
                :highlight-current-row="true"
                :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}">
                <el-table-column
                    prop="id"
                    label="就诊编号"
                    >
                </el-table-column>
                <el-table-column
                    prop="time"
                    label="时间">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        @click="show_vis_des(scope.$index, scope.row)"
                        type="primary" plain>详情</el-button>
                    </template>
                </el-table-column>
                </el-table>
            </div>
        </div>
        </el-drawer>
        <el-dialog title="就诊数据" :visible.sync="dialog_show">
            <div class="cus-dialog-box">
                <div class="summarize-box">
                    <div class="visit-time">本次就诊时间为:<span class="item-value">{{vis_show.visit_time}}</span></div> 
                </div>
                <div class="check-box">
                    <el-divider><i class="el-icon-reading"></i></el-divider>
                    <div class="check-statistic">共进行<span>{{vis_show.check_sta.ecg_check_num}}次检查</span></div>
                    <el-link type="success" disabled icon="el-icon-link">心电检查(共{{ecg_check_num}}条)</el-link>
                    <div class="des-item-re-con" v-for="item in vis_show.check_sta.ecg_check_list" :key="item.report_id">
                        <div v-for="(v,k) in item" :key="k" class="item-con">
                            <span class="item-name">{{$store.state.ori_name.checks[k]}}</span><span class="item-value">: {{v?v:'--'}}</span>
                        </div>
                    </div>
                </div>
                <div class="lab-box">
                    <el-divider><i class="el-icon-reading"></i></el-divider>
                    <div class="lab-statistic">共进行<span>{{vis_show.lab_sta.com_lab_num + vis_show.lab_sta.mic_lab_num}}次检验</span></div>
                    <el-link type="success" disabled icon="el-icon-link">普通检验(共{{vis_show.lab_sta.com_lab_num}}条)</el-link>
                    <div class="des-item-re-con" v-for="item in vis_show.lab_sta.com_lab_list" :key="item.report_id">
                        <div v-for="(v,k) in item" :key="k" class="item-con">
                            <span class="item-name">{{$store.state.ori_name.labs[k]}}</span><span class="item-value">: {{v?v:'--'}}</span>
                        </div>
                    </div>
                    <el-link type="success" disabled icon="el-icon-link">微生物检验(共{{vis_show.lab_sta.mic_lab_num}}条)</el-link>
                    <div class="des-item-re-con" v-for="item in vis_show.lab_sta.mic_lab_list" :key="item.report_id">
                        <div v-for="(v,k) in item" :key="k" class="item-con">
                            <span class="item-name">{{$store.state.ori_name.labs[k]}}</span><span class="item-value">: {{v?v:'--'}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </el-dialog>
  </div>
</template>

<script>
import TopSelection from 'components/top-selection.vue'
import AxiosFactory from 'js/request.js'
export default {
    created(){
        this.reget_totle()
        this.get_data_by_page()
    },
    data(){
        return{
            sk:{
                patient_id_v:'',
                patient_name_v:'',
                patient_nation_v:''
            },
            req_data:{
                patient_id_v:'',
                patient_name_v:'',
                patient_nation_v:''
            },
            page_control:{
                totle_count:0,
                cur_page:1
            },
            vis_show:{
                visit_time:'now',
                check_sta:{
                    ecg_check_num:0,
                    ecg_check_list:[]
                },
                lab_sta:{
                    com_lab_num:0,
                    mic_lab_num:0,
                    com_lab_list:[],
                    mic_lab_list:[]
                }
            },
            pat_list:[],
            drawer:false,
            vis_list:[],
            dialog_show:false
        }
    },
    methods:{
        check_no_empty(value){
            if(value === '' || value === -1 || !value){
                return false
            }
            return true
        },
        start_search(){
            this.req_data.patient_id_v = this.sk.patient_id_v
            this.req_data.patient_name_v = this.sk.patient_name_v
            this.req_data.patient_nation_v = this.sk.patient_nation_v
            this.page_control.cur_page = 1
            this.reget_totle()
            this.get_data_by_page()
        },
        handle_search_condition(){
            let data = {}
            if(this.check_no_empty(this.req_data.patient_id_v)){
                data.patient_id = '=' + parseInt(this.req_data.patient_id_v)
            }
            if(this.check_no_empty(this.req_data.patient_name_v)){
                data.patient_name = "~'" + this.req_data.patient_name_v + "'"
            }
            if(this.check_no_empty(this.req_data.patient_nation_v)){
                data.nation_name = "~'" + this.req_data.patient_nation_v + "'"
            }
            return data
        },
        reget_totle(){
            let axios_ins = AxiosFactory()
            let data = this.handle_search_condition()  
            axios_ins.get('/pat-dat/cou',{
                params:data
            }).then(result=>{
                this.page_control.totle_count = parseInt(result.data.result.rows[0]['count'])
            })
        },
        get_data_by_page(){
            let axios_ins = AxiosFactory()
            let data = this.handle_search_condition()
            data.page = this.page_control.cur_page
            axios_ins.get('/pat-dat/list',{
                params:data
            }).then(result=>{
                this.pat_list = result.data.result.rows
            })
        },
        change_page(page){
            this.page_control.cur_page = page
            this.get_data_by_page()
        },
        show_des(index,row){
            let patient_id = row.id
            let axios_ins = AxiosFactory()
            axios_ins.get('/pat-dat/vis-list',{
                params:{
                    patient_id
                }
            }).then(result=>{
                this.vis_list = result.data.result.rows
                this.drawer = true
            })
            
        },
        show_vis_des(index,row){
            let visit_id = row.id
            this.vis_show.visit_time = row.time
            this.request_vis_data('eg_view',visit_id,'checks',(result)=>{
                this.vis_show.check_sta.ecg_check_num = result.data.result.rows.length
                this.vis_show.check_sta.ecg_check_list = result.data.result.rows
            })
            this.request_vis_data('com_lab_view',visit_id,'lab',(result)=>{
                this.vis_show.lab_sta.com_lab_num = result.data.result.rows.length
                this.vis_show.lab_sta.com_lab_list = result.data.result.rows
            })
            this.request_vis_data('mic_lab_view',visit_id,'lab',(result)=>{
                this.vis_show.lab_sta.mic_lab_num = result.data.result.rows.length
                this.vis_show.lab_sta.mic_lab_list = result.data.result.rows
            })
            this.dialog_show = true
        },
        request_vis_data(type,visit_id,schema,callback){
            let axios_ins = AxiosFactory()
            axios_ins.get('/pat-dat/q-b-vis',{
                params:{
                    visit_id,
                    type,
                    schema
                }
            }).then(result=>{
                callback(result)
            })
        },
        parse_to_n_v(obj){
            
        }
    },
    components:{
        TopSelection
    }
}
</script>

<style>
    @import url('~css/pat-data.css');
</style>