<script>
import { onMount } from "svelte";
import interact from "interactjs";
let hidden = false;
let elements = [];

let selectedNode = null;

function open_input(event) {
    if (event.clientX > 200) {
        // let input = document.createElement('input');
        selectedNode = event.target;
        selectedNode.classList.add("selected-item")
        selectedNode.children.input.focus();
    }
}
onMount(() => {
    interact('.item')
    .resizable({
    edges: { left: true, right: true, bottom: true, top: true },
    listeners: {
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
                elements.forEach((el) => {
                    let block = document.createElement('div');
                    block.classList.add('item');
                    block.classList.add('rectangle');
                })
            }
        }
    })
})
</script>
<div class="component">
    <button class="hide-button" on:click={() => hidden = !hidden}>{hidden ? 'Открыть' : 'Скрыть'}</button>
    <div class="drag_n_drop_area {hidden === false ? 'small_area' : 'big_area'}">
    <div class="collection" class:hidden>
        <div id="1" class="collection_item rectangle item selected-item" on:dblclick={open_input}><input></div>
        <div id="2" class="collection_item oval item"><input></div>
        <div id="3" class="collection_item circle item"><input></div>
        <div id="4" class="collection_item triangle item"><input></div>
	</div>
    </div>
</div>
<style>
    .selected-item {
        border: 2px solid cornflowerblue;
    }
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
        height: 500px;
    }
    .small_area {
               left: 205px;
    }
    .big_area {
        left:5px;
    }

.item {
    touch-action: none;
}
</style>