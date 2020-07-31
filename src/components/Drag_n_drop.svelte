<script>
import { onMount } from "svelte";
import interact from "interactjs";
let chosen_block = null;
let hidden = false;
let count = 0;
let elements = [];
function new_arrow(target) {
}
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
    <button class="hide-button" on:click={() => hidden = !hidden}>{hidden ? 'Открыть' : 'Скрыть'}</button>
    <div class="drag_n_drop_area {hidden === false ? 'small_area' : 'big_area'}">
    <div class="collection" class:hidden>
        <button on:click={new_arrow}></button>
        <div class="collection_item rectangle" on:mousedown="{() => new_block('rectangle')}" on:mouseup={update}></div>
        <div class="collection_item oval" on:mousedown="{() => new_block('oval')}" on:mouseup={update}></div>
        <div class="collection_item circle" on:mousedown="{() => new_block('circle')}" on:mouseup={update}></div>
        <div class="collection_item triangle" on:mousedown="{() => new_block('triangle')}" on:mouseup={update}></div>
	</div>
        {#each elements as el}
        <div id = {el['id']} class="item {chosen_block === el['id'] ? 'chosen_block':''} {el['type']}" on:mousedown="{() => chosen_block = el['id']}"></div>
            {/each}
    </div>
</div>
<style>
    .component {
        width: 100%;
        height: 500px;
        margin: 30px 30px;
    }
    .collection{
		position: fixed;
		height: 100%;
        left: 0;
		width: 200px;
		background: #333333;
		transition: transform 1s ease;
		z-index: 20;
	}
    .collection_item {
        position: absolute;
        left: 20px;
        margin: 30px 20px;
    }
    .collection_item:hover {
        cursor: pointer;
    }
    .rectangle {
        background: red;
        width: 130px;
        height: 70px;
    }
    .oval {
        top:100px;
        background: red;
        width: 130px;
        height: 70px;
        border-radius: 50px;
    }
    .triangle {
        top:200px;
        width: 0;
	height: 0;
	border-left: 60px solid transparent;
	border-right: 60px solid transparent;
	border-bottom: 100px solid red;
    }
    .circle {
        top: 350px;
        background: red;
        width: 70px;
        height: 70px;
        border-radius: 70px;
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
}
    .nothing {
        top:200px;
    }
    .chosen_block {
        border: 2px solid brown;
    }
</style>