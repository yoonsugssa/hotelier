<template>
  <div class="home-page">
    <AppHeader />

    <main class="main-content">
      <div class="header-banner-section">
        
        <div class="contenido-superpuesto">
          <FormSearch
            @search="handleSearch"
            @select-service="handleServiceChange"
          />
        </div>
      </div>
      
      <AnotaLaFecha />
      
    </main>
  </div>
</template>

<script>
import AppHeader from '../components/Header.vue'
import FormSearch from '../components/FormSearch.vue'
import AnotaLaFecha from '../components/AnotaLaFecha.vue' // 1. IMPORTACIÓN AÑADIDA

export default {
  name: 'Home',
  components: {
    AppHeader,
    FormSearch,
    AnotaLaFecha // 2. REGISTRO AÑADIDO
  },
  methods: {
    handleSearch(formData) {
      console.log('Búsqueda iniciada con datos:', formData)
    },
    handleServiceChange(service) {
      console.log('Cambio de servicio a:', service)
    }
  }
}
</script>
