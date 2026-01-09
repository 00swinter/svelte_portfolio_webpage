<script>
    import HorizontalScrollContainer from "../components/HorizontalScrollContainer.svelte";
    import ProjectButton from "../components/ProjectButton.svelte";
    import PaginatedContainer from "../components/PaginatedContainer.svelte";
    import ProjectButtonPaginator from "../components/ProjectButtonPaginator.svelte";
</script>

<div class= "page">
    <ProjectButtonPaginator>
        <ProjectButton src="blackhole.jpg" title="Backhole" />
        <ProjectButton src="outhold.jpg" title="Outhold" />
        <ProjectButton src="routine.jpg" title="Routine" />
        <ProjectButton src="blackhole.jpg" title="Backhole" />
        <ProjectButton src="outhold.jpg" title="Outhold" />
        <ProjectButton src="routine.jpg" title="Routine" />
    </ProjectButtonPaginator>
</div>

<style>
    .page{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100vh;
        background-color: #121212;
    }
</style>
