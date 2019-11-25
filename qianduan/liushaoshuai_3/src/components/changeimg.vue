<template>
	<div id="changeimg"  class="container" >
		<div id="images1" :style="imagee" @mouseover="stopaa()" @mouseout="aa()">
			<button class="btn" @click="previmg()">＜</button><button class="btn" @click="nextimg()" style="left: 940px;">＞</button>
		</div>
		<div id="images2">
			<img src="../../static/191024_0b5dj55cbf49ag4flkeiabd08.png" />
			<img src="../../static/191024_2fed89f3jb5f3ech63e41d79d.png" />
			<img src="../../static/191024_2k166faf6064843aelbdg51k8.png" />
			<img src="../../static/191024_4bgf318j067h8ghe0l3ldi83e.png" />
			<img src="../../static/191024_7beke7i4c7cfh1h8cb7c5i9ak.png" style="margin-bottom:0px ;"/>
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
					"background-image:url(../../static/FSH-1572278007297-20chomecollect.jpg)",
					"background-image:url(../../static/timg[222].jpg)",
					"background-image:url(../../static/FSH-1573036648554-075i01.jpg)"
				],
				imagee:"background-image:url(../../static/FSH-1572278007297-20chomecollect.jpg)",
				num:0
			}
		},		
		methods:{
			
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
			aa(){
				var ob=this;
				ob.timer=window.setTimeout(function(){
				if(ob.num>1){
					ob.num=0;
				}else{
					ob.num+=1;
				};
				ob.imagee=ob.images[ob.num];
				ob.aa();
			},3000)
			},
			stopaa(){
				var ob=this;
				window.clearTimeout(ob.timer);
			},
			nextimg(){
				var ob=this;
				if(ob.num>1){
					ob.num=0;
				}else{
					ob.num+=1;
				};
				ob.imagee=ob.images[ob.num];
			},
			previmg(){
				var ob=this;
				if(ob.num<=0){
					ob.num=ob.images.length-1;
				}else{
					ob.num-=1;
				};
				ob.imagee=ob.images[ob.num];
			}
		},
		mounted(){
			var ob=this;
			ob.aa();	
		}
	}
</script>

<style>
	#changeimg{
		width: 1438px;
		min-height:100px ;
		position: relative;
		margin-top: 30px;
		overflow: hidden;
	}
	#images1 .btn{
		position: absolute;
		top:280px;
		outline: none;
		border: 0px solid white;
		background-color: transparent;
		border-radius: 50%;
		box-shadow: 0px 0px 16px white;
		font-size: 42px;
		line-height: 50px;
	}
	#images1{
		height: 590px;
		width:70%;
		background-size: 100%;
		background-color: pink;
		transition: all 1s;
		z-index: 1;
		float: left;
		
	}
	#images2{
		width: 30%;
	
		float: left;
		text-align: center;
	}
	#images2 img{
		width: 300px;
		height: 110px;
		margin-bottom:10px ;
	}
	#images2 img:hover{
		cursor: pointer;
	}
</style>