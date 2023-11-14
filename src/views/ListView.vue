<script setup>
import { ref, onMounted } from 'vue'
import InfoCard from '@/components/InfoCard.vue'
import ApiService from '@/services/ApiService.js'

const pokemonList = ref(null)

onMounted(() => {
  ApiService.getPokemonList()
  .then((response)=> {
    pokemonList.value = response.data
  })
  .catch((error) => {
    console.log(error)
  })
})
</script>

<template>
  <div class="background">
    <h1>Pokedex</h1>
    <div class="pokedex-feed">
      <InfoCard v-for="pkm in pokemonList" :key="pkm.id" :pokemon="pkm" />
    </div>
  </div>
</template>

<style scoped>
  .background {
    background-color: #ffa1a1;
    padding: 20px;
  }
  .pokedex-feed {
    display: flex;
    flex-direction: row;
    justify-content: center;
    gap: 15px;
    flex-wrap: wrap;
  }
  h1 {
    text-align: center;
  }
</style>