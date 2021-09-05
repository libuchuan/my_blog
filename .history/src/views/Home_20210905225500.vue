<template>
    <div id="app" class="home">
         <!-- banner -->
        <div class="home-banner">
        <div class="banner-container">
            <h1 class="blog-title animated zoomIn">
            首页
            </h1>
            <!-- 联系方式 -->
            <div class="blog-contact animated zoomIn">
            <a class="github circular icon button" data-content="libuchuan"  data-position="bottom center" style="margin-right: 50px">
            <i class="github icon"></i></a>
            <a class="wechat circular icon button" style="margin-right: 50px">
                <i class="weixin icon"></i></a>
            <a class="qq circular icon button" data-content="1069406508"  data-position="bottom center"><i class="qq icon"></i></a>
            </div>
            <div class="ui wechat-qr flowing popup transition hidden">
            <img src="" alt="" class="ui rounded image" style="width: 110px">
            </div>
            <!-- 向下滚动 -->
            <div class="scroll-down" @click="scrollDown">
            <h4>向下滚动<i class="el-icon-arrow-down"></i></h4>
            </div>
        </div>
        <!--中间内容,如果太窄了可放到container    <div  class="m-container m-padded-tb-big">-->
        </div>
        <div  class="m-home">
        <div class="ui container">
            <div class="ui stackable grid">
            <!--左边博客列表-->
            <div class="eleven wide column">
                <!--header-->
                <div class="ui top attached segment">
                <div class="ui middle aligned two column grid my-shadow">
                    <div class="column">
                    <h3 class="ui my-blue header" >博客</h3>
                    </div>
                    <div class="right aligned column"><h4 class="ui header m-inline-block m-text" v-if="pagination.queryString!=='' && pagination.queryString!==null" style="height: 1px !important;">根据"{{pagination.queryString}}"的搜索结果</h4>
                    共 <h2 class="ui orange header m-inline-block m-text-thin">{{pagination.total}}</h2> 篇
                    </div>
                </div>
                </div>

                <!--content-->
                <div class="ui attached  segment my-blog-shadow">

                <div class="ui padded vertical segment m-padded-tb-large"  v-for="item in dataList"  :key="item.blogId">
                    <div class="ui middle aligned mobile reversed stackable grid">
                    <div class="eleven wide column" style="cursor:pointer;">
                        <h3 class="ui header" @click="toBlog(item.blogId)">{{item.title}}</h3>
                        <p class="m-text" @click="toBlog(item.blogId)">{{item.description}}</p>
                        <div class="ui grid">
                        <div class="eleven wide column">
                            <div class="ui mini horizontal link list">
                            <div class="item">
                                <img v-bind:src=item.avatar class="ui avatar image">
                                <div class="content"><a class="header">{{item.nickname}}</a></div>
                            </div>
                            <div class="item">
                                <i class="calendar icon"></i> {{item.createTime}}
                            </div>
                            <div class="item">
                                <i class="eye icon"></i> {{item.views}}
                            </div>
                            <div class="item">
                                <i class="thumbs up outline icon"></i> {{item.thumbs}}
                            </div>
                            </div>
                        </div>
                        <div class="right aligned five wide column">
                            <a target="_blank" class="ui my-blue basic label m-padded-tiny m-text-thin">{{item.typeName}}</a>
                        </div>
                        </div>
                    </div>
                    <div class="five wide column">
                        <a target="_blank">
                        <img v-bind:src=item.firstPicture @click="toBlog(item.blogId)" alt="" class="ui rounded image">
                        </a>
                    </div>

                    </div>
                </div>
                </div>

                <!--footer-->
                <div class="ui bottom attached segment my-blog-shadow">
                <div class="pagination-container">
                    <el-pagination
                    class="pagiantion"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pagination.currentPage"
                    :page-sizes="[2,6,10,15]"
                    :page-size="pagination.pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pagination.total">
                    </el-pagination>
                </div>
                </div>

            </div>

            <!--右边的top-->
            <div class="five wide column" style="left: 34px !important;">

                <!--分类-->
                <div class="ui segments my-shadow">
                <div class="ui secondary segment">
                    <div class="ui two column grid">
                    <div class="column">
                        <i class="idea icon"></i>分类
                    </div>
                    <div class="right aligned column">
                        <a href="/#/types" target="_blank">more <i class="angle double right icon"></i></a>
                    </div>
                    </div>
                </div>
                <div class="ui my-blue segment">
                    <div class="ui fluid vertical menu">
                    <template v-for="(item, index) in typeList">
                        <a class="item" v-if='index<6' :key="item.typeId" @click="toType(item.typeId)">
                        {{ item.typeName }}
                        <div class="ui blue basic left pointing label">{{item.typeCount}}</div>
                        </a>
                    </template>
                    </div>
                </div>
                </div>

                <!--标签-->
                <div class="ui segments m-margin-top-large my-shadow">
                <div class="ui secondary segment">
                    <div class="ui two column grid">
                    <div class="column">
                        <i class="tags icon"></i>标签
                    </div>
                    <div class="right aligned column">
                        <a href="/#/tags" target="_blank">more <i class="angle double right icon"></i></a>
                    </div>
                    </div>
                </div>
                <div class="ui my-blue segment">
                    <template v-for="(item, index) in tagList">
                    <a target="_blank" class="ui my-blue basic left pointing label m-margin-tb-tiny" v-if='index<15' :key="item.tagId" @click="toTag(item.tagId)">
                        {{item.tagName}} <div class="detail">{{item.tagCount}}</div>
                    </a>
                    </template>
                </div>
                </div>

                <!--最新推荐-->
                <div class="ui segments m-margin-top-large my-shadow">
                <div class="ui secondary segment ">
                    <i class="bookmark icon"></i>最新推荐
                </div>
                <div class="ui segment" v-for="item in latestList" :key="item.blogId">
                    <a  target="_blank" class="m-black m-text-thin" style="cursor:pointer;" v-text="item.title" @click="toBlog(item.blogId)"></a>
                </div>
                </div>

                <!--二维码-->
                <!-- <h4 class="ui horizontal divider header m-margin-top-large">扫码关注我</h4>
                <div class="ui centered card my-shadow" style="width: 11em">
                <img src="" alt="" class="ui rounded image" > -->
                <!-- </div> -->
            </div>

            </div>
        </div>
        </div>
        <br>
        <br>
        <Footer></Footer>
    <!--    &lt;!&ndash; 主体组件 &ndash;&gt;-->
    <!--    <index style="width: 100%"></index>-->
    </div>
</template>
<script>
import { Notification} from 'element-ui'
import Footer from '../components/layout/Footer.vue'
export default {
   components:{
       Footer
   },
   data(){
       return {
            dataList: [], // 当前页要展示的博客分页列表数据
            typeList: [], // 分类列表的数据
            tagList: [], // 标签列表的数据
            latestList: [], // 最新发布的博客列表的数据
            pagination: { // 分页相关模型数据
                currentPage: 1, // 当前页码
                pageSize: 6, // 每页显示的记录数
                total: 0, // 总记录数
                queryString: null // 查询条件
            },
            user: {},
            nickname: '',
            // 被激活的链接地址
            avatar: '',
            tip: false,
            obj: {
                isEnd: false,
                speed: 300,
                singleBack: false,
                sleep: 0,
                type: 'rollback',
                backSpeed: 40,
                sentencePause: true
            },
            articleList: [],
            blogInfo: {},
            current: 1
     }
   },
    created () {
        this.message()
        this.getUser()
        this.findPage()
        this.getTypeList()
        this.getTagList()
        this.getLatestList()
        this.reload()
   },
   methos:{
       reload(){
           window.sessionStorage.setItem('reloadAdmin','true')
           
       }
   }


}
</script>