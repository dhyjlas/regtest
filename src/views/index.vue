<style scoped>
    .layout-con{
        height: 100%;
        width: 100%;
    }
    .menu-item span{
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }
    .menu-item i{
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }
    .collapsed-menu span{
        width: 0px;
        transition: width .2s ease;
    }
    .collapsed-menu i{
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
    .baf {
        content: '';
        display: block;
        width: 1px;
        height: 100%;
        background: #dcdee2;
        position: absolute;
        top: 0;
        bottom: 0;
        right: 0;
        z-index: 1;
    }
    .title{
        color: #dcdee2;
        font-family : 微软雅黑;
        font-weight: normal;
    }
    .layout-logo{
        /* width: 300px; */
        height: 40px;
        /* background: #ffffff; */
        /* border-radius: 3px; */
        float: left;
        /* position: relative; */
        /* top: 15px; */
        /* left: 20px; */
    }
    .layout-logo h2{
        color: #dcdee2;
        font-size:30px;
    }
    .layout-logo img{
        width: 20%;
        height: 100%;
    }
    .layout-nav{
        height: 40px;
        width: 50px;
        margin: 0 auto;
        margin-right: 20px;
    }
</style>
<template>
    <Layout class="layout" :style="{minHeight: '100vh'}">
        <Header>
            <Menu mode="horizontal" theme="dark" active-name="1">
                <div class="layout-logo">
                    <!-- <img src="../assets/logo.png"></img> -->
                    <h2>授 权 中 心</h2>
                </div>
                
                <div class="layout-nav">
                    <Dropdown @on-click="logout()">
                        <a href="javascript:void(0)">
                            <Icon type="md-person" size="25" color="#dcdee2"/>
                        </a>
                        <DropdownMenu class="dropdown-menu" slot="list">
                            <DropdownItem>退出</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                </div>
            </Menu>
        </Header>
        <Layout :style="{minHeight: '100%'}">
            <Sider hide-trigger collapsible v-model="isCollapsed" :collapsed-width="78" :style="{background: '#fff'}">
                <Menu active-name="1" theme="light" width="auto" :class="menuitemClasses" @on-select="m=>{select(m)}" v-if="!isCollapsed">
                    <template v-for="pmenu in menuList">
                        <MenuGroup :title="pmenu.name" v-if="pmenu.children">
                            <MenuItem v-for="cmenu in pmenu.children" :name="cmenu.id" :key="cmenu.id">
                                <Icon :type="cmenu.icon"></Icon>
                                {{cmenu.name}}
                            </MenuItem>
                        </MenuGroup>
                        <MenuItem :name="pmenu.id" :key="pmenu.id" v-if="!pmenu.children">
                            <Icon :type="pmenu.icon"></Icon>
                            {{pmenu.name}}
                        </MenuItem>
                    </template>
                </Menu>
                <Menu active-name="1" theme="light" width="auto" :class="menuitemClasses" @on-select="m=>{select(m)}" v-if="isCollapsed">
                    <template v-for="pmenu in menuList">
                        <template v-for="cmenu in pmenu.children" v-if="pmenu.children">
                            <MenuItem :name="cmenu.id" :key="cmenu.id">
                                <Icon :type="cmenu.icon"></Icon>
                                {{cmenu.name}}
                            </MenuItem>
                        </template>
                        <MenuItem :name="pmenu.id" :key="pmenu.id" v-if="!pmenu.children">
                            <Icon :type="pmenu.icon"></Icon>
                            {{pmenu.name}}
                        </MenuItem>
                    </template>
                </Menu>
                <div class="baf"></div>
            </Sider>
            <Layout>
                <Content :style="{margin: '0px', background: '#fff', minHeight: '260px'}">
                    <router-view v-on:routerpush="routerpush" keep-alive></router-view>
                </Content>
            </Layout>
        </Layout>
    </Layout>
</template>
<script>
    export default {
        data () {
            return {
                isCollapsed: false, 
                menuSub: [],
                menuList: [
                    {
                        id: '1',
                        name: '密钥管理',
                        children: [
                            {
                                id: '2',
                                icon: 'md-add-circle',
                                name: '密钥申请',
                                url: '/apply'
                            },
                            {
                                id: '3',
                                icon: 'ios-paper',
                                name: '密钥列表',
                                url: '/regList'
                            }
                        ]
                    },
                    {
                        id: '4',
                        name: '设备管理',
                        children: [
                            {
                                id: '5',
                                icon: 'md-unlock',
                                name: '设备列表',
                                url: '/activeList'
                            }
                        ]
                    }
                ]
            };
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        mounted(){
            this.axios({
                method: 'get',
                url: '/check'
            }).then(response => {
                if(response.data.status == false){
                    this.$router.push("/login");
                }
            }).catch(error => {
                this.$router.push("/login");
            })
            

            //加载菜单
            for(var i in this.menuList){
                if(this.menuList[i].children == null){
                    var menutmp = this.menuList[i];
                    menutmp.level=0;
                    this.menuSub.push(menutmp);
                }else{
                    for(var j in this.menuList[i].children){
                        var menutmp = this.menuList[i].children[j];
                        menutmp.level=1;
                        this.menuSub.push(menutmp);
                    }
                }
            }
            
        },
        methods: {
            //点击菜单页面跳转
            select(e) {
                var filterMenus = this.menuSub.filter(function(menu){return (menu.id==e)});
                this.$router.push(filterMenus[0].url);
            },

            //回调方法页面跳转
            routerpush(e) {
                this.$router.push(e);
            },
            logout(e){
                console.log("logout");
                window.localStorage.setItem('currentUser_token', null)
                this.$router.push("/login");
            }
        }
    }
</script>
