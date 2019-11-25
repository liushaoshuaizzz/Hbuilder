<template>
	<div class="container" style="width: 100%;">
		<top></top>
		<search></search>
		<div style="background-image: url(../../static/IMG20190905_171924.jpg); width: 100%;height: 600px;background-size: 100%;">
			<div class="container" style="width:600px;height: 500px;background-color: white;position: absolute;right: 100px;border-radius:10px ;top: 220px;opacity: 0.5;"></div>
			<div class="container" style="width:600px;height: 500px;position: absolute;right: 100px;border-radius:10px ;top: 220px;border: 10px solid white;">
				<table class="table text-center" id="table_3" >
					<thead>
						<tr>
							<td colspan="2" style="font-size: 40px;">订单详情</td>
						</tr>
					</thead>
					<tr>
						<td>地址</td>
						<td><input type="text" v-model="address" class="text-center"></td>
					</tr>
					<tr>
						<td>收件人姓名</td>
						<td><input type="text" v-model="recipient" class="text-center"></td>
					</tr>
					<tr>
						<td>收件人电话号码</td>
						<td><input type="text" v-model="contactnumber" class="text-center"></td>
					</tr>
					<tr><td colspan="2"><button class="btn btn-primary" @click="insertorder()" style="font-size: 25px;width: 60%;height: 60px;background-color: orangered;border: 0px;">提交</button></td></tr>
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
				ctid:[],
				address:"",
				recipient:"",
				contactnumber:""
			}
		},
		methods:{
			insertorder(){
				var ob=this;
				var url="http://127.0.0.1:8080/firstweb/ajax/insertorder";
				$.ajax(url,{
					xhrFields: {"withCredentials": true}, 
					traditional:true,//防止深度序列化
					data:{
						"address":ob.address,
						"recipient":ob.recipient,
						"contactnumber":ob.contactnumber,
						"ctid":ob.ctid
					},
					dataType:"json", 
					success: function(result) {
						ob.$router.push({
							name:"main"
						})
					}
				});					
			}
		},
		mounted(){
			var ob=this;
			ob.ctid=ob.$route.query.ctid;
			console.log(ob.ctid)
		}
	}
</script>

<style>
	#table_3 tr td{
		font-size: 22px;
		padding: 20px;
	}
	#table_3{
		margin-top: 5%;
		border-radius: 10px;
	}
	#table_3 input{
		border-radius: 10px;
		border: 1px solid orangered;
		outline: none;
		background-color: transparent;
	}
</style>