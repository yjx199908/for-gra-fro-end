<template>
  <div id="login-p">
      <div class="login-body">
          <div class="tit-con">用户登录</div>
          <div class="input-item" id="acc-inp">
              <label>账户:</label><el-input type="text" v-model="account_info.account" suffix-icon="el-icon-user"></el-input>
          </div>
          <div class="input-item" id="acc-inp">
              <label>手机:</label><el-input type="text" v-model="account_info.phone" suffix-icon="el-icon-mobile-phone"></el-input>
          </div>
          <div class="input-item" id="pas-inp">
               <label>密码:</label><el-input type="password" v-model="account_info.password" suffix-icon="el-icon-lock"></el-input>
          </div>
          <div class="btn-item" id="btn-con">
                <el-button type="success" :disabled="regis_show" @click="to_login">登录</el-button><el-button type="success" plain :disabled="regis_show" @click="regis_show = true">注册</el-button>
          </div>
      </div>
      <div class="login-body regis-body" v-show="regis_show">
          <div class="tit-con">用户注册</div>
          <div class="input-item" id="acc-inp">
              <label>手机号码:</label><el-input type="text" v-model="regis_info.phone" suffix-icon="el-icon-mobile-phone
"></el-input>
          </div>
          <div class="input-item" id="pas-inp">
               <label>登录密码:</label><el-input type="password" v-model="regis_info.password" suffix-icon="el-icon-lock"></el-input>
          </div>
          <div class="input-item" id="pas-inp">
               <label>确认密码:</label><el-input type="password" v-model="regis_info.verify_pas" suffix-icon="el-icon-lock"></el-input>
          </div>
          <div class="btn-item" id="btn-con">
                <el-button type="success" @click="to_regis">继续</el-button><el-button type="success" plain @click="regis_show =false">取消</el-button>
          </div>
      </div>
      <el-dialog
        title=""
        :visible.sync="dialog_show"
        width="30%"
        :before-close="handleClose">
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialog_show = false">取 消</el-button>
            <el-button type="primary" @click="dialog_show = false">确 定</el-button>
        </span>
        </el-dialog>

  </div>
</template>

<script>
import AxiosFactory from 'js/request.js'
export default {
    data(){
        return {
            account_info:{
                account:'',
                phone:'',
                password:''
            },
            regis_info:{
                phone:'',
                password:'',
                verify_pas:''
            },
            regis_show:false,
            dialog_show:false
        }
    },
    methods:{
        to_login(){
            if(!this.account_info.account || !this.account_info.phone || !this.account_info.password){
                this.$message.error('请完善登录信息！')
                return
            }
            let axios_ins = AxiosFactory()
            axios_ins.get('/pat-man/to-lo',{
                params:{
                    account:this.account_info.account,
                    password:this.account_info.password,
                    phone:this.account_info.phone
                }
            }).then(result=>{
                if(!result.data.success){
                    this.$message.error('登陆失败,系统故障!')
                }
                else{
                    if(result.data.result.rows.length != 1){
                        this.$message.error('登陆失败,请检查账户信息是否正确!')
                    }
                    else{
                        this.$message({
                            type:'success',
                            message:'登陆成功!'
                        })
                        this.$store.state.login_state.logined = true
                        this.$store.state.login_state.login_info = result.data.result.rows[0]
                        this.$router.push('/pat-man/man-p')
                    }
                    
                }
            })
        },
        to_regis(){
            if(!this.regis_info.phone || !this.regis_info.password || !this.regis_info.verify_pas){
                this.$message.error('请完善注册信息!')
                return
            }
            this.dialog_show = true
        }
    }
}
</script>

<style>
    @import url('~css/login-p.css');
</style>