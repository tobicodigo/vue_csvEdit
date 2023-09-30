/* Simple Button

<template>
  <button>
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  background-color: #4caf4fcb;
  background-image: url('/assets/write.png');
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  border: 1px solid transparent;
  color: white;
  padding: 5px 10px 5px 10px;
  text-align: center;
  text-decoration: none;
  font-size: 16px;
  cursor: pointer;
  margin: 1px;
  width: 100%;
  height: 30px;
}

button:hover {
  border: 1px solid white;
}

.red {
  background-color: rgba(255, 0, 0, 0.7);
  background-image: none;
}

.blue {
  background-color: rgb(0, 115, 255);
  background-image: none;
}

.save {
  background-color: #4caf4fcb;
  background-image: url('/assets/whiteCheckmark.png');
}

.download {
  background-image: none;
  height: 50px;
  width: 150px;
}

.load {
  background-image: none;
  padding: 0px 15px 0px 15px;
  width: auto;
}
</style>
