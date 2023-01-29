<template>
  <router-view></router-view>
  <link rel="stylesheet" href="https://unicons.iconscout.com/release/v4.0.0/css/line.css">
</template>

<script>

export default {
  name: 'App',
}
</script>

<style lang="scss">
@import url('style/reseet.css');
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Kavoon&display=swap');

:root{
  --main-color: #772CE8;
  --dark: #1F1F23;
  --very_dark: #18181B;
  --light_dark: #3D3D3F;
}

#app {
  font-family: 'Roboto', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: var(--dark);
  min-height: 100vh;
  color:#fff;
  caret-color: #fff;
  a{
    color:#fff;
    transition: ease-in-out 0.3s;
    &:hover{
      color:var(--main-color);
    }
  }
  .container_page{
    padding: 200px 100px 100px 100px;
  }
  .form{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    background: var(--very_dark);
    width:500px;
    padding:50px;
    h1{
        margin-bottom: 25px;
        font-size: 32px;
    }
    input{
        border: 1px solid var(--light_dark);
        background: var(--dark);
        padding:20px;
        color:white;
        margin-bottom: 25px;
        width: 100%;
        &:focus{
          border: 1px solid var(--main-color);
        }
        &:last-child{
          margin-bottom: 0;
        }
    }
    input[type="submit"]{
        width: auto;
        border: 0px;
        padding:20px 25px;
        transition: ease-in-out 0.3s;
        &:hover{
            background: var(--main-color);
        }
    }
    span{
      margin-bottom: 25px;
      display: none;
    }
    a{
        margin-top: 25px;
        background: var(--dark);
        padding:20px 25px;
        &:hover{
            background: var(--main-color);
            color:#fff !important;
        }
    }
  }
}
</style>
