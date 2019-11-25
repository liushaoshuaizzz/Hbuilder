<template>	
	<div class="container goodsinfo">
		<top></top>
		<hr />
		<search></search>
		<div id="detail">
			<div id="left_1">
				<img :src="img" style="height: 100%;width: 100%;"/>
			</div>
			<div id="left_2">
				<div id="left_2_1">
					<span style="font-weight: 900;font-size: 30px;display: inline;color: black;">{{name}}</span>
				</div>
				<div id="left_2_2" style="background-color: #EEEEEE;margin: 20px 0px;min-height: 60px;line-height: 60px;width: 600px;">
					<div style="float: left;margin-top: 10px;color:#ADADAD ;">价格：</div><span style="font-weight: 700;font-size: 35px;display: inline-block;color: red;margin-top: 30px;margin-left: 40px;">¥{{price}}</span>
				</div>
				<div id="left_2_3" style="margin: 20px 0px;">
					<span>客服：</span>&nbsp;
					<button style="background-color: white;border: 1px solid #EEEEEE;height: 40px;width: 100px;outline: none;">
						<i class="glyphicon glyphicon-user"></i>联层系客服
					</button>
				</div>
				<div id="left_2_4" style="margin: 20px 0px;width: 800px;">
					<span>尺码:</span>
					<button class="sss" v-for="(hh,i) in size" @click="setgsid(i)" :class="{'iii':(gsid-1)==i}">{{hh}}</button>
				</div>
				<div id="left_2_5" style="margin: 20px 0px;min-height: 50px;">
					<div style="float: left;">
						<span>数量:</span>
					</div>						
					<div style="float: left;width: 110px;margin-left: 10px;margin-top: -5px">
						<button style="width: 30px;height: 30px;margin-right: -5px;background-color: white;border: 1px solid #EEEEEE ;outline: none;" @click="decrease()">-</button>
						<input v-model="gdcount" style="width: 50px;height: 30px;border: 1px solid #EEEEEE;text-align: center;outline: none;"></input>
						<button style="width: 30px;height: 30px;margin-left: -5px;background-color: white;border: 1px solid #EEEEEE ;outline: none;" @click="increase()">+</button>
					</div>
				</div>
				<div id="left_2_6">
					<button class="left_2_6_1" style="background-color:#ef2f23;color: white;">立刻购买</button><button class="left_2_6_1" @click="insertcart()">加入购物车</button>
				</div>
				<div id="left_2_7" style="margin: 40px 0px;">
					<span>服务说明：</span>
					<p style="display:inline;">
						<img src="../../static/180417_25kbfg1c3hdbd120394ji4b11.png" style="height:30px ;"/>72小时发货&nbsp;
						<img src="../../static/180417_25kbfg1c3hdbd120394ji4b11.png" style="height:30px ;"/>7天无理由退款 &nbsp; 
						<img src="../../static/180417_25kbfg1c3hdbd120394ji4b11.png" style="height:30px ;"/>延误必配&nbsp;
						<img src="../../static/180417_25kbfg1c3hdbd120394ji4b11.png" style="height:30px ;"/>退货补运费&nbsp;
					</p>
				</div>
				<div id="left_2_8" style="margin: 30px 0px;">
					<span>支付方式：</span><p style="display: inline"><img src="../../static/pay.png"/>&nbsp;&nbsp;&nbsp;<img src="../../static/wechat.png"/></p>
				</div>
			</div>
			
		</div>	
	</div>
</template>

<script>
	import top from '@/components/top';
	import search from '@/components/search';
	export default{
		components:{
			"top":top,
			"search":search,
		},
		data(){
			return{
				gdid:0,
				img:"",
				name:"",
				price:0,
				size:[],
				gdcount:1,
				gsid:1,
				session:false
			}
		},
		methods:{
			increase(){
				var ob=this;
				ob.gdcount+=1;
			},
			decrease(){
				var ob=this;
				if(ob.gdcount>1){
					ob.gdcount-=1;
				}else{
					return;
				}				
			},
			getimage(){
				var ob=this;
				var url="http://127.0.0.1:8080/firstweb/ajax/getgoodsinfobygdid";
				$.ajax(url,{
					xhrFields: {"withCredentials": true}, 
					data:{"gdid":ob.gdid}, 
					dataType:"json", 
					success: function(result) {
						ob.img="http://127.0.0.1:8080/firstweb/tp/"+result.gimgurl;
						ob.name=result.gdname;	
						ob.price=result.price;
					}
				});
			},
			getsession(){
				var ob=this;
				var url="http://127.0.0.1:8080/firstweb/ajax/getsession";
				$.ajax(url,{
					xhrFields: {"withCredentials": true}, 
					data:{"keywords":ob.keywords}, 
					dataType:"json", 
					success: function(result) {						
						ob.session=(result!="");	
					}
				});
			},
			insertcart(){
				var ob=this;
				if(!ob.session){
					if(window.confirm("您尚未登录，是否转入登录界面？")){
						ob.$router.push({name:"login_1"});
					}else{
						return;
					}
				}else{
					if(window.confirm("是否加入购物车？")){
						var url="http://127.0.0.1:8080/firstweb/ajax/insertcart";
						$.ajax(url,{
							xhrFields: {"withCredentials": true}, 
							data:{
								"gdid":ob.gdid,
								"gdcount":ob.gdcount,
								"gsid":ob.gsid
							},
							dataType:"json", 
							success: function(result) {
								alert("加入购物车成功!");
							}
						});
					}
				}	
			},
			setgsid(i){
				var ob=this;
				ob.gsid=i+1;
			}
		},
		mounted(){
			var ob=this;
			ob.getsession();
			ob.gdid=ob.$route.query.gdid;			
			var url="http://127.0.0.1:8080/firstweb/ajax/getgoodssizeforajax";
			$.ajax(url,{
				xhrFields: {"withCredentials": true}, 
				dataType:"json", 
				async:false,
				success: function(result) {
					for(var j in result){
						ob.size[j]=result[j].gstext;								
					}
				}
			});	
			ob.getimage();
		}
	}
</script>

<style>
.left_2_6_1{
	height: 50px;
	width: 200px;
	background-color: white;
	border: 1px solid #EEEEEE;
	font:20px Microsoft YaHei ;
	margin-left: 80px;
	outline: none;
}
.goodsinfo{
	width: 100%;
	padding: 0px;
}
#detail{
	margin: 0 auto;
	width: 1400px;
	min-height: 100px;
	/*background-color: #42B983;*/
	padding-top:30px ;
	overflow: hidden;
}
#left_1{
	width: 30%;
	height: 600px;
	float: left;
}
#left_2{
	width: 65%;
	height: 600px;
	float: right;
}
#left_2 span{
	display: inline-block;
	width: 70px;
	line-height: 16px;
	color: #ADADAD;
	
}
.sss:hover{
	box-shadow: 0px 0px 0px 2px black inset ;
}
.sss{
	box-shadow: 0px 0px 0px 1px #EEEEEE;
	background-color: white;
	border: 1px solid white;
	margin-left:20px;
	font-size: 16px;
	margin-bottom: 15px;
	outline: none;
}
.iii{
	background-color: red;
	border: 1px solid red;
	box-shadow: 0px 0px 0px;
}
.iii:hover{
	box-shadow: 0px 0px 0px;
}
</style>