<template>
	<div>
		<img src="http://127.0.0.1:8080/firstweb/vaildCode" @click="changekaptcha($event)" />
	</div>
</template>

<script>
	export default{
		methods:{
			changekaptcha(event){
				event.target.src="http://127.0.0.1:8080/firstweb/vaildCode";
			}
		}
	}
</script>

<style>
</style>