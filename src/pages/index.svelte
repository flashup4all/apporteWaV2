<script>
    import { goto } from "@sveltech/routify";
    import Login from './auth/index.svelte'
    import { onMount } from 'svelte'
    import {get_token } from '../localstore';
	let data
	onMount(async () => {
        if(get_token()){
            $goto("/app")
        }
		//data = await fetch('https://api.coindesk.com/v1/bpi/currentprice.json').then(x => x.json())
    })
    // $: if(get_token()){
    //     $goto("/app")
    // }else{
    //     $goto("/")
    // }

</script>

<div>index</div>
<!-- <Login /> -->