<template>
	<div id="top1" class="container">	
		<div><a>关于我们</a></div>
		<div class="div_top"><a>我的订单</a></div>
		<div class="div_top"><i class="glyphicon glyphicon-shopping-cart"></i><a>商城</a></div>
		<div @click="gotomain()" id="login_1"><i class="glyphicon glyphicon-home"></i><a>首页</a> </div>
		<div @click="login()" id="login_1" v-if="user_1.length==0"><i class="glyphicon glyphicon-pencil"></i><a>注册</a> </div>
		<div v-if="user_1.length!=0" @click="removesession()"><a id="jjss">注销</a></div>
		<div v-if="user_1.length!=0"><i class="glyphicon glyphicon-user"></i><a>{{user_1.logname}}</a></div>		
		<br />
	</div>
</template>

<script>
	export default{
		data(){
			return{
				user_1:[]
			}
		},
		methods:{
			gotomain(){
				this.$router.push({
					name:"main"
				})
			},
			login(){
				this.$router.push({
					name:'login'
				})
			},
			session(){
				var ob=this;
				var url="http://127.0.0.1:8080/firstweb/ajax/getsession";
				$.ajax(url,{
					xhrFields: {"withCredentials": true}, 
					data:{"keywords":ob.keywords}, 
					dataType:"json", 
					success: function(result) {						
						ob.user_1=result;	
					}
				});
			},
			removesession(){
				var ob=this;
				var url="http://127.0.0.1:8080/firstweb/ajax/removesession";
				$.ajax(url,{
					xhrFields: {"withCredentials": true}, 
					data:{"keywords":ob.keywords}, 
					dataType:"json", 
					success: function(result) {						
						 
					}
				});
				ob.$router.go(0);
			}
		},
		mounted(){
			var ob=this;
			ob.session();
		}
	}
</script>

<style>
	#jjss{
		text-decoration: none;
		cursor: pointer;
	}
	#login_1:hover{
		cursor: pointer;
	}
	#top1{
		height: 40px;
		width: 100%;
		background-color: black;
	}
	#top1 a{
		color: white;
	}
	#top1 a:hover{
		text-decoration: none;
	}
	#top1 i{
		color: lightpink;
	}
	#top1 div{
		float: right;
		margin-right:30px ;
		margin-top: 10px;
	}
</style>