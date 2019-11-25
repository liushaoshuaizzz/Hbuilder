<template>
	<div :style="remove1" id="search1" style="width: 1600px;z-index: 10;background-color: white;" class="container" >	
		<div style="float: left;width: 20%;text-align: center;" >
			<img src="../../static/190102_088f4i166l4gkl08k297h5kk8.png" style="height: 130px;width: 190px;"/>
		</div>	
		<div class="div_1 text-center">
			<div style="width: 700px;">
				<input type="text" v-model="keywords" @input="getgoodsinfo()" @keyup="showdiv_2()" @keyup.down="down1()" @keyup.up="up1()"/>
				<button class="btn" style="border-top-left-radius:0px ;border-bottom-left-radius:0px;outline: none ;background-color: lightpink;"><i class="glyphicon glyphicon-search" style="font-size: 22px;color: white;"></i></button>
			</div>
			
			<div class="div_2" v-if="show1==true">
				<div v-for="(gdname,i) in list" class="div_div" :class="{'bg-warning':index_1==i}" >
					<span>{{gdname}}</span>
				</div>
			</div>
		</div>
		<div class="div_3" >
			<div>
				<i class="glyphicon glyphicon-comment"></i><br />
				<span>消息</span>
			</div>
			<div>
				<i class="glyphicon glyphicon-star"></i><br />
				<span>收藏</span>
			</div>
			<div @click="gotocart()" class="login_1">
				<i class="glyphicon glyphicon-shopping-cart"></i><br />
				<span>购物车</span>
			</div>
			<div>
				<i class="glyphicon glyphicon-qrcode"></i><br />
				<span>下载</span>
			</div>
			<div  @click="login_1()" class="login_1" v-if="user_1.length==0" >
				<i class="glyphicon glyphicon-user"></i><br />
				<span>登录</span>
			</div>
			<div  @click="gotoorderinfo()" class="login_1" v-if="user_1.length!=0" >
				<i class="glyphicon glyphicon-th-list"></i><br />
				<span>订单</span>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data:function(){
			return{
				keywords:"",
				list:[],
				show1:false,
				index_1:-1,
				images:[
					"background-image:url(../../static/0b7a0e038d0e4133fc22a28a7d06_640_832.cg.jpg)",
					"background-image:url(../../static/0ed17bd8e90023fdb29a836a7e8b_640_919.cj.jpg)",
					"background-image:url(../../static/2c739855b49ef68b8ded88aef13c_640_832.cj.jpg)"
				],
				imagee:"background-image:url(../../static/0b7a0e038d0e4133fc22a28a7d06_640_832.cg.jpg)",
				num:0,
				remove1:[],
				user_1:[]
			}
		},		
		methods:{
			gotocart(){
				if(this.user_1.length!=0){
					this.$router.push({name:"cart"});
				}else{
					if(window.confirm("是否跳转至登陆页面？")){
						this.$router.push({name:"login_1"});
					}
				}
				
			},
			
			down1(){
				var ob=this;			
				if(ob.index_1<ob.list.length-1){
					ob.index_1+=1;
				}else{
					ob.index_1=0;
				};
				ob.keywords=ob.list[ob.index_1];
				
			},
			
			up1(){
				var ob=this;
				if(ob.index_1>0){
					ob.index_1-=1;
				}else{
					ob.index_1=ob.list.length-1;					
				}
				ob.keywords=ob.list[ob.index_1];
			},
			
			showdiv_2(){
				var ob=this;			
				if(ob.keywords==""){
					ob.show1=false;	
				}else{
					ob.show1=true;
				}
			},
			gotoorderinfo(){
				var ob=this;
				ob.$router.push({
					name:"orderlist"
				})
			},
			getgoodsinfo(){
				var ob=this;							
				var url="http://127.0.0.1:8080/firstweb/ajax/getgoodsinfogdname";
				$.ajax(url,{
					xhrFields: {"withCredentials": true}, 
					data:{"keywords":ob.keywords}, 
					dataType:"json", 
					success: function(result) {
						for(var a in result){
							ob.list[a]=result[a].gdname;
						}
						
					}
				})
			},
			login_1(){
				this.$router.push({
					name:'login_1'
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
			}
		},
		mounted(){
			var ob=this;
			ob.remove1=[{position:"relative"}];
			
			$(window).scroll(function(){
				if($(document).scrollTop()>=300){
//					if($("#search1").Style(['position'])=='fixed'){
//						return;
//					}
					ob.remove1=[{position:"fixed","box-shadow":"0px 0px 16px black","margin-top":"-83px","width":"100%"}];
				}else{
					ob.remove1=[{position:"relative"}];
				}
			});
			ob.session();
			
		}
	}
</script>

<style>
	.login_1:hover{
		cursor: pointer;
	}
	.div_3 div{
		float: left;
		font-size: 20px;
		margin-top: 25px;
		margin-right: 30px;
	}
	.div_3{
		margin-top: 15px;
		margin-left: 10px;
		width: 28%;
		height: 100%;
		text-align: center;
		float: left;
	}
	.div_top{
		border-left:2px ;
		border-right:2px ;
	}
	.div_div{
		font-size: 22px;
		line-height: 50px;
		
	}
	
	.div_1{
		/*width: 700px;*/
		width: 50%;
		margin-top: 32px;
		float: left;
		text-align: center;
	}

	#search1 .btn{
		height: 60px;
		width: 60px;
		float: right;
	}
	.div_1 div input{
		width:640px ;
		height: 60px;
		outline: none;
		border: none;
		background-color: hotpink;
		font-size: 22px;
		color: white;
		padding: 20px;
	}
	.div_2{
		min-height: 300px;
		width:700px;
		border-bottom: 1px solid black;	
		border-left: 1px solid black;	
		border-right: 1px solid black;	
		z-index: 6;
		background-color: white;
		position: absolute;
	}
</style>