<template>
 <div>
   <select-game></select-game>
 </div>
</template>

<script>
  import MenuItems from './MenuItems'
  import SelectGame from "../../auth/SelectGame";

  export default {
    name: "GameSettings",
    components: {
      MenuItems,
      SelectGame
    }
  }
</script>
