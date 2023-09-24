<script lang="ts">
	import { onMount } from "svelte";
    import type {PageData} from "./$types"
    const sleepNow = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

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
    async function clipLoop(event) {
            while (recording) {
                await sleepNow(5000)
                console.log(`Hello`)
            }
    }

    //create webcam
    let video: any

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

   

    

</script>


<form action="?/processImage" method="POST" enctype="multipart/form-data">

        <div id="container">
            <!-- svelte-ignore a11y-media-has-caption -->
            <video autoplay id="videoElement" bind:this="{video}"></video>
        </div>
            <input hidden type="file" name="clip" id="">
            <input hidden type="text" name="location" bind:this="{location}" id="">
    <button class="flex justify-center m-auto text-4xl rounded-lg absolute inset-x-0 bottom-20 6xl bg-[#f1d592] drop-shadow-lg hover:bg-[#e6c984] py-2 px-4 " on:click|preventDefault={flipRecording} on:click|preventDefault={clipLoop}>Toggle Recording</button>
</form>

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
