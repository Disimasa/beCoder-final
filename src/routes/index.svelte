<script>
let projects = [
{name: "Project_1", text: "Great!",onclick:"alert('Project_1');", class_:"alternate"},
{name: "Project_2", text: "Nice!",onclick:"alert('Project_2');", class_:"alternate"},
{name: "Project_3", text: "Wonder!",onclick:"alert('Project_3');", class_:"alternate"}
];
</script>
<style>
  section {
    padding-top: 15vh;
    padding-bottom: 60vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    background-color: #000000;
    border: solid 0.01px #016220;
    box-shadow: 2px 2px 6px rgb(0, 0, 0);
  }

  div {
    margin: 2vh;
    padding: 2vh;
    height: 30vh;
    width: 30vh;
    color: white;
    text-align: center;
    min-width: 30vh;
    min-height: 20vh;
    box-shadow: 2px 2px 6px rgb(0, 0, 0);
    border-radius: 1rem;
    border: solid 0.01px #016220;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  div a {
    background-color: #1e2122;
    color: #016220;
    text-decoration: none;
    width: 5rem;
    margin: 0 auto;
    box-shadow: 2px 2px 6px #01A220;
    border-radius: 5px;
    border: solid 0.01px #01B220;
    padding: 0.3rem;
    cursor: pointer;
  }

  div a:hover {
    background-color: white;
  }

  .primary {
    background-color: black;
  }

  .alternate {
    background-color: #1e2122;
  }
  .new {
    background-color: #016220;

  }

</style>

<section id="projects">


{#each projects as { name, text, onclick, class_ }}
  <div class={class_} onclick={onclick}>
    <h1>{name}</h1>
    <p style="font-size:3vh">{text}</p>
  </div>
{/each}


    <div class="new" onclick="document.location.href = 'http://ya.ru'" >
    <p style="font-size:10vh">➕</p>
  </div>


</section>
