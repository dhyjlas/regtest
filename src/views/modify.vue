<template>
    <Card style="width:100%;height:100%" :dis-hover="true" :bordered="false">
        <p slot="title">信息修改</p>
        <Form ref="formValidate" :model="$store.state.modifyInfo" :rules="ruleValidate" :label-width="80">
            <FormItem label="客户号" prop="customerNo">
                <Input v-model="$store.state.modifyInfo.customerNo" placeholder="请输入客户号" disabled></Input>
            </FormItem>
            <FormItem label="客户名" prop="companyName">
                <Input v-model="$store.state.modifyInfo.companyName" placeholder="请输入客户名"></Input>
            </FormItem>
            <FormItem label="订单号" prop="orderNumber">
                <Input v-model="$store.state.modifyInfo.orderNumber" placeholder="请输入订单号"></Input>
            </FormItem>
            <FormItem label="激活数量" prop="regTotal">
                <Input v-model="$store.state.modifyInfo.regTotal" type="number" placeholder="请输入激活数量"></Input>
            </FormItem>
            <FormItem label="激活码" prop="pollCode">
                <Input v-model="$store.state.modifyInfo.pollCode" placeholder="请输入激活数量" disabled></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
            </FormItem>
        </Form>
    </Card>
</template>
<script>
    export default {
        data () {
            const validateAge = (rule, value, callback) => {
                if (!value) {
                    return callback(new Error('激活数量不能为空'));
                }
                
                if (value < 0) {
                    return callback(new Error('激活数量至少大于等于0'));
                }

                callback();
            };

            return {
                formValidate: {
                    id: '',
                    companyName: '',
                    orderNumber: '',
                    regTotal: '',
                },
                loading: false,
                ruleValidate: {
                    companyName: [
                        { required: true, message: '客户名不能为空', trigger: 'blur' }
                    ],
                    orderNumber: [
                        { required: true, message: '订单号不能为空', trigger: 'blur' }
                    ],
                    regTotal: [
                        { required: true, validator: validateAge, trigger: 'blur' }
                    ]
                }
            }
        },
        mounted() {
        },
        methods: {
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.formValidate.id = this.$store.state.modifyInfo.id;
                        this.formValidate.companyName = this.$store.state.modifyInfo.companyName;
                        this.formValidate.orderNumber = this.$store.state.modifyInfo.orderNumber;
                        this.formValidate.regTotal = this.$store.state.modifyInfo.regTotal;

                        this.axios({
                            method: 'post',
                            url: '/order/update',
                            data: this.formValidate
                        }).then(response => {
                            this.$Message.success(response.data.msg);
                        }).catch(error => {
                            console.log(error);
                        })

                        this.$emit("routerpush", {name : "regList"});
                    }
                })
            }
        }
    }
</script>