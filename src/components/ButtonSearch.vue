<template>
  <button class="buscar-base" data-name="Buscar">
    Buscar
  </button>
</template>

<script setup>
// Lógica Vue para el click, si la necesitas, va aquí
</script>

<style scoped>
/* Estilos ajustados para que el botón se vea como querías */
.buscar-base {
  /* Estilos heredados de tu solicitud de Tailwind/CSS plano */
  background-color: #265073; 
  border: 0.7px solid rgba(255, 255, 255, 0.05); 
  border-radius: 30px; 

  /* Estilos críticos para que sea un botón visible y centrado */
  width: 100%; 
  height: 100%; 
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* Estilos de texto */
  color: white; /* Añadido para que el texto sea visible */
  font-size: 16px;
  font-weight: 600;

  /* Quitar estilos por defecto del navegador */
  cursor: pointer;
  padding: 10px 20px;
  box-sizing: border-box; /* Importante para el width/height */
  transition: background-color 0.2s;
}

.buscar-base:hover {
    background-color: #1a3c56; /* Un color ligeramente más oscuro al pasar el ratón */
}
</style>