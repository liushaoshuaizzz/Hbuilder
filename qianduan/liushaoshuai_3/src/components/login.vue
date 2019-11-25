<template>
	<div class="container" style="width: 100%;height: 600px;background-image: url(https://s17.mogucdn.com/p2/170105/upload_541i9di2b3icf9j13f24e0bg7b1i6_1920x600.png);margin-top: 7%;">
		<div style="height: 500px;width: 500px;float: right;margin-top: 40px;margin-right: 40px;border-radius: 5px">
			<div style="height: 500px;width: 500px;position: absolute;border-radius: 5px;background-color:white;opacity: 0.8;"></div>
			<div style="height: 500px;width: 500px;position: absolute;border-radius: 5px;" >
				<table class="table " id="table_2" style="margin-top: 20px;">
					<tr v-if="wrong1">
						<td colspan="3">{{username_hh}}</td>
					</tr>
					<tr v-if="wrong2">	
						<td colspan="3">{{check_password_word}}</td>
					</tr>
					<tr v-if="wrong3">
						<td colspan="3">{{check_kaptcha_word}}</td>
					</tr>
					<tr>	
						<td>用户名:</td>
						<td colspan="2"><input type="text" v-model="username" @keyup="checkusername()" /></td>			
					</tr>
					<tr>
						<td>密码:</td>
						<td><input type="password" v-model="password_1" /></td>										
					</tr>
					<tr>
						<td>确认密码:</td>
						<td colspan="2"><input type="password" v-model="password_2" @keyup="checkpassword" /></td>				
					</tr>
					<tr>
						<td>验证码:</td>
						<td><input type="text" v-model="kaptcha" @focusout="checkkaptcha()" /></td>									
					</tr>
					<tr>
						<td colspan="3" style="text-align: center;"><kaptcha></kaptcha></td>							
					</tr>
					<tr>
						<td colspan="3" style="text-align: center;">
							<button @click="register()" class="but">注册</button>
							<button class="but" style="margin-left: 20px;">重置</button>
						</td>	
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
				username:"",
				check_username:false,
				username_hh:"",
				password_1:"",
				password_2:"",
				check_password:false,
				check_password_word:"",
				kaptcha:"",
				check_kaptcha:false,
				check_kaptcha_word:"",
				wrong1:false,
				wrong2:false,
				wrong3:false
			}
		},
		methods:{
			checkusername(){
				var ob=this;
				var url="http://127.0.0.1:8080/firstweb/ajax/check";
				$.ajax(url,{
					xhrFields: {"withCredentials": true}, 
					data:{"value":ob.username}, 
					dataType:"json", 
					success: function(result) {
						ob.check_username=result;
						if(ob.check_username){
							ob.username_hh="用户名已存在";
							ob.wrong1=true;
						}else if(!ob.check_username){
							ob.wrong1=false;
						};
						if(ob.username==""){
							ob.username_hh="";
							ob.wrong1=false;
						}
					}
				});
			},
			checkpassword(){
				var ob=this;
				if(ob.password_1==ob.password_2){
					ob.check_password_word="";
				}else{
					ob.check_password_word="两次密码不一致";
					ob.wrong2=true;
				};
				if(ob.password_1==""&ob.password_2==""){
					ob.check_password_word="";
					ob.wrong2=false;
				}
			},
			checkkaptcha(){
				var ob=this;
				var url="http://127.0.0.1:8080/firstweb/ajax/kaptch";
				$.ajax(url,{
					xhrFields: {"withCredentials": true}, 
					data:{"jj":ob.kaptcha}, 
					dataType:"json", 
					success: function(result) {
						ob.check_kaptcha=result;
						if(ob.check_kaptcha){
							ob.check_kaptcha_word="";
							ob.wrong3=false;
						}else{
							ob.check_kaptcha_word="验证码输入错误";
							ob.wrong3=true;
						};
						if(kaptcha==""){
							ob.check_kaptcha_word="";
							ob.wrong3=false;
						}
						
					}
				});
			},
			 register(){
			 	var ob=this;
				var url="http://127.0.0.1:8080/firstweb/ajax/insertofuser";
				$.ajax(url,{
					xhrFields: {"withCredentials": true}, 
					data:{
						"logname":ob.username,
						"password":ob.password_1
					},
					dataType:"json", 
					success: function(result) {
						if(result){
							ob.$router.back(-1);
						}else{
							window.alert("注册失败，请重试");
						}
					}
				});
			 }
			
		},
		mounted(){
			var ob=this;
			
		}
	}
</script>

<style>
	.but{
		height: 40px;
		width: 30%;
		background-color: orangered;
		border: 0px solid white;
		color: white;
		font-size: 16px;
	}
	#table_2 tr td{
		padding: 18px;
		font-size: 20px;
	}
	#table_2 input{
		outline: none;
		border-radius: 5px;
		border: 1px solid orangered;
		background-color: transparent;
	}
</style>