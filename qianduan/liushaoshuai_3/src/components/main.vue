<template>
	<div class="container" style="width: 100%;">
		<top></top><hr />
		<search></search>
		<changeimg></changeimg>
		<imagesinfo></imagesinfo>
		<a id="return_top" @click="returntop1()">返回顶部</a>
	</div>
</template>

<script>
	import imagesinfo from '@/components/imagesinfo';
	import top from '@/components/top';
	import search from '@/components/search';
	import changeimg from '@/components/changeimg';
	export default{
		components:{
			"imagesinfo":imagesinfo,
			"top":top,
			"search":search,
			"changeimg":changeimg
		},
		methods:{
			returntop1(){
				$(window).scrollTop(0);
			},
		}
		
	}
	
</script>

<style>
	#return_top{
		background-color: plum;
		line-height: 60px;
		color: white;
		display: inline-block;
		height: 60px;
		width: 60px;
		border-radius: 50%;
		text-align: center;
		position: fixed;
		top: 90%;
		right: 5%;
	}
	#return_top:hover{
		cursor: pointer;
		text-decoration: none;
	}
</style>