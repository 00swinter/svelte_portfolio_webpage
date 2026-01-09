<script>
  import buildData from './build_tracker.json';
  import MainPage from "./pages/MainPage.svelte";

  const longDate = new Date(buildData.buildDate).toLocaleDateString('de-DE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

</script>

<div>
  <h1>
    Build: {buildData.buildNumber} (last updated: {longDate})
  </h1>
  <MainPage> </MainPage>
</div>
<style>
  h1{
    color: black;
  }
</style>
