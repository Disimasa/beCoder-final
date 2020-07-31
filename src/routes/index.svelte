<script>
	import Content from './Content.svelte';
    import Modal from './Modal.svelte';
	import { setContext } from 'svelte';
    let projects = [
        {name: "Project 1", text: "Great!", onclick: "document.location.href = '/editor'", class_: "alternate"},
        {name: "Project 2", text: "Nice!", onclick: "document.location.href = '/editor'", class_: "alternate"},
        {name: "Project 3", text: "Wonder!", onclick: "document.location.href = '/editor'", class_: "alternate"}
    ];
    setContext('poj', projects);
</script>




<style>
    @import url('https://fonts.googleapis.com/css2?family=Comfortaa:wght@400;700&display=swap');
    .header-h1 {
        width: 100%;
        text-align: center;
        font-family: Comfortaa, sans-serif;
        font-weight: bold;
        font-size: 2.5em;
        color: #858585;
        padding-bottom: 40px;
    }
    section {
        padding-top: 200px;
        background-color: #FAFAFA;
        width: 100%;
        height: 100vh;
        top: 0;
    }

    .title {
        margin: 0;
        padding: 0;
        font-size: 2em;
        color: #6574FF;
        font-family: Comfortaa, sans-serif;
        font-weight: 700;
    }

    h2 {
        font-family: Comfortaa, sans-serif;
        font-weight: 400;
        margin: 0;
        padding: 0;
        font-size: 1em;
        color: #858585;
    }

    .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        flex-flow: wrap;
        justify-content: space-around;
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
<head>
    <link href="https://fonts.googleapis.com/css2?family=Comfortaa&display=swap" rel="stylesheet">
</head>
<section id="projects">
    <h1 class="header-h1">Выберите проект или создайте новый</h1>
    <div class="wrapper">
        {#each projects as { name, text, onclick, class_ }}
            <div class="card project" onclick={onclick}>
                <h1 class="title">{name}</h1>
                <h2>{text}</h2>
            </div>
        {/each}
        <Modal/>
        <Content/>
        <!--
        <div class="card new" onclick="document.location.href = '/editor'">
            <p style="font-size:10vh">+</p>
        </div>-->
    </div>
</section>

