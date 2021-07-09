<svelte:options tag={null} />

<script lang="typescript">
  import svelteIcon from '@/assets/img/svelte.png';
  interface Hello {
    name: string;
    date: Date | string;
  }
  console.log('xxxxxxxxxxxxxxxxxxx');

  let hello: Hello = {
    name: 'World',
    date: new Date().toLocaleDateString(),
  };
</script>

<!-- img imported from public directory -->
<img class="banner" src="_ss.png" alt="svelte" />
<h1>
  <!-- img imported from assets directory -->
  <img style="width: 20px" src={svelteIcon} alt="svelte" />
  Hello
  {hello.name}
</h1>

<style>
  h1 {
    color: black;
    text-align: center;
  }
  img.banner {
    margin: 50px auto;
    display: block;
  }
</style>
