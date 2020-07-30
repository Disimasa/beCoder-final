<script>
import { onMount } from "svelte";
import interact from "interactjs";
let hidden = false;
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
<div class="component">
    <button class="hide-button" on:click={() => hidden = !hidden}>{hidden ? 'Открыть' : 'Скрыть'}</button>
    <div class="drag_n_drop_area {hidden === false ? 'small_area' : 'big_area'}">
    <div class="collection" class:hidden>
        <div class="collection_item rectangle item"></div>
        <div class="collection_item oval item"></div>
        <div class="collection_item circle item"></div>
        <div class="collection_item triangle item"></div>
	</div>
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