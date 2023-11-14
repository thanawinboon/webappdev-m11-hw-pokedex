<script setup>
import { ref, onMounted } from 'vue'
import ApiService from '@/services/ApiService.js'

const currentPokemon = ref(null)

const props = defineProps({
    id: { required: true }
})

function getPrevEvoId() {
  if (this.currentPokemon.evolves_from.name) {
    return this.currentPokemon.evolves_from.url.split("/")[6]
  }
  return -1;
}

onMounted(() => {
  ApiService.getPokemonDetails(props.id)
    .then((response)=>{
      currentPokemon.value = response.data
    })
    .catch((error)=>{
      console.log(error)
    })
})

</script>

<template>
    <div v-if="currentPokemon">
      <div class="page">
        <div class="pokemon-sprite">
          <img :src="currentPokemon.sprites" :alt="currentPokemon.name" />
        </div>
        <div class="pokemon-info">
          <h3>Pokedex No.{{ currentPokemon.id }}:</h3>
          <h1>{{ currentPokemon.name.toUpperCase() }} / {{ currentPokemon.name_jp }}</h1>
          <span></span>
          <h3>Types: <span v-for="t in currentPokemon.types"> [ {{ t }} ] </span></h3>
          <div class="pokemon-info-evo">
            <h3>Evolution:</h3>
            <span v-if="currentPokemon.evolves_from">
              This Pokemon evolves from {{ currentPokemon.evolves_from.name }}
            </span>
            <span v-else> This Pokemon does not have a pre-evolutionary form </span>
          </div>
        </div>
      </div>
    </div>
</template>

<style scoped>
  .page {
    background-color: #ffa1a1;
    padding: 20px;
  }

  h1 {
    text-align: center;
  }
  .pokemon-sprite {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .pokemon-sprite img {
    max-width: 300px;
    max-height: 300px;
    background-color: white;
    border-radius: 20%;
  }
  .pokemon-info {
    padding: 5px;
    margin: 5px;
    background-color: rgb(236, 236, 236);
    border: 1px solid #39495c;
    display: flex;
    flex-direction: column;
    text-align: center;
    flex-wrap: wrap;
    gap: 0px;
  }
  .pokemon-info h1 {
    margin: 0px;
  }

</style>