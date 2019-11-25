<template>
	<div class="container" style="width: 100%;">
		<top></top>
		<search></search>
		<div class="container" style="width:100%;height: 700px;background-image: url(../../static/gouwuche.jpg);background-size: 100% 100%;">
			<div style="width: 100%;height: 100%;background-color: white;opacity: 0.7;position: absolute;"></div>
			<div class="container" id="cart" style="position: absolute;z-index: 5;left: 170px;">
				<table class="table text-center" id="cart_table" >
					<thead><tr style="height: 100px;"><td colspan="8" style="line-height: 100px;">总价{{num}}元&nbsp;<a @click="goorder()">提交</a></td></tr></thead>
					<tr>
						<td>序号</td>
						<td>商品名</td>
						<td>商品图片</td>
						<td>商品规格</td>
						<td>商品单价</td>
						<td>购买数量</td>
						<td>该商品总价</td>
						<td>不买它了</td>
						<td>购买</td>
					</tr>
					<tr v-for="(a,i) in list">
						<td>{{i+1}}</td>
						<td>{{a.gdname}}</td>
						<td><div :style="gdimg[i]" style="height: 100px; width: 50%;background-size: 100%;margin-left: 25%;"></div></td>
						<td>{{a.gstext}}</td>
						<td>￥{{a.price}}元</td>
						<td>
							<button @click="countdown(a.ctid,a.gdcount,i)">-</button>
							{{a.gdcount}}
							<button @click="countup(a.ctid,a.gdcount+1,i)">+</button>
						</td>
						<td>￥{{a.price*a.gdcount}}元</td>
						<td><button class="btn btn-primary" style="text-align: center;" @click="deletecart(a.ctid,i)">delete</button></td>
						<td><input type="checkbox" :value="i"  v-model="topay"/></td>
					</tr>
				</table>
			</div>
		</div>
	</div>
</template>

<script>
	import top from '@/components/top'
	import search from '@/components/search'
	export default{
		components:{
			"top":top,
			"search":search
		},
		data(){
			return{
				list:[],
				gdimg:[],
				num:0,
				topay:[],
				ctids:[]
			}
		},
		watch:{
			topay(){
				var ob=this;
				ob.donum();
				ob.ctids=[];
				for(var i in ob.topay){
					var index=ob.topay[i];
					console.log(ob.list[index].ctid);
					ob.ctids.push(ob.list[index].ctid);

				}
			}
		},
		methods:{
			goorder(){
				this.$router.push({
					name:"order",query:{"ctid":this.ctids}
				})
			}
			,
			donum(){
				var ob=this;
				ob.num=0;
				for(var i in ob.topay){
					var ct=ob.list[ob.topay[i]];
					ob.num+=ct.gdcount*ct.price;
				}
			},
			deletecart(ctid,i){
				var ob=this;
				var url="http://127.0.0.1:8080/firstweb/ajax/deletecart";
				$.ajax(url,{
					xhrFields: {"withCredentials": true},
					async:false,
					data:{
						"ctid":ctid,
					},
					dataType:"json",
					success: function(result) {
						ob.list.splice(i,1);
						ob.topay.splice(i,1);
					}
				});
				ob.donum();
			},
			countup(ctid,count,i){
				var ob=this;
				var url="http://127.0.0.1:8080/firstweb/ajax/changecartcount";
				$.ajax(url,{
					xhrFields: {"withCredentials": true},
					async:false,
					data:{
						"ctid":ctid,
						"gdcount":count
					},
					dataType:"json",
					success: function(result) {
						if(result){
							ob.list[i].gdcount+=1;
						}
					}
				});
				ob.donum();
			},
			countdown(ctid,count,i){
				var ob=this;
				if(count>1){
					count-=1;
				}else{
					count=1;
				}
				var url="http://127.0.0.1:8080/firstweb/ajax/changecartcount";
				$.ajax(url,{
					xhrFields: {"withCredentials": true},
					async:false,
					data:{
						"ctid":ctid,
						"gdcount":count
					},
					dataType:"json",
					success: function(result) {
						if(result){
							if(ob.list[i].gdcount>1){
								ob.list[i].gdcount-=1;
							}

						}
					}
				});
				ob.donum();
			},
		},
		mounted(){
			var ob=this;
			var url="http://127.0.0.1:8080/firstweb/ajax/getcart";
			$.ajax(url,{
				xhrFields: {"withCredentials": true},
				dataType:"json",
				success: function(result) {
					ob.list=result;
					for(var j in result){
						ob.gdimg.push({"background-image":"url(http://127.0.0.1:8080/firstweb/tp/"+result[j].gimgurl+")"});
					}
				}
			});
		}
	}
</script>

<style>
	#cart{
		width: 80%;
		height: 100%;
	}
	#cart_table tr td{
		padding: 5px;
		font-size: 22px;
	}
</style>
