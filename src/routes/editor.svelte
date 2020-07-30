<svelte:head>
	<title>Редактор</title>
</svelte:head>
<script>
	import Drag_n_drop from '../components/Drag_n_drop.svelte'
	let name = "Новый проект";
	let hidden = false;
</script>

<header>
	<input bind:value={name}>
	<button class="hide-button" on:click={() => hidden = !hidden}>{hidden ? 'Открыть' : 'Скрыть'}</button>

</header>
<main>
	<div class="collection" class:hidden>
	</div>
	<div class="space">
		<Drag_n_drop/>
<!--		<Drag_n_drop/>-->
	</div>
</main>

<style>

	header {
		position: absolute;
		background: #f0f0f0;
		width: 100%;
		height: 50px;
		top: 100px;
		z-index: 30;
	}
	/*main {*/
	/*	width: 100%;*/
	/*	height: 100vh;*/
	/*	display: flex;*/
	/**/
	/*}*/
	.collection{
		position: absolute;
		height: 100%;
		width: 500px;
		background: #333333;
		transition: transform 1s ease;
		z-index: 20;
	}
	.space{
		height: 100vh;
		/*width: 100vh;*/
		background: lightcoral;
	}
	.hide-button{
		position: absolute;
		display: block;
		left: 0;
	}
	.hidden {
		transform: translate(-500px, 0);
	}
</style>