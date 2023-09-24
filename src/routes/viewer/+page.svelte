<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { enhance } from '$app/forms';
	export let data: PageData;

	//recording loop
	function flipRecording(event: any) {
		location = prompt('please enter your address') ?? '';
		while (location == '') {
			location = prompt('please enter your address') ?? '';
		}
	}
	let location: any;
	function clipLoop(event: any) {
		setInterval(snapShot, 5000);
		setInterval(() => {
			document.getElementById('submit')?.click();
		}, 5000);
	}

	//create webcam
	let video: any;
	function loadViewer() {
		if (navigator.mediaDevices.getUserMedia) {
			navigator.mediaDevices
				.getUserMedia({ video: true })
				.then(function (stream) {
					video.srcObject = stream;
				})
				.catch(function (error) {
					console.log('some error');
				});
		} else {
			console.log('error user media not supported');
		}
	}
	onMount(loadViewer);

	//get snap shot
	let canvas: any;
	let file_input: any;
	let form: any;
	function snapShot() {
		let ctx = canvas.getContext('2d');
		ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
		var data = canvas.toDataURL('image/jpg');
		console.log(data);
		file_input.value = data;
	}
</script>

<form
	action="?/processImage"
	method="POST"
	enctype="multipart/form-data"
	bind:this={form}
	id="form"
	use:enhance
>
	<div id="container">
		<!-- svelte-ignore a11y-media-has-caption -->
		<video
			class="mt-32 border-[#f1d592] border-8 rounded-xl"
			autoplay
			id="videoElement"
			bind:this={video}
		/>
	</div>
	<canvas hidden id="canvas" width="640" height="480" bind:this={canvas} />

	<input hidden type="text" name="clip" id="clipper" bind:this={file_input} />

	<input hidden type="text" name="location" bind:this={location} id="" />
	<button
		on:click|preventDefault={flipRecording}
		on:click|preventDefault={clipLoop}
		class="flex justify-center m-auto text-1xl rounded-lg absolute inset-x-0 bottom-20 6xl bg-[#f1d592] drop-shadow-lg hover:bg-[#e6c984] py-2 px-4 w-[10%]"
		>Start Recording</button
	>
	<button
		class="= justify-center m-auto text-4xl rounded-lg absolute inset-x-0 bottom-20 6xl bg-[#f1d592] drop-shadow-lg hover:bg-[#e6c984] py-2 px-4 hidden"
		type="submit"
		id="submit">submit</button
	>
</form>

<!-- <div>{data.response}</div> -->

<style>
	#container {
		margin: 0px auto;
		width: 700px;
		height: 419px;
	}
	#videoElement {
		width: 700px;
		height: 400px;
		background-color: #666;
	}
</style>
