<template>
    <Card style="width:100%;height:100%" :dis-hover="true" :bordered="false">
        <p slot="title">密钥申请</p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="客户号" prop="customerNo">
                <Input v-model="formValidate.customerNo" placeholder="请输入客户号"></Input>
            </FormItem>
            <FormItem label="客户名" prop="companyName">
                <Input v-model="formValidate.companyName" placeholder="请输入客户名"></Input>
            </FormItem>
            <FormItem label="订单号" prop="orderNumber">
                <Input v-model="formValidate.orderNumber" placeholder="请输入订单号"></Input>
            </FormItem>
            <FormItem label="激活数量" prop="regTotal">
                <Input v-model="formValidate.regTotal" type="number" placeholder="请输入激活数量"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
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
                
                if (value < 1) {
                    return callback(new Error('激活数量至少大于0'));
                }

                callback();
            };

            return {
                loading: false,
                formValidate: {
                    customerNo: '',
                    companyName: '',
                    orderNumber: '',
                    regTotal: '',
                },
                ruleValidate: {
                    customerNo: [
                        { required: true, message: '客户号不能为空', trigger: 'blur' }
                    ],
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
                        console.log(this.formValidate);
                        this.$Message.success('Success!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        }
    }
</script>