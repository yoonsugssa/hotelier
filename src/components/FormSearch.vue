<template>
  <div class="search-container">
    <div class="hero">
      <h1>Vivimos para ser felices</h1>
    </div>

    <div class="form-box">

      <div class="options">

        <div class="item active">
          <img src="/img/iconos/light__bed.svg" alt="Cama">
          <span>Hospedaje</span>
        </div>
        <div class="item">
          <img src="/img/iconos/light__flight.svg" alt="Avión">
          <span>Vuelos</span>
        </div>
        <div class="item">
          <img src="/img/iconos/light__car.svg" alt="Auto">
          <span>Autos</span>
        </div>
        <div class="item">
          <img src="/img/iconos/light__package.svg" alt="Paquete">
          <span>Paquetes</span>
        </div>
        <div class="item">
          <img src="/img/iconos/light__ticket.svg" alt="Actividades">
          <span>Actividades</span>
        </div>
        <div class="item">
          <img src="/img/iconos/light__cruise.svg" alt="Barco">
          <span>Cruceros</span>
        </div>
      </div>
      <div class="tabs">
        <button class="tab active">Viaje redondo</button>
        <button class="tab">Viaje sencillo</button>
        <button class="tab">Multidestino</button>
      </div>
      <div class="search-fields">

        <div class="field-group">
          <label>¿A dónde quiere ir?</label>
          <input type="text" placeholder="Monte Adentro, Guayabal, Puntal">
        </div>

        <div class="field-group date-field">
          <label>Ida - Vuelta</label>
          <input type="text" placeholder="14 Nov - 16 Nov">
        </div>

        <div class="field-group guest-field">
          <label>Huéspedes</label>
          <input type="text" placeholder="2 personas, 1 habitación">
        </div>

        <div class="search-button-container">
          <BuscarButton />
        </div>

      </div>
    </div>
  </div>
</template>


<script setup>
import BuscarButton from './ButtonSearch.vue'; // Asumiendo que esta ruta es correcta
</script>


<style>
@import '../assets/css/FormSearch.css';
</style>