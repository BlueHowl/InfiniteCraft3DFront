<script lang="ts">
    import Swal from "sweetalert2";
    import { removeAllDraggableNode } from "../stores/DraggableNodeStore";
    import { removeAllCraftNode } from "../stores/CraftNodeStore";


const reset = () => {
    Swal.fire({
        title: "Do you really want to reset the game ?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Reset",
        confirmButtonColor: "#DD6B55",
        cancelButtonText: "Cancel"
    }).then((result: any) => {
        if (result.value) {
            removeAllDraggableNode();
            removeAllCraftNode();
        }
    });
}

</script>

<button class="reset-button" on:click={reset}>
    Reset
</button>

<style>
    .reset-button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        color: gray;
        font-weight: 650;
        letter-spacing: 1px;
        margin: -1rem;
        position: absolute;
        bottom: 10px;
        left: 3px;
    }
</style>