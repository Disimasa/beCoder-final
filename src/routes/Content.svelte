<script>
    import { getContext } from 'svelte';
	import { fly } from 'svelte/transition';
	import Dialog from './Dialog.svelte';
    import Modal from './Modal.svelte';
   const { open } = getContext('simple-modal');
	const projects = getContext('poj');
	
	let opening = false;
	let opened = false;
	let closing = false;
	let closed = false;
	
	let name;
	let discription;
	let status = 0;
	
	const onCancel = (text) => {
		name = '';
		discription = '';
		status = -1;
	}
	
	const getText = (text, disc) => {
		name = text;
		discription = disc;
		status = 1;
		document.location.href = '/editor'
	}

  const showDialog = () => {
		open(
			Dialog,
			{
				message: "Введите название и описание проекта",
				hasForm: true,
				hasSecondForm:true,
				onCancel,
				getText
			},
			{
				closeButton: false,
    		closeOnEsc: false,
    		closeOnOuterClick: false,
			}
	  );
	};
</script>

<section>
	<div class="card new"  on:click={showDialog}>  
	<p style="font-size:10vh">+</p> 
    </div>

	<!--{#if status === 1}
		<p>Hi {name} {discription}</p>
	{:else if status === -1}
		<p><em>Dialog was canceled</em></p>
	{/if}

	<div id="state">
		{#if opening}
			<p>opening modal...</p>
		{:else if opened}
			<p>opened modal!</p>
		{:else if closing}
			<p>closing modal...</p>
		{:else if closed}
			<p>closed modal!</p>
		{/if}
	</div>-->
</section>

<style>
	section {
		padding-top: 0.5em;
	}
	    .card {
        background: white;
        text-align: center;
        width: 270px;
        height: 300px;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        box-shadow: 0 0 30px 2px #EBEBEB;
        transition: all 1s ease;
        cursor: pointer;
        margin-bottom: 40px;
    }

    .card:hover {
        box-shadow: 0 0 40px 3px #D6D6D6;
    }
</style>
