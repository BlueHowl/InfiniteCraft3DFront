<!-- <script lang="ts">
    import { onMount } from "svelte";
    import MainScene from "./lib/MainScene.svelte";
    import { onPlayerJoin, insertCoin, isHost, myPlayer, startMatchmaking } from "playroomkit";
    import { generateVoxelModel, getVoxelModel } from "./services/3DModelService";
    import { generateNewValue } from "./services/GeminiService";
    import { CraftNode } from "./domain/CraftNode";
  
  
  onMount(async () => {
    // let id = await generateVoxelModel("table");
    // if(id) {
    //   console.log(await getVoxelModel(id));
    // }
    // Show Playroom lobby UI, Playroom will handle players joining etc and wait for host to tap "Launch"
    //await insertCoin();
    
    // Players are in this room! (your game code below)
    //startGame();
    // const newInput1 = "Water";
    // const newInput2 = "Fire";
    // const result = await generateNewValue(newInput1, newInput2);
    // console.log(`${newInput1} + ${newInput2} : ${result}`);

    const cn = new CraftNode({text: "Water"});
    const result = await cn.getFusion(new CraftNode({text: "Fire"}));
    console.log(result.getText());
  });

</script>

<main>
  <MainScene/>
</main> -->

<!-- App.svelte -->
<script lang="ts">
    import DraggableArea from './lib/DraggableArea.svelte';
    import SideList from './lib/SideList.svelte';
</script>

<main>
  <div class="container">
    <DraggableArea />

    <SideList />
  </div>
</main>

<style>
  .container {
    display: flex;
    justify-content: space-between;
    height: 100vh;
    justify-content: flex-end;
  }
</style>