<script>
    import * as go from "gojs";
    import {onMount} from "svelte";

    onMount(() => {
        let diagram = new go.Diagram("myDiagramDiv");
        diagram.model = new go.GraphLinksModel(
                [{key: "Hello"},   // two node data, in an Array
                    {key: "World!"}],
                [{from: "Hello", to: "World!"}]  // one link data, in an Array
        );
    });
</script>

<div id="myDiagramDiv" style="border: solid 1px blue; width: 400px; height: 150px"></div>
