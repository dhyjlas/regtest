<template>
    <Card style="width:100%;height:100%" :dis-hover="true" :bordered="false">
        <p slot="title">设备列表</p>
        <div>
            <Row style="margin-bottom: 25px;">
                <Col span="6">客户号：
                	<Input v-model="customerNo" placeholder="请输入..." style="width:180px"></Input>
                </Col>
                <Col span="6">密钥：
                	<Input v-model="pollCode" placeholder="请输入..." style="width:180px"></Input>
                </Col>
                <Col span="6">设备号：
                	<Input v-model="equipmentId" placeholder="请输入..." style="width:180px"></Input>
                </Col>
                <Col span="2"><Button type="primary" shape="circle" icon="ios-search" @click="search()" :loading="loading">搜索</Button></Col>
                <Col span="2"><Button type="default" shape="circle" icon="md-cloud-download" @click="download()" :loading="loading2">导出</Button></Col>
            </Row>
        </div>
        <div style="padding: 10px 0;">
            <Table border ref="selection" :columns="columns" :data="data" @on-sort-change='e=>{sortClick(e)}'></Table>
        </div>
        <div style="text-align: right;">
            <Page :total="total" :page-size="size" :page-size-opts="sizeOpts" show-elevator show-sizer show-total @on-change="e=>{pageSearch(e)}" @on-page-size-change="e=>(sizeSearch(e))"/>
        </div>
    </Card>
</template>
<script>
    export default {
        data () {
            return {
                loading: false,
                total: 0,
                size: 10,
                page: 0,
                key: "",
                order: "",
                customerNo: "",
                pollCode: "",
                equipmentId: "",
                sizeOpts: [10, 20, 30, 50],
                columns: [
                    {
                        title: '序号',
                        key: 'serial',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '客户号',
                        key: 'customerNo',
                        sortable: 'custom'
                    },
                    {
                        title: '密钥',
                        key: 'pollCode',
                        sortable: 'custom'
                    },
                    {
                        title: '设备号',
                        key: 'equipmentId',
                        sortable: 'custom'
                    },
                    {
                        title: '首次激活时间',
                        key: 'firstRegStr',
                        sortable: 'custom'
                    },
                    {
                        title: '最后一次激活时间',
                        key: 'lastRegStr',
                        sortable: 'custom'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row.id)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    },
                ],
                data: [],
            }
        },
        mounted() {
            this.setTable();
        },
        methods: {
            //获取订单数据，填入表格
            getTable(e) {
                this.$Loading.start();
                this.axios({
                    method: 'get',
                    url: '/server/active/list',
                    params: {
                        size: e.size,
                        page: e.page,
                        customerNo: e.customerNo,
                        pollCode: e.pollCode,
                        equipmentId: e.equipmentId,
                        sort: e.sort,
                        direction: e.direction
                    }
                }).then(response => {
                    if(response.data.data.numberOfElements < 1 && response.data.data.totalElements > 0){
                        //处理最后一页最后一条删除问题
                        this.axios({
                            method: 'get',
                            url: '/server/active/list',
                            params: {
                                size: e.size,
                                page: e.page - 1,
                                customerNo: e.customerNo,
                                pollCode: e.pollCode,
                                equipmentId: e.equipmentId,
                                sort: e.sort,
                                direction: e.direction
                            }
                        }).then(response => {
                            this.data = response.data.data.content;
                            this.total = response.data.data.totalElements;
                            this.$Loading.finish();
                            this.loading = false;
                        }).catch(error => {
                            console.log(error);
                            this.$Loading.finish();
                            this.loading = false;
                        })
                    }else{
                        this.data = response.data.data.content;
                        this.total = response.data.data.totalElements;
                        this.$Loading.finish();
                        this.loading = false;
                    }
                }).catch(error => {
                    console.log(error);
                    this.$Loading.finish();
                    this.loading = false;
                })
            },
            //切页按钮
            pageSearch(e) {
                this.page = e-1;
                this.setTable();
            },
            //显示数目切换按钮
            sizeSearch(e) {
                this.size = e;
                this.setTable();
            },
            //搜索按钮
            search(e){
                this.loading = true;
                this.setTable();
            },
            //表格刷新
            setTable(){
                this.getTable({  
                    size: this.size,
                    page: this.page,
                    customerNo: this.customerNo,
                    pollCode: this.pollCode,
                    equipmentId: this.equipmentId,
                    sort: this.key,
                    direction: this.order
                });
            },
            //删除按钮
            remove (e) {
                this.$Modal.confirm({
                    title: '提醒',
                    content: '<p>是否确认删除</p>',
                    onOk: () => {
                        this.axios({
                            method: 'delete',
                            url: '/server/active/'+e
                        }).then(response=>{
                            this.$Message.success(response.data.msg);
                            this.setTable();
                        })
                    },
                    onCancel: () => {
                    }
                });
            },
            //排序按钮
            sortClick(e) {
                this.key = e.key;
                this.order = e.order;
                this.setTable();
            },
            //下载按钮
            download(e) {
                this.loading2 = true;
                this.axios({
                    method: 'get',
                    url: '/server/active/download',
                    responseType: 'blob',
                    params: {
                                size: this.size,
                                page: this.page,
                                customerNo: this.customerNo,
                                pollCode: this.pollCode,
                                equipmentId: this.equipmentId,
                                sort: this.key,
                                direction: this.order
                            }
                }).then(response => {
                    this.output(response.data, response.headers.filename)
                }).catch((error) => {
                    this.$Message.error("下载失败，请刷新后重试");
                    this.loading2 = false;
                })
            },
            output (data, fileName) {
                if (!data || !fileName) {
                    this.$Message.error("下载失败，请刷新后重试");
                    this.loading2 = false;
                    return
                }
                let url = window.URL.createObjectURL(new Blob([data]));
                let link = document.createElement('a');
                link.style.display = 'none';
                link.href = url;
                link.download = fileName;

                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(url);
                this.loading2 = false;
            }
        }
    }
</script>