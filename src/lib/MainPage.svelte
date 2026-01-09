<script>
    import HorizontalScrollContainer from '../components/HorizontalScrollContainer.svelte';
    import ProjectButton from '../components/ProjectButton.svelte'
    import PaginatedContainer from '../components/PaginatedContainer.svelte';

</script>


<PaginatedContainer>
    <div class="page-grid">
        <ProjectButton src="blackhole.jpg" title="Backhole" />
        <ProjectButton src="outhold.jpg" title="Outhold" />
        <ProjectButton src="routine.jpg" title="Routine" />
    </div>
    <div class="page-grid">
        <ProjectButton src="blackhole.jpg" title="Backhole" />
        <ProjectButton src="outhold.jpg" title="Outhold" />
        <ProjectButton src="routine.jpg" title="Routine" />
    </div>
</PaginatedContainer>

<style>
    .page-grid {
        display: grid;
        /* Create 3 equal columns */
        grid-template-columns: repeat(3, 1fr); 
        /* Add space between the buttons */
        gap: 20px; 
        /* Ensure the grid fills the page */
        width: 100%;
        padding: 10px;
        box-sizing: border-box;
    }
</style>