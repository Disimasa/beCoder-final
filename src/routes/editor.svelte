<svelte:head>
	<title>Редактор</title>
</svelte:head>
<script>
	import Drag_n_drop from '../components/Drag_n_drop.svelte'
	let name = "Новый проект";
	let hidden = false;
</script>

<main>
		<Drag_n_drop/>
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
	.main {
		margin: 0;
		padding: 0;
	}
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
		width: 100%;
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