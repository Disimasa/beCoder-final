<link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@500&display=swap" rel="stylesheet">
<script>
import { onMount } from "svelte";
import interact from "interactjs";
import * as d3 from 'd3';
let chosen_block = null;
let hidden = false;
let arrow_mode = false;
let first_point = null;
let count = 0;
let elements = [];
function new_arrow(event) {
    if (arrow_mode === true) {
        if (first_point === null) {
            first_point = event.target;
            console.log(1);
        } else {
            console.log(first_point.getBoundingClientRect()['x']);
            let svg = d3.select('.drag_n_drop_area').append('svg');
            svg.style("height", "100%").style("width", "100%").style("position", "fixed").style("left", 0).style("top", 0).style("z-index", 0);
            svg.append("line").style("stroke", "gray").attr("x1", first_point.getBoundingClientRect()['x']+first_point.getBoundingClientRect()['width']/2).attr("y1", first_point.getBoundingClientRect()['y']+first_point.getBoundingClientRect()['height']/2).attr("x2", event.target.getBoundingClientRect()['x'] + event.target.getBoundingClientRect()['width']/2).attr("y2", event.target.getBoundingClientRect()['y'] + event.target.getBoundingClientRect()['height']/2);
            first_point = null;
        }
    }
}
function delete_block(e) {
function delete_block(e) {
    console.log(elements);
    if (chosen_block != null && (e.keyCode===8 || e.keyCode === 46)) {
        elements.forEach((el, index) => {
           if (chosen_block === el['id']) {
               elements.splice(index, 1);
           }
        });
        elements = elements;
        chosen_block = null;
    }
}
function open_input(event) {
    if (event.clientX > 200 && event.target.childElementCount === 0) {
        let input = document.createElement('input');
        input.classList.add('input_title');
        event.target.append(input);

    }
}
function new_block(type) {
    elements = [...elements, {'id': count, 'x': 500, 'y':500, 'type': type}];
        count+=1;
}
function update() {
    elements.forEach((el) => {
       let item = document.getElementById(el['id']);
       item.style.top = el['y']+'px';
       item.style.left = el['x']+'px';
    });
}
onMount(() => {
    interact('.item')
    .resizable({
    edges: { left: false, right: true, bottom: false, top: true },
    listeners: {
        start(event) {

        },
      move (event) {
              let target = event.target;
              let x = (parseFloat(target.getAttribute('data-x')) || 0);
              let y = (parseFloat(target.getAttribute('data-y')) || 0);

              target.style.width = event.rect.width + 'px';
              target.style.height = event.rect.height + 'px';

              x += event.deltaRect.left;
              y += event.deltaRect.top;

              target.style.webkitTransform = target.style.transform =
                      'translate(' + x + 'px,' + y + 'px)';

              target.setAttribute('data-x', x);
              target.setAttribute('data-y', y);
          }
    },
    modifiers: [
         interact.modifiers.aspectRatio({
             // make sure the width is always double the height
             ratio: 'preserve',
         }),
      interact.modifiers.restrictEdges({
        outer: '.drag_n_drop_area'
      }),

      interact.modifiers.restrictSize({
        min: { width: 100, height: 50 }
      })
    ],

    inertia: true
  })
    .draggable ({
    modifiers: [
      interact.modifiers.restrictRect({
        restriction: '.drag_n_drop_area',
        endOnly: true
      })
    ],
    autoScroll: true,

        listeners: {
        start(event) {
            let target = event.target;
            if (event.clientX < 200) {
                let collection_item = target.cloneNode();
                collection_item.ondblclick = open_input;
                let parent = document.getElementsByClassName('collection');
                if (target.id < 4) {
                    parent[0].insertBefore(collection_item, document.getElementById(target.id + 1));
                } else {
                    parent[0].insertBefore(collection_item, document.getElementById('4'));
                }
            }
        },
            move(event) {
                let target = event.target;
                let x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                let y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
                target.style.webkitTransform =
                target.style.transform =
                'translate(' + x + 'px, ' + y + 'px)';
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
            end(event) {

            }
        }
    })
})
</script>
<svelte:window on:keydown={delete_block} on:keyup={update}/>
<div class="component">
    <div class="header">
    <button class="hide-button" on:click={() => hidden = !hidden}>{hidden ? 'Открыть' : 'Скрыть'}</button>
        <button class="save_button">Сохранить</button>
    </div>
    <div class="drag_n_drop_area {hidden === false ? 'small_area' : 'big_area'}">
    <div class="collection" class:hidden>
        <button on:click="{() => arrow_mode = true}"></button>
        <div class="collection_item rectangle" on:mousedown="{() => new_block('rectangle')}" on:mouseup={update}></div>
        <div class="collection_item oval" on:mousedown="{() => new_block('oval')}" on:mouseup={update}></div>
        <div class="collection_item circle" on:mousedown="{() => new_block('circle')}" on:mouseup={update}></div>
        <div class="collection_item triangle" on:mousedown="{() => new_block('triangle')}" on:mouseup={update}></div>
	</div>
        {#each elements as el}
        <div id = {el['id']} class="item {chosen_block === el['id'] ? 'chosen_block':''} {el['type']}" on:mousedown="{() => chosen_block = el['id']}" on:click={new_arrow}>
            <input class="input_title">
        </div>
            {/each}
    </div>
</div>
<style>
    .component {
        width: 100%;
        height: 100%;
    }
    .header {
        z-index: 25;
        background: #FFFFFF;
        box-shadow: 0 7px 7px -3px rgba(13, 7, 7, 0.15);
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
    }

    .hide-button, .save_button {
        border: 2px solid #6476ff;
        border-radius: 10px;
        width: 170px;
        height: 50px;
        padding: 5px 20px;
        background: #FFFFFF;
        font-family: 'Comfortaa', cursive;
        font-size: 20px;
        margin: 0 20px;
        outline: none;
    }
    .hide-button:hover, .save_button:hover {
        cursor: pointer;
        background: #6476ff;
        color: white;
    }
    .collection{
		position: fixed;
		height: 100%;
        left: 0;
		width: 200px;
		background: #FFFFFF;
		transition: transform 1s ease;
		z-index: 20;
        top: 66px;
        box-shadow: 7px 0 7px -3px rgba(13, 7, 7, 0.15);
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px 0;
	}
    .collection_item {
        margin: 20px 0;
    }
    .collection_item:hover {
        cursor: pointer;
    }
    .rectangle {
        border: 5px solid #6476ff;
        background: #FFFFFF;
        width: 130px;
        height: 70px;
    }
    .oval {
        border: 5px solid #6476ff;
        top:100px;
        width: 130px;
        height: 70px;
        border-radius: 50px;
        background: #FFFFFF;
    }
    .triangle {
        border: 5px solid #6476ff;
        top:200px;
        width: 70px;
	    height: 70px;
	    transform: rotate(45deg);
        background: #FFFFFF;
    }
    .circle {
        border: 5px solid #6476ff;
        top: 350px;
        width: 70px;
        height: 70px;
        border-radius: 70px;
        background: #FFFFFF;
    }
    .hidden {
		transform: translate(-200px, 0);
	}
    .drag_n_drop_area {
        position: fixed;
        width:100%;
        height: 90%;
    }
    .small_area {
        left: 205px;
    }
    .big_area {
        left:5px;
    }

.item {
    touch-action: none;
    position: fixed;
    top: 500px;
    left: 500px;
    z-index: 20;
}
    .nothing {
        top:200px;
    }
    .chosen_block {
        border: 2px solid brown;
    }
    .input_title {
        width: 100%;
        height: 100%;
        background: transparent;
        border: 0;
        outline: none;
        text-align: center;
        font-family: 'Comfortaa', cursive;
    }
    .input_title:active {
        border: 0;
    }
    .input_title:hover {
        cursor: pointer;
    }
    .triangle .input_title {
        transform: rotate(-45deg);
    }
</style>