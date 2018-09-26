<template>
    <div>
        <Modal :mask-closable="false" :closable="false" v-model="newModal" width="400" cancel-text>
            <p slot="header">
                <span>身份认证</span>
            </p>
            <div style="text-align:center">
                请输入口令：<Input type="password" v-model="user.password" style="width: 270px" @on-enter="login()"/>
            </div>
            <div slot="footer">
                <Button type="primary" size="large" @click="login()">确认</Button>
            </div>
        </Modal>

        <Modal :mask-closable="false" :closable="false" v-model="error" width="400" cancel-text>
            <p slot="header">
                <span>警告</span>
            </p>
            <div style="text-align:center">
                浏览器版本过低，请使用IE8.0+、FireFox3.0+、Chrome4.0+等以上版本的浏览器
            </div>
            <div slot="footer">
                <Button type="primary" size="large" @click="ok()">确认</Button>
            </div>
        </Modal>
    </div>
</template>
<script>
    import md5 from '@/plugins/md5'
    export default {
        data () {
            return {
                error: false,
                failure: 0,
                newModal: false,
                user: {
                    password: ""
                }
            };
        },
        computed: {
            
        },
        mounted(){
            if(!window.localStorage){
                this.error = true;
            }else{
                this.axios({
                    method: 'get',
                    url: '/check'
                }).then(response => {
                    if(response.data.status == false){
                        this.newModal = true;
                    }else{
                        this.$emit("routerpush", {name : "index"});
                    }
                }).catch(error => {
                    this.newModal = true;
                })
            }
        },
        methods: {
            login(){
                this.axios({
                    method: 'get',
                    url: '/auth',
                    params: {
                        password: md5.md5(this.user.password + new Date().getTime().toString().substring(0, 8))
                    }
                }).then(response => {
                    if(response.data.status == true){
                        window.localStorage.setItem('currentUser_token', response.data.data)
                        this.newModal = false;
                        this.$emit("routerpush", {name : "index"});
                    }else{
                        this.newModal = true;
                        this.failure ++;
                        if(this.failure >= 5){
                            this.$Modal.error({
                                title: response.data.msg,
                                content: "为了保证能正常登录，请先检查您的系统时间是否正确。如若忘记密码，请联系管理员。"
                            });
                            this.failure = 0;
                        }else{
                            this.$Message.error(response.data.msg);
                        }
                    }
                }).catch(error => {
                    this.newModal = true;
                    this.$Message.error("系统异常，请稍后重试");
                })
            },
            ok(){
                if(!window.localStorage){
                    this.error = true;
                }else{
                    this.error = false;
                }
            }
        }
    }
</script>
