<template>
    <Card style="width:100%;height:100%" :dis-hover="true" :bordered="false">
        <p slot="title">密钥申请</p>
        <h2>激活码已申请成功，以下是您的激活信息：</h2>
        
        <tbody class="ivu-table-tbody">
            <tr class="ivu-table-row">
                <td class="">
                    <div class="ivu-table-cell">
                        <span>客户号</span>
                    </div>
                </td>
                <td class="">
                    <div class="ivu-table-cell">
                        <span>123456789</span>
                    </div>
                </td>
            </tr>
        </tbody>

    </Card>
</template>
<script>
    export default {
        data () {
            return {
                columns1: [
                    {
                        key: 'name',                        
                        width: 120
                    },
                    {
                        key: 'value',
                        render: (h, params) => {
                            return h('Input',{
                                props:{
                                    type:'text',
                                    value:params.row.value //此处如何让数据双向绑定
                                },
                                on:{
                                    'on-change':(event) => {
                                        console.log(params)
                                    }
                                }
                            })
                        }
                    }
                ],
                data1: [
                    {
                        name: '客户号',
                        value: "",
                    },
                    {
                        name: '客户名',
                        value: "",
                    },
                    {
                        name: '订单号',
                        value: "",
                    },
                    {
                        name: '激活数量',
                        value: "",
                    },
                    {
                        name: '激活码',
                        value: "",
                    }
                ]
            }
        },
        mounted() {
            console.log(this.$store.state.regInfo.customerNo);
            this.data1[0].value = this.$store.state.regInfo.customerNo;
            this.data1[1].value = this.$store.state.regInfo.companyName;
            this.data1[2].value = this.$store.state.regInfo.orderNumber;
            this.data1[3].value = this.$store.state.regInfo.regTotal;
            this.data1[4].value = this.$store.state.regInfo.pollCode;
        },
        methods: {
            
        }
    }
</script>