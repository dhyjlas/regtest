<template>
    <Card style="width:100%;height:100%" :dis-hover="true" :bordered="false">
        <p slot="title">密钥结果</p>
        <h2>激活码已申请成功，以下是您的激活信息：</h2>
        <Divider />
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="客户号" prop="customerNo">
                <Input v-model="$store.state.regInfo.customerNo" readonly></Input>
            </FormItem>
            <FormItem label="客户名" prop="companyName">
                <Input v-model="$store.state.regInfo.companyName" readonly></Input>
            </FormItem>
            <FormItem label="订单号" prop="orderNumber">
                <Input v-model="$store.state.regInfo.orderNumber" readonly></Input>
            </FormItem>
            <FormItem label="激活数量" prop="regTotal">
                <Input v-model="$store.state.regInfo.regTotal" readonly></Input>
            </FormItem>
            <FormItem label="激活码" prop="pollCode">
                <Input v-model="$store.state.regInfo.pollCode" readonly></Input>
            </FormItem>
        </Form>
    </Form>
    </Card>
</template>
<script>
    export default {
        data () {
            return {
            }
        },
        mounted() {

        },
        methods: {
            
        }
    }
</script>