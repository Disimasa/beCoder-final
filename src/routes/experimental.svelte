<script>
    import { onMount } from 'svelte'
    let Moveable;
    onMount(async () => {
        		const module = await import('svelte-moveable');
        		Moveable = module.default;
    });
    let moveable;
    let target;
    const frame = {
        translate: [0, 0],
    }

    function onMouseDown(e) {
        target = e.target;

        setTimeout(() => {
            moveable.dragStart(e);
        });
    }
</script>

<div class="target" on:mousedown={onMouseDown}>Target</div>
<div class="target" on:mousedown={onMouseDown}>Target</div>
<div class="target" on:mousedown={onMouseDown}>Target</div>
<div class="target" on:mousedown={onMouseDown}>Target</div>


<svelte:component this={Moveable}
    bind:this={moveable}
    draggable={true}
    target={target}
    throttleDrag={0}
    on:dragStart={({ detail: { set } }) => {
        set(frame.translate)
    }}
    on:drag={({ detail: { target, beforeTranslate }}) => {
        frame.translate = beforeTranslate;
        target.style.transform
            = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
    }}
    on:dragEnd={({ detail: { target, isDrag, clientX, clientY }}) => {
        console.log("onDragEnd", target, isDrag);
    }}
	resizable={true}
    throttleResize={0}
    on:resizeStart={({ detail: {target, set, setOrigin, dragStart }}) => {
        // Set origin if transform-orgin use %.
        setOrigin(["%", "%"]);

        // If cssSize and offsetSize are different, set cssSize. (no box-sizing)
        const style = window.getComputedStyle(target);
        const cssWidth = parseFloat(style.width);
        const cssHeight = parseFloat(style.height);
        set([cssWidth, cssHeight]);

        // If a drag event has already occurred, there is no dragStart.
        dragStart && dragStart.set(frame.translate);
    }}
    on:resize={({ detail: { target, width, height, drag }}) => {
        target.style.width = `${width}px`;
        target.style.height = `${height}px`;

        // get drag event
        frame.translate = drag.beforeTranslate;
        target.style.transform
            = `translate(${drag.beforeTranslate[0]}px, ${drag.beforeTranslate[1]}px)`;
    }}
    on:resizeEnd={({ detail: { target, isDrag, clientX, clientY }}) => {
        console.log("onResizeEnd", target, isDrag);
    }}
/>
<style>
    div {
        width: 40px;
        height: 40px;
    }
</style>