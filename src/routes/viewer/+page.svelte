<script lang="ts">
	import { onMount } from "svelte";
    import type {PageData} from "./$types"
    export let data: PageData
    
    //recording loop
    let recording: boolean = false;
    function flipRecording(event){
        console.log("flipped")
        if(!recording){
            location=prompt("please enter your address")??""
            while(location ==""){
                location=prompt("please enter your address")??""
            }
        }
        recording=!recording
    }
    let location : any;
   function clipLoop(event) {
            setInterval(snapShot,5000)
    }
    //create webcam
    let video: any;
    function loadViewer(){
        if(navigator.mediaDevices.getUserMedia){
        navigator.mediaDevices.getUserMedia({video:true})
        .then(function (stream){
            video.srcObject =stream;
        })
        .catch(function(error){
            console.log("some error")
        })
    } else{
        console.log("error user media not supported")
    }
    }
    onMount(loadViewer);

    //get snap shot
    let canvas :any;
    let file_input: any;
    let form:any;
    function snapShot(){
        let ctx = canvas.getContext('2d');
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        var data = canvas.toDataURL('image/jpeg');
        file_input.value=data;
        form.submit()
    }

</script>


<form action="?/processImage" method="POST" enctype="multipart/form-data" bind:this="{form}">

        <div id="container">
            <!-- svelte-ignore a11y-media-has-caption -->
            <video autoplay id="videoElement" bind:this="{video}"></video>
        </div>
        <canvas id="canvas" width="640" height="480"  bind:this="{canvas}"></canvas>
            <input hidden type="file" name="clip" id="" bind:this="{file_input}">
            <input hidden type="text" name="location" bind:this="{location}" id="">
    <button  on:click|preventDefault={flipRecording} on:click|preventDefault={clipLoop}>Toggle Recording</button>
    <button class="flex justify-center m-auto text-4xl rounded-lg absolute inset-x-0 bottom-20 6xl bg-[#f1d592] drop-shadow-lg hover:bg-[#e6c984] py-2 px-4 " type="submit">submit</button>
</form>
<button  on:click={snapShot}>snapshot</button>
<div>{data.response}</div>


<style>
    #container {
        margin: 0px auto;
        width: 700px;
        height: 419px;
        border: 10px #333 solid;
    }
    #videoElement {
        width: 700px;
        height: 400px;
        background-color: #666;
    }
    </style>
