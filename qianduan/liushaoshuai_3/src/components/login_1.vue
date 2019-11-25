<template>
	<div class="container" style="width: 100%;height: 600px;background-image: url(https://s17.mogucdn.com/p2/170105/upload_541i9di2b3icf9j13f24e0bg7b1i6_1920x600.png);margin-top: 7%;">
		<div style="height: 500px;width: 500px;float: right;margin-top: 40px;margin-right: 40px;border-radius: 5px">
			<div style="height: 500px;width: 500px;position: absolute;border-radius: 5px;background-color:white;opacity: 0.8;"></div>
			<div style="height: 500px;width: 500px;position: absolute;border-radius: 5px;" >
				<table class="table " id="table_1" style="margin-top: 40px;">
					<tr>	
						<td>用户名</td>
						<td v-if="status==1">{{result_2}}</td>
					</tr>
					<tr>
						<td style="text-align: center;" colspan="2">
							<input type="text" v-model="logname" />
						</td>	
					</tr>
					<tr>	
						<td>密码</td>
						<td v-if="status==2">{{result_2}}</td>
					</tr>
					<tr>
						<td style="text-align: center;" colspan="2">
							<input type="password" v-model="password_1"/>
						</td>	
					</tr>
					<tr>
						<td>验证码</td>
						<td v-if="!kaptcha_check">验证码错误</td>
					</tr>
					<tr>
						<td style="text-align: center;"><input type="text" v-model="kaptcha" style="margin-left: 27px;width: 150px;" /></td>		
						<td style="text-align: left;margin-right: 40px;"><kaptcha></kaptcha></td>
					</tr>
					<tr>
						<td style="text-align: center;" colspan="2"><button @click="login_jj()" id="btn123">登录</button><span v-if="status==3">{{result_2}}</span></td>			
					</tr>
				</table>
			</div>
		</div>	
	</div>	
</template>

<script>
	import kaptcha from '@/components/kaptcha';
	export default{
		components:{
			"kaptcha":kaptcha
		},
		data(){
			return{
				logname:"",
				password_1:"",
				kaptcha:"",
				kaptcha_check:true,
				result_1:[
					"",
					"查询不到此用户",
					"用户名或密码错误",
					"此用户已被封禁"
				],
				result_2:"",
				status:-1,
				jjj:false
			}
		},
		methods:{
			login_jj(){
				var ob=this;
				ob.checkkaptcha();
				if(ob.jjj==false){
					ob.kaptcha_check=false;
					return;
				}else{
					ob.kaptcha_check=true;
				};
				var url="http://127.0.0.1:8080/firstweb/ajax/login";
				$.ajax(url,{
					xhrFields: {"withCredentials": true}, 
					data:{
						"logname":ob.logname,
						"password":ob.password_1
					},
					dataType:"json", 
					success: function(result) {
						ob.status=result;
						ob.result_2=ob.result_1[result];
						if(result==0){
							ob.$router.back(-1);
						}
					}
				});
				
			},
			checkkaptcha(){
				var ob=this;
				var url="http://127.0.0.1:8080/firstweb/ajax/kaptch";
				$.ajax(url,{
					xhrFields: {"withCredentials": true}, 
					async:false,
					data:{"jj":ob.kaptcha}, 
					dataType:"json", 
					success: function(result) {
						ob.jjj=result;				
					}
				});
			},
			
		},
		mounted(){
			var ob=this;
			
		}
	}
</script>

<style>
	#btn123{
		height: 40px;
		width: 50%;
		background-color: orangered;
		border: 0px solid white;
		color: white;
		font-size: 16px;
	}
	#table_1 tr td{
		padding: 10px;
		font-size: 20px;
	}
	#table_1 input{
		outline: none;
		border-radius: 5px;
		border: 1px solid orangered;
		height: 40px;
		width: 70%;
		font-size: 18px;
		background-color:transparent;
		color: #000000;
		
		
	}
</style>